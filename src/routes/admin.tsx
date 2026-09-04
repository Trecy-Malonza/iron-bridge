import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Pencil,
  Plus,
  Search,
  Settings,
  Shield,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login" });

    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!role) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Admin Dashboard | IronBridge Industrial Group" },
      {
        name: "description",
        content: "Private IronBridge Industrial Group administration dashboard.",
      },
      { property: "og:title", content: "Admin Dashboard | IronBridge Industrial Group" },
      {
        property: "og:description",
        content: "Private IronBridge Industrial Group administration dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminDashboard,
});

type Career = Tables<"careers">;
type CareerForm = Omit<TablesInsert<"careers">, "id" | "created_at" | "updated_at">;
type View = "dashboard" | "properties" | "careers" | "leads" | "inquiries" | "clients" | "blog" | "media" | "pages" | "users" | "roles" | "settings";

const emptyForm: CareerForm = {
  title: "",
  department: "Operations",
  location: "Maai Mahiu, Kenya",
  employment_type: "Full-time",
  experience: "3-5 Yrs Exp",
  summary: "",
  description: "",
  status: "Published",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [form, setForm] = useState<CareerForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    void loadCareers();
  }, []);

  async function loadCareers() {
    setLoadingCareers(true);
    const { data, error } = await supabase.from("careers").select("*").order("created_at", { ascending: false });
    if (error) {
      setNotice(error.message);
    } else {
      setCareers(data ?? []);
    }
    setLoadingCareers(false);
  }

  function selectView(nextView: View) {
    setView(nextView);
    setMobileOpen(false);
    setNotice(null);
  }

  function openNewCareer() {
    setEditingCareer(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEditCareer(career: Career) {
    setEditingCareer(career);
    setForm({
      title: career.title,
      department: career.department,
      location: career.location,
      employment_type: career.employment_type,
      experience: career.experience,
      summary: career.summary,
      description: career.description,
      status: career.status,
    });
    setFormOpen(true);
  }

  async function saveCareer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setNotice(null);
    const result = editingCareer
      ? await supabase.from("careers").update(form).eq("id", editingCareer.id).select().single()
      : await supabase.from("careers").insert(form).select().single();

    if (result.error) {
      setNotice(result.error.message);
    } else {
      setFormOpen(false);
      setNotice(editingCareer ? "Career updated successfully." : "Career added successfully.");
      await loadCareers();
    }
    setSaving(false);
  }

  async function deleteCareer(career: Career) {
    if (!window.confirm(`Delete “${career.title}”?`)) return;
    const { error } = await supabase.from("careers").delete().eq("id", career.id);
    if (error) {
      setNotice(error.message);
      return;
    }
    setNotice("Career deleted successfully.");
    await loadCareers();
  }

  async function signOut() {
    await supabase.auth.signOut();
    await navigate({ to: "/login", replace: true });
  }

  const publishedCareers = useMemo(() => careers.filter((career) => career.status === "Published").length, [careers]);

  return (
    <div className="ib-admin-app">
      <aside className={`ib-admin-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="ib-admin-brand">
          <Link to="/" aria-label="Go to IronBridge home" onClick={() => setMobileOpen(false)}>
            <Logo variant="light" />
          </Link>
        </div>
        <nav className="ib-admin-sidebar-nav" aria-label="Admin navigation">
          <AdminNavItem icon={<LayoutDashboard />} label="Dashboard" active={view === "dashboard"} onClick={() => selectView("dashboard")} />
          <div className="ib-admin-nav-section">PROPERTY MANAGEMENT</div>
          <AdminNavItem icon={<Building2 />} label="Properties" active={view === "properties"} onClick={() => selectView("properties")} />
          <AdminNavItem icon={<Plus />} label="Add New Property" sub active={false} onClick={() => selectView("properties")} />
          <AdminNavItem icon={<ClipboardList />} label="Categories" active={false} onClick={() => selectView("properties")} />
          <AdminNavItem icon={<MapPin />} label="Locations" active={false} onClick={() => selectView("properties")} />
          <AdminNavItem icon={<Shield />} label="Amenities" active={false} onClick={() => selectView("properties")} />
          <div className="ib-admin-nav-section">CRM &amp; LEADS</div>
          <AdminNavItem icon={<Users />} label="Leads" active={view === "leads"} onClick={() => selectView("leads")} />
          <AdminNavItem icon={<MessageSquare />} label="Inquiries" active={view === "inquiries"} onClick={() => selectView("inquiries")} />
          <AdminNavItem icon={<UserRound />} label="Clients" active={view === "clients"} onClick={() => selectView("clients")} />
          <div className="ib-admin-nav-section">CONTENT MANAGEMENT</div>
          <AdminNavItem icon={<BriefcaseBusiness />} label="Careers" active={view === "careers"} onClick={() => selectView("careers")} />
          <AdminNavItem icon={<FileText />} label="Blog Posts" active={view === "blog"} onClick={() => selectView("blog")} />
          <AdminNavItem icon={<Image />} label="Media Library" active={view === "media"} onClick={() => selectView("media")} />
          <AdminNavItem icon={<FileText />} label="Pages" active={view === "pages"} onClick={() => selectView("pages")} />
          <div className="ib-admin-nav-section">SYSTEM</div>
          <AdminNavItem icon={<Users />} label="Users" active={view === "users"} onClick={() => selectView("users")} />
          <AdminNavItem icon={<Shield />} label="Roles & Permissions" active={view === "roles"} onClick={() => selectView("roles")} />
          <AdminNavItem icon={<Settings />} label="Settings" active={view === "settings"} onClick={() => selectView("settings")} />
        </nav>
        <div className="ib-admin-sidebar-footer">
          <p>Need Help?</p>
          <p className="muted">Visit our documentation or contact support.</p>
          <Button variant="outline" size="sm" className="ib-admin-support-button" onClick={() => setNotice("Contact support: support@ironbridge.co.ke")}>Contact Support</Button>
        </div>
      </aside>

      <div className="ib-admin-main-wrap">
        <header className="ib-admin-topbar">
          <div className="ib-admin-topbar-left">
            <Button variant="ghost" size="icon" className="ib-admin-menu-toggle" aria-label="Open admin menu" onClick={() => setMobileOpen((open) => !open)}>
              {mobileOpen ? <X /> : <Menu />}
            </Button>
            <div className="ib-admin-breadcrumb">Dashboard {view !== "dashboard" && <><span>›</span> <strong>{view[0]?.toUpperCase() + view.slice(1)}</strong></>}</div>
          </div>
          <div className="ib-admin-topbar-right">
            <label className="ib-admin-search-box">
              <Search />
              <input type="search" placeholder="Search anything..." aria-label="Search anything" />
              <kbd>⌘K</kbd>
            </label>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="ib-admin-icon-button"><Bell /><span className="ib-admin-badge">3</span></Button>
            <Button variant="ghost" size="icon" aria-label="Messages" className="ib-admin-icon-button"><MessageSquare /><span className="ib-admin-badge">7</span></Button>
            <Button variant="ghost" className="ib-admin-user-menu" onClick={signOut} title="Sign out">
              <span className="ib-admin-avatar">JA</span>
              <span className="ib-admin-user-meta"><strong>John Admin</strong><small>Super Admin</small></span>
              <ChevronDown />
            </Button>
          </div>
        </header>

        <main className="ib-admin-content">
          {notice && <div className="ib-admin-notice" role="status"><CheckCircle2 /> {notice}</div>}
          {view === "dashboard" && <DashboardView careers={careers} publishedCareers={publishedCareers} onOpenCareers={() => selectView("careers")} />}
          {view === "careers" && (
            <CareersView
              careers={careers}
              publishedCareers={publishedCareers}
              loading={loadingCareers}
              onAdd={openNewCareer}
              onEdit={openEditCareer}
              onDelete={deleteCareer}
            />
          )}
          {view !== "dashboard" && view !== "careers" && <PlaceholderView title={view[0]?.toUpperCase() + view.slice(1)} />}
        </main>
      </div>

      {formOpen && <CareerDialog form={form} editing={editingCareer !== null} saving={saving} onChange={setForm} onClose={() => setFormOpen(false)} onSubmit={saveCareer} />}
    </div>
  );
}

function AdminNavItem({ icon, label, active, sub = false, onClick }: { icon: React.ReactNode; label: string; active: boolean; sub?: boolean; onClick: () => void }) {
  return <button type="button" className={`ib-admin-nav-item ${active ? "active" : ""} ${sub ? "sub" : ""}`} onClick={onClick}>{icon}<span>{label}</span></button>;
}

function DashboardView({ careers, publishedCareers, onOpenCareers }: { careers: Career[]; publishedCareers: number; onOpenCareers: () => void }) {
  return (
    <>
      <div className="ib-admin-page-header"><div><h1>Dashboard</h1><p>Overview of properties, leads and content.</p></div><Button onClick={onOpenCareers}><Plus /> Manage Careers</Button></div>
      <div className="ib-admin-stat-grid">
        <StatTile icon={<Building2 />} tone="blue" value="5" label="Total Properties" detail="5 published" />
        <StatTile icon={<Users />} tone="purple" value="24" label="Total Leads" detail="8 new" />
        <StatTile icon={<CheckCircle2 />} tone="green" value="27" label="Converted" detail="This quarter" />
        <StatTile icon={<MessageSquare />} tone="orange" value="12" label="Inquiries" detail="4 awaiting reply" />
        <StatTile icon={<BriefcaseBusiness />} tone="teal" value={String(careers.length)} label="Career Listings" detail={`${publishedCareers} published`} />
      </div>
      <div className="ib-admin-grid-main-side">
        <section className="ib-admin-card"><div className="ib-admin-card-header"><h3>Recent Activity</h3><Button variant="ghost" size="sm">View All</Button></div><div className="ib-admin-activity-list"><Activity icon={<BriefcaseBusiness />} title="Career listings ready" text={`${publishedCareers} roles are currently published on the public site.`} /><Activity icon={<CheckCircle2 />} title="Dashboard secured" text="Admin access is protected by your account role." /><Activity icon={<Building2 />} title="Properties online" text="Your property portfolio is visible to visitors." /></div></section>
        <section className="ib-admin-card"><div className="ib-admin-card-header"><h3>Quick Actions</h3></div><div className="ib-admin-quick-actions"><Button variant="outline" onClick={onOpenCareers}><Plus /> Add Career</Button><Button variant="outline"><Building2 /> View Properties</Button><Button variant="outline"><MessageSquare /> Review Inquiries</Button></div></section>
      </div>
    </>
  );
}

function StatTile({ icon, tone, value, label, detail }: { icon: React.ReactNode; tone: string; value: string; label: string; detail: string }) {
  return <div className="ib-admin-stat-tile"><span className={`ib-admin-stat-icon ${tone}`}>{icon}</span><div><strong>{value}</strong><span>{label}</span><small>{detail}</small></div></div>;
}

function Activity({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="ib-admin-activity"><span className="ib-admin-activity-icon">{icon}</span><div><strong>{title}</strong><p>{text}</p></div></div>;
}

function CareersView({ careers, publishedCareers, loading, onAdd, onEdit, onDelete }: { careers: Career[]; publishedCareers: number; loading: boolean; onAdd: () => void; onEdit: (career: Career) => void; onDelete: (career: Career) => void }) {
  return <>
    <div className="ib-admin-page-header"><div><h1>Careers</h1><p>Manage the job openings displayed on the public website.</p></div><Button onClick={onAdd}><Plus /> Add New Career</Button></div>
    <div className="ib-admin-stat-grid ib-admin-career-stats"><StatTile icon={<BriefcaseBusiness />} tone="blue" value={String(careers.length)} label="Total Careers" detail="All listings" /><StatTile icon={<CheckCircle2 />} tone="green" value={String(publishedCareers)} label="Published" detail="Visible publicly" /><StatTile icon={<FileText />} tone="orange" value={String(careers.length - publishedCareers)} label="Drafts" detail="Not visible publicly" /></div>
    <section className="ib-admin-card"><div className="ib-admin-card-header"><div><h3>Career Listings</h3><p className="ib-admin-card-subtitle">Create, edit or remove opportunities for the IronBridge team.</p></div><Button variant="outline" size="sm" onClick={onAdd}><Plus /> Add Career</Button></div><div className="ib-admin-table-wrap">{loading ? <div className="ib-admin-empty">Loading career listings…</div> : careers.length === 0 ? <div className="ib-admin-empty">No career listings yet. Add your first opportunity.</div> : <table className="ib-admin-data-table"><thead><tr><th>Role</th><th>Department</th><th>Location</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead><tbody>{careers.map((career) => <tr key={career.id}><td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><BriefcaseBusiness /></span><div><strong>{career.title}</strong><small>{career.summary || "No summary added"}</small></div></div></td><td>{career.department}</td><td>{career.location}</td><td>{career.employment_type}</td><td><span className={`ib-admin-status ${career.status.toLowerCase()}`}>{career.status}</span></td><td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Edit ${career.title}`} onClick={() => onEdit(career)}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${career.title}`} onClick={() => onDelete(career)}><Trash2 /></Button></div></td></tr>)}</tbody></table>}</div></section>
  </>;
}

function CareerDialog({ form, editing, saving, onChange, onClose, onSubmit }: { form: CareerForm; editing: boolean; saving: boolean; onChange: (form: CareerForm) => void; onClose: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  function update(field: keyof CareerForm, value: string) { onChange({ ...form, [field]: value }); }
  return <div className="ib-admin-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="ib-admin-dialog" role="dialog" aria-modal="true" aria-labelledby="career-dialog-title"><div className="ib-admin-dialog-header"><div><h2 id="career-dialog-title">{editing ? "Edit Career" : "Add New Career"}</h2><p>Keep the public careers page up to date.</p></div><Button variant="ghost" size="icon" aria-label="Close career form" onClick={onClose}><X /></Button></div><form onSubmit={onSubmit} className="ib-admin-form"><div className="ib-admin-form-grid"><label>Job Title<input required value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="e.g. Property Manager" /></label><label>Department<input required value={form.department} onChange={(event) => update("department", event.target.value)} placeholder="e.g. Operations" /></label><label>Location<input required value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="e.g. Nairobi, Kenya" /></label><label>Employment Type<select value={form.employment_type} onChange={(event) => update("employment_type", event.target.value)}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label><label>Experience<input required value={form.experience} onChange={(event) => update("experience", event.target.value)} placeholder="e.g. 3-5 Yrs Exp" /></label><label>Status<select value={form.status} onChange={(event) => update("status", event.target.value)}><option>Published</option><option>Draft</option></select></label></div><label>Short Summary<textarea required rows={3} value={form.summary} onChange={(event) => update("summary", event.target.value)} placeholder="A concise description shown on the careers page." /></label><label>Full Description<textarea required rows={5} value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="Describe the role, responsibilities and requirements." /></label><div className="ib-admin-dialog-actions"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving…" : editing ? "Save Changes" : "Add Career"}</Button></div></form></section></div>;
}

function PlaceholderView({ title }: { title: string }) { return <div className="ib-admin-placeholder"><BarChart3 /><h1>{title}</h1><p>This workspace is ready for your next content workflow.</p></div>; }
