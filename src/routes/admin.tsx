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
import { properties } from "@/data/properties";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import "@/styles/admin-dashboard.css";

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
type View = "dashboard" | "properties" | "categories" | "locations" | "amenities" | "careers" | "leads" | "inquiries" | "clients" | "blog" | "media" | "pages" | "users" | "roles" | "settings";

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
          <AdminNavItem icon={<ClipboardList />} label="Categories" active={view === "categories"} onClick={() => selectView("categories")} />
          <AdminNavItem icon={<MapPin />} label="Locations" active={view === "locations"} onClick={() => selectView("locations")} />
          <AdminNavItem icon={<Shield />} label="Amenities" active={view === "amenities"} onClick={() => selectView("amenities")} />
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
          {view === "properties" && <PropertiesView />}
          {view === "categories" && <CategoriesView />}
          {view === "locations" && <LocationsView />}
          {view === "amenities" && <AmenitiesView />}
          {view === "leads" && <LeadsView />}
          {view === "inquiries" && <InquiriesView />}
          {view === "clients" && <ClientsView />}
          {view === "blog" && <BlogView />}
          {view === "media" && <MediaView />}
          {view === "pages" && <PagesView />}
          {view === "users" && <UsersView />}
          {view === "roles" && <RolesView />}
          {view === "settings" && <SettingsView />}

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

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="ib-admin-page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function DataCard({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="ib-admin-card">
      <div className="ib-admin-card-header">
        <div><h3>{title}</h3>{subtitle && <p className="ib-admin-card-subtitle">{subtitle}</p>}</div>
        {action}
      </div>
      <div className="ib-admin-table-wrap">{children}</div>
    </section>
  );
}

function PropertiesView() {
  return (
    <>
      <PageHeader title="Properties" subtitle="Industrial space currently listed on the public website." action={<Button><Plus /> Add New Property</Button>} />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<Building2 />} tone="blue" value={String(properties.length)} label="Total Properties" detail="All listings" />
        <StatTile icon={<CheckCircle2 />} tone="green" value={String(properties.length)} label="Available" detail="Visible publicly" />
        <StatTile icon={<MapPin />} tone="purple" value="5" label="Locations" detail="Across Kenya" />
        <StatTile icon={<BarChart3 />} tone="orange" value="47,500" label="Total SQM" detail="Portfolio size" />
      </div>
      <DataCard title="Property Listings" subtitle="Every industrial space shown to visitors." action={<Button variant="outline" size="sm"><Plus /> Add Property</Button>}>
        <table className="ib-admin-data-table">
          <thead><tr><th>Property</th><th>Location</th><th>Size</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.slug}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><Building2 /></span><div><strong>{property.name}</strong><small>{property.description}</small></div></div></td>
                <td>{property.location}</td>
                <td>{property.size}</td>
                <td><span className="ib-admin-status published">{property.badge}</span></td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Edit ${property.name}`}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${property.name}`}><Trash2 /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

function CategoriesView() {
  const categories = [
    { name: "Grade A Warehouse", detail: "Modern high-spec warehousing with dock loading." },
    { name: "Cold Storage", detail: "Temperature-controlled space for perishable goods." },
    { name: "Industrial Godown", detail: "High-eaves storage with strong road access." },
    { name: "Logistics Hub", detail: "Cross-docking and container yard facilities." },
    { name: "Light Industrial", detail: "Flexible units for assembly and light manufacturing." },
    { name: "Industrial Land", detail: "Serviced parcels ready for build-to-suit." },
  ];
  const counts = (name: string) => properties.filter((p) => p.name.toLowerCase().includes(name.split(" ")[0]!.toLowerCase())).length;
  return (
    <>
      <PageHeader title="Categories" subtitle="Property types used to organise the public listings." action={<Button><Plus /> Add Category</Button>} />
      <DataCard title="Property Categories" subtitle="Each category groups listings shown on the website.">
        <table className="ib-admin-data-table">
          <thead><tr><th>Category</th><th>Description</th><th>Listings</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.name}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><ClipboardList /></span><div><strong>{c.name}</strong><small>{c.detail}</small></div></div></td>
                <td>{c.detail}</td>
                <td>{counts(c.name)}</td>
                <td><span className="ib-admin-status published">Active</span></td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Edit ${c.name}`}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${c.name}`}><Trash2 /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

function LocationsView() {
  return (
    <>
      <PageHeader title="Locations" subtitle="Every town and industrial area where IronBridge has space." action={<Button><Plus /> Add Location</Button>} />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<MapPin />} tone="purple" value={String(new Set(properties.map((p) => p.location)).size)} label="Locations" detail="Across Kenya" />
        <StatTile icon={<Building2 />} tone="blue" value={String(properties.length)} label="Listings Mapped" detail="With coordinates" />
      </div>
      <DataCard title="Mapped Locations" subtitle="Coordinates power the map on the properties page.">
        <table className="ib-admin-data-table">
          <thead><tr><th>Location</th><th>Property</th><th>Coordinates</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.slug}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><MapPin /></span><div><strong>{p.location}</strong><small>{p.size}</small></div></div></td>
                <td>{p.name}</td>
                <td>{p.lat.toFixed(4)}, {p.lng.toFixed(4)}</td>
                <td><span className="ib-admin-status published">Mapped</span></td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Edit ${p.location}`}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${p.location}`}><Trash2 /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

function AmenitiesView() {
  const amenities = Array.from(new Set(properties.flatMap((p) => p.features)));
  return (
    <>
      <PageHeader title="Amenities" subtitle="Features tagged on each industrial space." action={<Button><Plus /> Add Amenity</Button>} />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<Shield />} tone="teal" value={String(amenities.length)} label="Amenities" detail="In use across listings" />
        <StatTile icon={<Building2 />} tone="blue" value={String(properties.length)} label="Listings Tagged" detail="All properties" />
      </div>
      <DataCard title="Amenity List" subtitle="Shown as tags on property cards and detail pages.">
        <table className="ib-admin-data-table">
          <thead><tr><th>Amenity</th><th>Used By</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {amenities.map((a) => (
              <tr key={a}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><Shield /></span><div><strong>{a}</strong><small>Property feature tag</small></div></div></td>
                <td>{properties.filter((p) => p.features.includes(a)).map((p) => p.name).join(", ")}</td>
                <td><span className="ib-admin-status published">Active</span></td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Edit ${a}`}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${a}`}><Trash2 /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

const leads = [
  { name: "Daniel Mwangi", company: "Rift Logistics Ltd", email: "daniel@riftlogistics.co.ke", phone: "+254 712 004 118", interest: "Grade A Warehouse", status: "New" },
  { name: "Amina Yusuf", company: "Coastline Freight", email: "amina@coastlinefreight.com", phone: "+254 733 887 221", interest: "Logistics Hub", status: "Contacted" },
  { name: "Peter Kariuki", company: "Fresh Valley Produce", email: "peter@freshvalley.co.ke", phone: "+254 720 551 903", interest: "Cold Storage Facility", status: "Qualified" },
  { name: "Sarah Njeri", company: "Njeri Manufacturing", email: "sarah@njerimfg.co.ke", phone: "+254 701 442 660", interest: "Light Industrial Unit", status: "Converted" },
];

function LeadsView() {
  return (
    <>
      <PageHeader title="Leads" subtitle="Enquiries captured from the property finder form." action={<Button><Plus /> Add Lead</Button>} />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<Users />} tone="blue" value="24" label="Total Leads" detail="All time" />
        <StatTile icon={<Bell />} tone="orange" value="8" label="New" detail="Awaiting first contact" />
        <StatTile icon={<ClipboardList />} tone="purple" value="9" label="Qualified" detail="In discussion" />
        <StatTile icon={<CheckCircle2 />} tone="green" value="7" label="Converted" detail="This quarter" />
      </div>
      <DataCard title="Recent Leads" subtitle="Follow up on the newest enquiries first.">
        <table className="ib-admin-data-table">
          <thead><tr><th>Lead</th><th>Contact</th><th>Interested In</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.email}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><UserRound /></span><div><strong>{lead.name}</strong><small>{lead.company}</small></div></div></td>
                <td>{lead.email}<br /><small>{lead.phone}</small></td>
                <td>{lead.interest}</td>
                <td><span className={`ib-admin-status ${lead.status === "Converted" ? "published" : "draft"}`}>{lead.status}</span></td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Email ${lead.name}`}><MessageSquare /></Button><Button variant="ghost" size="icon" aria-label={`Edit ${lead.name}`}><Pencil /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

const inquiries = [
  { subject: "Availability of 20,000 sqm space", from: "logistics@savannahgroup.co.ke", received: "Today, 08:12", status: "New" },
  { subject: "Lease terms for Athi River cold store", from: "procurement@chillfresh.co.ke", received: "Yesterday, 16:40", status: "Replied" },
  { subject: "Site visit request — Maai Mahiu", from: "ops@bluelineparcels.com", received: "2 Sep, 11:05", status: "Scheduled" },
  { subject: "Build-to-suit enquiry", from: "info@kenpackltd.co.ke", received: "31 Aug, 09:22", status: "Replied" },
];

function InquiriesView() {
  return (
    <>
      <PageHeader title="Inquiries" subtitle="Messages sent through the contact and chat forms." />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<MessageSquare />} tone="blue" value="12" label="Total Inquiries" detail="This month" />
        <StatTile icon={<Bell />} tone="orange" value="4" label="Awaiting Reply" detail="Needs attention" />
        <StatTile icon={<CheckCircle2 />} tone="green" value="8" label="Resolved" detail="Closed out" />
      </div>
      <DataCard title="Inbox" subtitle="Reply within 24 hours to keep response times strong.">
        <table className="ib-admin-data-table">
          <thead><tr><th>Subject</th><th>From</th><th>Received</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item.subject}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><MessageSquare /></span><div><strong>{item.subject}</strong><small>{item.from}</small></div></div></td>
                <td>{item.from}</td>
                <td>{item.received}</td>
                <td><span className={`ib-admin-status ${item.status === "New" ? "draft" : "published"}`}>{item.status}</span></td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Reply to ${item.subject}`}><MessageSquare /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${item.subject}`}><Trash2 /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

const clients = [
  { name: "Savannah Logistics Group", contact: "Mercy Achieng", space: "Grade A Warehouse — 12,000 sqm", since: "Jan 2024", status: "Active" },
  { name: "ChillFresh Kenya", contact: "Victor Omondi", space: "Cold Storage Facility — 8,500 sqm", since: "Aug 2024", status: "Active" },
  { name: "Blueline Parcels", contact: "Faith Wanjiru", space: "Logistics Hub — 18,000 sqm", since: "Mar 2025", status: "Active" },
  { name: "KenPack Ltd", contact: "Joseph Mutua", space: "Light Industrial Unit — 3,800 sqm", since: "Nov 2023", status: "Renewal Due" },
];

function ClientsView() {
  return (
    <>
      <PageHeader title="Clients" subtitle="Tenants and buyers currently working with IronBridge." action={<Button><Plus /> Add Client</Button>} />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<UserRound />} tone="blue" value="18" label="Total Clients" detail="Active accounts" />
        <StatTile icon={<Building2 />} tone="purple" value="42,300" label="Leased SQM" detail="Under management" />
        <StatTile icon={<Bell />} tone="orange" value="3" label="Renewals Due" detail="Next 90 days" />
      </div>
      <DataCard title="Client Accounts" subtitle="Relationship owners and occupied space.">
        <table className="ib-admin-data-table">
          <thead><tr><th>Client</th><th>Main Contact</th><th>Space</th><th>Client Since</th><th>Status</th></tr></thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.name}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><Building2 /></span><div><strong>{client.name}</strong><small>{client.space}</small></div></div></td>
                <td>{client.contact}</td>
                <td>{client.space}</td>
                <td>{client.since}</td>
                <td><span className={`ib-admin-status ${client.status === "Active" ? "published" : "draft"}`}>{client.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

const posts = [
  { title: "Why Maai Mahiu Is Kenya's Next Industrial Frontier", category: "Market Insights", author: "Brian O.", date: "2 Sep 2026", status: "Published" },
  { title: "Cold Chain Demand Reshapes Warehouse Design", category: "Market Insights", author: "Grace W. Kariuki", date: "24 Aug 2026", status: "Published" },
  { title: "IronBridge Opens New Logistics Hub", category: "Company News", author: "Collins K. Kimani", date: "12 Aug 2026", status: "Published" },
  { title: "Choosing Between Leasing and Build-to-Suit", category: "Guides", author: "Brian O.", date: "—", status: "Draft" },
];

function BlogView() {
  return (
    <>
      <PageHeader title="Blog Posts" subtitle="Articles published on the insights page." action={<Button><Plus /> New Post</Button>} />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<FileText />} tone="blue" value="4" label="Total Posts" detail="All articles" />
        <StatTile icon={<CheckCircle2 />} tone="green" value="3" label="Published" detail="Live on site" />
        <StatTile icon={<Pencil />} tone="orange" value="1" label="Drafts" detail="Work in progress" />
      </div>
      <DataCard title="Articles" subtitle="Write, edit and publish industrial market insights." action={<Button variant="outline" size="sm"><Plus /> New Post</Button>}>
        <table className="ib-admin-data-table">
          <thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.title}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><FileText /></span><div><strong>{post.title}</strong><small>{post.category}</small></div></div></td>
                <td>{post.category}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td><span className={`ib-admin-status ${post.status.toLowerCase()}`}>{post.status}</span></td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Edit ${post.title}`}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${post.title}`}><Trash2 /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

function MediaView() {
  return (
    <>
      <PageHeader title="Media Library" subtitle="Photography and illustrations used across the website." action={<Button><Plus /> Upload Media</Button>} />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<Image />} tone="blue" value={String(properties.length + 6)} label="Total Files" detail="Images in use" />
        <StatTile icon={<Building2 />} tone="purple" value={String(properties.length)} label="Property Images" detail="Listing photos" />
        <StatTile icon={<UserRound />} tone="teal" value="3" label="Team Photos" detail="Leadership portraits" />
      </div>
      <DataCard title="Files" subtitle="Every asset referenced by the public pages.">
        <table className="ib-admin-data-table">
          <thead><tr><th>File</th><th>Used On</th><th>Type</th><th>Actions</th></tr></thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.slug}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><Image /></span><div><strong>{property.name} image</strong><small>{property.location}</small></div></div></td>
                <td>Properties</td>
                <td>Image</td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Replace ${property.name} image`}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${property.name} image`}><Trash2 /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

const pages = [
  { name: "Home", path: "/", status: "Published" },
  { name: "Properties", path: "/properties", status: "Published" },
  { name: "Careers", path: "/careers", status: "Published" },
  { name: "Blog & Insights", path: "/blog", status: "Published" },
  { name: "Chat Assistant", path: "/chat", status: "Published" },
];

function PagesView() {
  return (
    <>
      <PageHeader title="Pages" subtitle="Public pages available on the website." action={<Button><Plus /> Add Page</Button>} />
      <DataCard title="Site Pages" subtitle="Everything a visitor can reach.">
        <table className="ib-admin-data-table">
          <thead><tr><th>Page</th><th>Address</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.path}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><FileText /></span><div><strong>{page.name}</strong><small>{page.path}</small></div></div></td>
                <td>{page.path}</td>
                <td><span className="ib-admin-status published">{page.status}</span></td>
                <td><div className="ib-admin-row-actions"><Button variant="ghost" size="icon" aria-label={`Edit ${page.name}`}><Pencil /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

function UsersView() {
  const [users, setUsers] = useState<{ user_id: string; role: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.from("user_roles").select("user_id, role");
      setUsers(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <PageHeader title="Users" subtitle="Accounts that can sign in to IronBridge." />
      <div className="ib-admin-stat-grid">
        <StatTile icon={<Users />} tone="blue" value={String(users.length)} label="Accounts With Roles" detail="Assigned access" />
        <StatTile icon={<Shield />} tone="purple" value={String(users.filter((user) => user.role === "admin").length)} label="Administrators" detail="Full dashboard access" />
      </div>
      <DataCard title="Team Accounts" subtitle="Roles decide who can open this dashboard.">
        {loading ? <div className="ib-admin-empty">Loading accounts…</div> : users.length === 0 ? <div className="ib-admin-empty">No roles assigned yet.</div> : (
          <table className="ib-admin-data-table">
            <thead><tr><th>Account</th><th>Role</th><th>Access</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={`${user.user_id}-${user.role}`}>
                  <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><UserRound /></span><div><strong>{user.user_id.slice(0, 8)}…</strong><small>Signed-in account</small></div></div></td>
                  <td>{user.role}</td>
                  <td><span className={`ib-admin-status ${user.role === "admin" ? "published" : "draft"}`}>{user.role === "admin" ? "Dashboard" : "Website only"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DataCard>
    </>
  );
}

const rolePermissions = [
  { role: "Super Admin", description: "Full access to every section of the dashboard.", permissions: "Properties, Careers, Leads, Content, Users, Settings" },
  { role: "Admin", description: "Manages listings, careers and enquiries.", permissions: "Properties, Careers, Leads, Inquiries, Content" },
  { role: "User", description: "Standard website account with no dashboard access.", permissions: "Public website only" },
];

function RolesView() {
  return (
    <>
      <PageHeader title="Roles & Permissions" subtitle="What each level of access can do." />
      <DataCard title="Access Levels" subtitle="Roles are stored securely on your account, not in the browser.">
        <table className="ib-admin-data-table">
          <thead><tr><th>Role</th><th>Description</th><th>Can Access</th></tr></thead>
          <tbody>
            {rolePermissions.map((item) => (
              <tr key={item.role}>
                <td><div className="ib-admin-lead-cell"><span className="ib-admin-table-avatar"><Shield /></span><div><strong>{item.role}</strong><small>{item.description}</small></div></div></td>
                <td>{item.description}</td>
                <td>{item.permissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>
    </>
  );
}

function SettingsView() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Company details shown across the public website." />
      <div className="ib-admin-grid-main-side">
        <section className="ib-admin-card">
          <div className="ib-admin-card-header"><div><h3>Company Information</h3><p className="ib-admin-card-subtitle">Used in the footer and contact forms.</p></div></div>
          <form className="ib-admin-form" onSubmit={(event) => event.preventDefault()}>
            <div className="ib-admin-form-grid">
              <label>Company Name<input defaultValue="IronBridge Industrial Group" /></label>
              <label>Email<input defaultValue="info@ironbridge.co.ke" /></label>
              <label>Phone<input defaultValue="+254 700 000 000" /></label>
              <label>Head Office<input defaultValue="Maai Mahiu, Kenya" /></label>
              <label>Office Hours<input defaultValue="Mon – Fri, 8:00am – 5:00pm" /></label>
              <label>WhatsApp Number<input defaultValue="+254 700 000 000" /></label>
            </div>
            <label>About Summary<textarea rows={3} defaultValue="IronBridge Industrial Group develops, leases and manages Grade A industrial space across Kenya." /></label>
            <div className="ib-admin-dialog-actions"><Button type="submit">Save Settings</Button></div>
          </form>
        </section>
        <section className="ib-admin-card">
          <div className="ib-admin-card-header"><h3>Status</h3></div>
          <div className="ib-admin-activity-list">
            <Activity icon={<CheckCircle2 />} title="Website live" text="Your public pages are online and reachable." />
            <Activity icon={<Shield />} title="Admin access protected" text="Only accounts with the admin role can open this dashboard." />
            <Activity icon={<BriefcaseBusiness />} title="Careers connected" text="Careers you add here appear on the public careers page." />
          </div>
        </section>
      </div>
    </>
  );
}
