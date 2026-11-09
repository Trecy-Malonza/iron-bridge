import { TopbarTools } from "@/components/admin/TopbarTools";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  Plus,
  Search,
  Settings,
  Shield,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { CrudView } from "@/components/admin/CrudView";
import { PropertyEditor } from "@/components/admin/PropertyEditor";
import { CareersWorkspace } from "@/components/admin/CareersWorkspace";
import { LeadsWorkspace } from "@/components/admin/LeadsWorkspace";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import "@/styles/admin-dashboard.css";
import { AdminAuth } from "@/components/admin/AdminAuth";

function AdminGate() {
  return <AdminAuth>{() => <AdminDashboard />}</AdminAuth>;
}

export const Route = createFileRoute("/admin")({
  ssr: false,
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
  component: AdminGate,
});

type Career = Tables<"careers">;
type View = "dashboard" | "properties" | "categories" | "locations" | "amenities" | "careers" | "leads" | "inquiries" | "clients" | "blog" | "media" | "pages" | "users" | "roles" | "settings";

function AdminDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loadingCareers, setLoadingCareers] = useState(true);
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

  const [profileEmail, setProfileEmail] = useState("");
  const [profileName, setProfileName] = useState("Admin");
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      const mail = u.email ?? "";
      setProfileEmail(mail);
      const meta = u.user_metadata as { full_name?: string; name?: string } | undefined;
      setProfileName(meta?.full_name || meta?.name || mail.split("@")[0] || "Admin");
    });
  }, []);
  const initials = profileName.split(/[\s._-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("") || "A";

  async function signOut() {
    sessionStorage.removeItem("ib-admin-verified");
    await supabase.auth.signOut();
    await navigate({ to: "/admin", replace: true });
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
            <TopbarTools onSelect={(v) => selectView(v as View)} />
            <Button variant="ghost" className="ib-admin-user-menu" onClick={signOut} title="Sign out">
              <span className="ib-admin-avatar">{initials}</span>
              <span className="ib-admin-user-meta"><strong>{profileName}</strong><small>{profileEmail}</small></span>
              <ChevronDown />
            </Button>
          </div>
        </header>

        <main className="ib-admin-content">
          {notice && <div className="ib-admin-notice" role="status"><CheckCircle2 /> {notice}</div>}
          {view === "dashboard" && <DashboardView careers={careers} publishedCareers={publishedCareers} onOpenCareers={() => selectView("careers")} />}
          {view === "careers" && <CareersWorkspace careers={careers} loading={loadingCareers} onRefresh={loadCareers} />}
          {view === "properties" && <PropertiesView />}
          {view === "categories" && <CategoriesView />}
          {view === "locations" && <LocationsView />}
          {view === "amenities" && <AmenitiesView />}
          {view === "leads" && <LeadsWorkspace />}
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
  return <PropertyEditor />;
}

function CategoriesView() {
  return (
    <CrudView
      table="admin_categories"
      title="Categories"
      subtitle="Property types used across your listings."
      singular="Category"
      fields={[
        { key: "name", label: "Name", placeholder: "e.g. Cold Storage" },
        { key: "description", label: "Description", type: "textarea", required: false },
      ]}
    />
  );
}

function LocationsView() {
  return (
    <CrudView
      table="admin_locations"
      title="Locations"
      subtitle="Areas where IronBridge operates, with map coordinates."
      singular="Location"
      fields={[
        { key: "name", label: "Name", placeholder: "e.g. Maai Mahiu" },
        { key: "region", label: "Region", placeholder: "e.g. Nakuru County", required: false },
        { key: "lat", label: "Latitude", type: "number" },
        { key: "lng", label: "Longitude", type: "number" },
      ]}
    />
  );
}

function AmenitiesView() {
  return (
    <CrudView
      table="admin_amenities"
      title="Amenities"
      subtitle="Features you can attach to any listing."
      singular="Amenity"
      fields={[
        { key: "name", label: "Name", placeholder: "e.g. 24/7 Security" },
        { key: "description", label: "Description", type: "textarea", required: false },
      ]}
    />
  );
}

function LeadsView() {
  return <LeadsWorkspace />;
}

function InquiriesView() {
  return (
    <CrudView
      table="admin_inquiries"
      title="Inquiries"
      subtitle="Messages sent through the contact and chat forms."
      singular="Inquiry"
      fields={[
        { key: "sender_name", label: "From" },
        { key: "email", label: "Email", type: "email", required: false },
        { key: "subject", label: "Subject", required: false },
        { key: "status", label: "Status", type: "select", options: ["Unread", "Replied", "Scheduled", "Closed"], status: true },
        { key: "message", label: "Message", type: "textarea", inTable: false, required: false },
      ]}
    />
  );
}

function ClientsView() {
  return (
    <CrudView
      table="admin_clients"
      title="Clients"
      subtitle="Tenants and buyers currently working with IronBridge."
      singular="Client"
      fields={[
        { key: "company", label: "Company" },
        { key: "contact_person", label: "Contact Person", required: false },
        { key: "email", label: "Email", type: "email", required: false },
        { key: "phone", label: "Phone", required: false },
        { key: "occupied_space", label: "Occupied Space", required: false },
        { key: "renewal_status", label: "Status", type: "select", options: ["Active", "Renewal Due", "Ended"], status: true },
      ]}
    />
  );
}

function BlogView() {
  return (
    <CrudView
      table="admin_blog_posts"
      title="Blog Posts"
      subtitle="Articles shown on the insights page."
      singular="Post"
      fields={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category", type: "select", options: ["Market Insights", "Company News", "Guides", "Development"] },
        { key: "author", label: "Author", required: false },
        { key: "status", label: "Status", type: "select", options: ["Published", "Draft"], status: true },
        { key: "excerpt", label: "Excerpt", type: "textarea", inTable: false, required: false },
      ]}
    />
  );
}

function MediaView() {
  return (
    <CrudView
      table="admin_media"
      title="Media Library"
      subtitle="Photography and illustrations used across the website."
      singular="Media Item"
      fields={[
        { key: "title", label: "Title" },
        { key: "url", label: "Link", placeholder: "https://…" },
        { key: "media_type", label: "Type", type: "select", options: ["Image", "Illustration", "Video", "Document"] },
      ]}
    />
  );
}

function PagesView() {
  return (
    <CrudView
      table="admin_pages"
      title="Pages"
      subtitle="Public pages available on the website."
      singular="Page"
      fields={[
        { key: "title", label: "Title" },
        { key: "path", label: "Path", placeholder: "/properties" },
        { key: "status", label: "Status", type: "select", options: ["Published", "Draft"], status: true },
      ]}
    />
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
  const [form, setForm] = useState({ id: "", company_name: "", email: "", phone: "", address: "", summary: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.from("admin_settings").select("*").limit(1).maybeSingle();
      if (data) {
        setForm({
          id: data.id,
          company_name: data.company_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          summary: data.summary,
        });
      }
      setLoading(false);
    })();
  }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const payload = {
      company_name: form.company_name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      summary: form.summary,
    };
    const { error } = form.id
      ? await supabase.from("admin_settings").update(payload).eq("id", form.id)
      : await supabase.from("admin_settings").insert(payload);
    setSaving(false);
    setMessage(error ? error.message : "Settings saved.");
  }

  return (
    <>
      <PageHeader title="Settings" subtitle="Company details shown across the public website." />
      {message && <div className="ib-admin-notice" role="status">{message}</div>}
      <div className="ib-admin-grid-main-side">
        <section className="ib-admin-card">
          <div className="ib-admin-card-header"><div><h3>Company Information</h3><p className="ib-admin-card-subtitle">Used in the footer and contact forms.</p></div></div>
          {loading ? <div className="ib-admin-empty">Loading settings…</div> : (
            <form className="ib-admin-form" onSubmit={save}>
              <div className="ib-admin-form-grid">
                <label>Company Name<input required value={form.company_name} onChange={(event) => setForm({ ...form, company_name: event.target.value })} /></label>
                <label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
                <label>Phone<input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
                <label>Head Office<input required value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></label>
              </div>
              <label>About Summary<textarea rows={3} value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} /></label>
              <div className="ib-admin-dialog-actions"><Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save Settings"}</Button></div>
            </form>
          )}
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
