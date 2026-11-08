import { useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, CalendarDays, CheckCircle2, Clock3, Filter, Mail, MessageSquare, Phone, Search, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import "@/styles/leads-workspace.css";

type Lead = Tables<"admin_leads">;
type DateRange = "All time" | "Last 7 days" | "Last 30 days" | "Last 90 days";
const leadStatuses = ["New", "Contacted", "Qualified", "Converted", "Lost"];

function isInRange(date: string, range: DateRange) {
  if (range === "All time") return true;
  const days = range === "Last 7 days" ? 7 : range === "Last 30 days" ? 30 : 90;
  return new Date(date).getTime() >= Date.now() - days * 24 * 60 * 60 * 1000;
}

function statusKey(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function exportLeads(rows: Lead[]) {
  const headers = ["Name", "Company", "Email", "Phone", "Requirement", "Status", "Submitted"];
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const csv = [headers, ...rows.map((lead) => [lead.name, lead.company, lead.email, lead.phone, lead.requirement, lead.status, lead.created_at])]
    .map((row) => row.map((value) => escape(String(value ?? ""))).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "ironbridge-leads.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function LeadsWorkspace() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [range, setRange] = useState<DateRange>("All time");
  const [need, setNeed] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [savingStatus, setSavingStatus] = useState(false);

  async function loadLeads() {
    setLoading(true);
    const { data, error } = await supabase.from("admin_leads").select("*").order("created_at", { ascending: false });
    if (error) setMessage(error.message);
    else setLeads(data ?? []);
    setLoading(false);
  }

  useEffect(() => { void loadLeads(); }, []);

  const filtered = useMemo(() => leads.filter((lead) => {
    const q = search.trim().toLowerCase();
    const searchMatch = !q || `${lead.name} ${lead.company} ${lead.email} ${lead.phone} ${lead.requirement}`.toLowerCase().includes(q);
    const statusMatch = status === "All statuses" || lead.status === status;
    const dateMatch = isInRange(lead.created_at, range);
    const needMatch = !need.trim() || lead.requirement.toLowerCase().includes(need.trim().toLowerCase());
    return searchMatch && statusMatch && dateMatch && needMatch;
  }), [leads, search, status, range, need]);

  const total = leads.length;
  const newCount = leads.filter((lead) => lead.status === "New").length;
  const activeCount = leads.filter((lead) => lead.status === "Contacted" || lead.status === "Qualified").length;
  const converted = leads.filter((lead) => lead.status === "Converted").length;
  const conversionRate = total ? Math.round((converted / total) * 100) : 0;
  const trend = useMemo(() => Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - (6 - index));
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    return { label: day.toLocaleDateString(undefined, { weekday: "short" }), count: leads.filter((lead) => {
      const created = new Date(lead.created_at);
      return created >= day && created < next;
    }).length };
  }), [leads]);
  const peak = Math.max(1, ...trend.map((item) => item.count));
  const recent = leads.slice(0, 5);

  async function updateStatus(lead: Lead, nextStatus: string) {
    setSavingStatus(true);
    const { error } = await supabase.from("admin_leads").update({ status: nextStatus }).eq("id", lead.id);
    if (error) setMessage(error.message);
    else {
      setLeads((items) => items.map((item) => item.id === lead.id ? { ...item, status: nextStatus } : item));
      if (selected?.id === lead.id) setSelected({ ...lead, status: nextStatus });
      setMessage("Lead status updated.");
    }
    setSavingStatus(false);
  }

  return (
    <div className="ib-leads-workspace">
      <header className="ib-leads-heading"><div><p className="ib-leads-kicker">CUSTOMER RELATIONSHIP MANAGEMENT</p><h1>Leads</h1><p>Review and follow up on industrial property enquiries.</p></div><Button variant="outline" onClick={() => exportLeads(filtered)} disabled={filtered.length === 0}><ArrowDownToLine /> Export CSV</Button></header>
      {message && <div className="ib-leads-message" role="status">{message}<Button variant="ghost" size="icon" aria-label="Dismiss message" onClick={() => setMessage("")}><X /></Button></div>}
      <div className="ib-leads-stat-grid">
        <div className="ib-leads-stat"><span className="blue"><Users /></span><div><small>Total Leads</small><strong>{loading ? "—" : total}</strong><em>All enquiries received</em></div></div>
        <div className="ib-leads-stat"><span className="orange"><Clock3 /></span><div><small>New Leads</small><strong>{loading ? "—" : newCount}</strong><em>Awaiting first contact</em></div></div>
        <div className="ib-leads-stat"><span className="teal"><MessageSquare /></span><div><small>In Progress</small><strong>{loading ? "—" : activeCount}</strong><em>Contacted or qualified</em></div></div>
        <div className="ib-leads-stat"><span className="green"><CheckCircle2 /></span><div><small>Converted</small><strong>{loading ? "—" : converted}</strong><em>{conversionRate}% conversion rate</em></div></div>
      </div>
      <section className="ib-leads-panel ib-leads-toolbar-panel">
        <div className="ib-leads-toolbar-title"><div><h2>Lead Inbox</h2><p>Website enquiries and follow-up status.</p></div><span>{filtered.length} of {total} leads</span></div>
        <div className="ib-leads-filters">
          <label className="ib-leads-search"><Search /><input aria-label="Search leads" placeholder="Search name, company, email…" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <label className="ib-leads-filter"><Filter /><select aria-label="Filter leads by status" value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option>{leadStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="ib-leads-filter"><CalendarDays /><select aria-label="Filter leads by date" value={range} onChange={(event) => setRange(event.target.value as DateRange)}><option>All time</option><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option></select></label>
          <input className="ib-leads-need-filter" aria-label="Filter by property or requirement" placeholder="Property / requirement" value={need} onChange={(event) => setNeed(event.target.value)} />
        </div>
      </section>
      <section className="ib-leads-panel ib-leads-table-panel">
        <div className="ib-leads-table-wrap">{loading ? <div className="ib-leads-empty">Loading leads…</div> : filtered.length === 0 ? <div className="ib-leads-empty">No leads match these filters.</div> : (
          <table className="ib-leads-table"><thead><tr><th>Lead</th><th>Property / Requirement</th><th>Submitted</th><th>Status</th><th>Contact</th></tr></thead><tbody>{filtered.map((lead) => <tr key={lead.id}>
            <td><div className="ib-lead-person"><span>{lead.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span><div><strong>{lead.name}</strong><small>{lead.company || "Individual enquiry"}</small></div></div></td>
            <td><div className="ib-lead-requirement">{lead.requirement || "Industrial space enquiry"}</div></td>
            <td>{formatDate(lead.created_at)}</td>
            <td><select className={`ib-lead-status-select ${statusKey(lead.status)}`} aria-label={`Status for ${lead.name}`} value={lead.status} disabled={savingStatus} onChange={(event) => void updateStatus(lead, event.target.value)}>{leadStatuses.map((item) => <option key={item}>{item}</option>)}</select></td>
            <td><div className="ib-lead-contact"><Button variant="ghost" size="icon" aria-label={`Email ${lead.name}`} disabled={!lead.email} onClick={() => window.location.assign(`mailto:${lead.email}`)}><Mail /></Button><Button variant="ghost" size="icon" aria-label={`Call ${lead.name}`} disabled={!lead.phone} onClick={() => window.location.assign(`tel:${lead.phone}`)}><Phone /></Button><Button variant="ghost" size="icon" aria-label={`View ${lead.name}`} onClick={() => setSelected(lead)}><Search /></Button></div></td>
          </tr>)}</tbody></table>
        )}</div>
      </section>
      <div className="ib-leads-lower-grid">
        <section className="ib-leads-panel ib-leads-chart-panel"><div className="ib-leads-panel-heading"><div><h2>Lead Overview</h2><p>Enquiries received over the last seven days.</p></div><span>7 days</span></div><div className="ib-leads-chart" role="img" aria-label="Lead enquiries by day for the last seven days">{trend.map((day) => <div className="ib-leads-chart-day" key={day.label}><span>{day.count || ""}</span><i style={{ height: `${Math.max(day.count ? 12 : 3, day.count / peak * 100)}%` }} /><small>{day.label}</small></div>)}</div></section>
        <section className="ib-leads-panel ib-leads-side-panel"><div className="ib-leads-panel-heading"><div><h2>Lead Sources</h2><p>Inbox volume and recent updates.</p></div></div><div className="ib-leads-source-row"><span className="ib-leads-source-dot" /><div><strong>Lead inbox</strong><small>All captured enquiries</small></div><b>{total}</b></div><div className="ib-leads-divider" /><h3>Recent Activity</h3>{recent.length === 0 ? <p className="ib-leads-subtle">No recent activity.</p> : recent.map((lead) => <div className="ib-leads-recent" key={lead.id}><span><Users /></span><div><strong>{lead.name}</strong><small>{lead.status} · {formatDate(lead.created_at)}</small></div></div>)}</section>
      </div>
      {selected && <div className="ib-admin-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="ib-admin-dialog ib-lead-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="lead-detail-title"><div className="ib-admin-dialog-header"><div><p className="ib-leads-kicker">LEAD DETAILS</p><h2 id="lead-detail-title">{selected.name}</h2><p>{selected.company || "Individual enquiry"}</p></div><Button variant="ghost" size="icon" aria-label="Close lead details" onClick={() => setSelected(null)}><X /></Button></div><div className="ib-lead-detail-body"><p><Mail />{selected.email || "No email provided"}</p><p><Phone />{selected.phone || "No phone provided"}</p><p><CalendarDays />Received {formatDate(selected.created_at)}</p><label>Status<select value={selected.status} onChange={(event) => void updateStatus(selected, event.target.value)}>{leadStatuses.map((item) => <option key={item}>{item}</option>)}</select></label><div className="ib-lead-detail-requirement"><strong>Property / Requirement</strong><p>{selected.requirement || "No additional requirements provided."}</p></div></div><div className="ib-admin-dialog-actions"><Button variant="outline" onClick={() => setSelected(null)}>Close</Button><Button onClick={() => window.location.assign(`mailto:${selected.email}`)} disabled={!selected.email}>Reply by email</Button></div></section></div>}
    </div>
  );
}