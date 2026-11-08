import { useEffect, useState } from "react";
import { BriefcaseBusiness, CheckCircle2, FileText, Pencil, Plus, Save, Search, Star, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Json, Tables, TablesInsert } from "@/integrations/supabase/types";
import "@/styles/careers-workspace.css";

type Career = Tables<"careers">;
type CareerForm = Omit<TablesInsert<"careers">, "id" | "created_at" | "updated_at">;
type CareerPageForm = {
  title: string;
  subtitle: string;
  hero_image: string;
  body_content: string;
  status: string;
  publish_date: string;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  keywords: string;
};

const emptyCareer: CareerForm = {
  title: "",
  department: "Operations",
  location: "Maai Mahiu, Kenya",
  employment_type: "Full-time",
  experience: "3-5 Yrs Exp",
  summary: "",
  description: "",
  status: "Draft",
  featured: false,
  salary_range: "",
  application_type: "Email",
  application_email: "careers@ironbridge.co.ke",
  application_url: "",
  requirements: [],
  benefits: [],
  seo_title: "",
  seo_description: "",
  publish_date: null,
  expiry_date: null,
};

const emptyPage: CareerPageForm = {
  title: "Careers",
  subtitle: "Build the future of industrial Kenya with us.",
  hero_image: "",
  body_content: "",
  status: "Published",
  publish_date: "",
  seo_title: "",
  seo_description: "",
  canonical_url: "",
  keywords: "",
};

function toDateInput(value: string | null | undefined) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

function jsonLines(value: Json | undefined) {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string").join("\n");
  return typeof value === "string" ? value : "";
}

function linesJson(value: string): Json {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function CareerStat({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: number; note: string }) {
  return <div className="ib-career-stat"><span>{icon}</span><div><strong>{value}</strong><small>{label}</small><em>{note}</em></div></div>;
}

export function CareersWorkspace({ careers, loading, onRefresh }: { careers: Career[]; loading: boolean; onRefresh: () => Promise<void> }) {
  const [section, setSection] = useState<"page" | "jobs">("page");
  const [page, setPage] = useState<CareerPageForm>(emptyPage);
  const [pageId, setPageId] = useState<string | null>(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [savingPage, setSavingPage] = useState(false);
  const [pageMessage, setPageMessage] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [jobForm, setJobForm] = useState<CareerForm>(emptyCareer);
  const [editing, setEditing] = useState<Career | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savingJob, setSavingJob] = useState(false);
  const [jobMessage, setJobMessage] = useState("");

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabase.from("admin_pages").select("*").eq("path", "/careers").maybeSingle();
      if (data) {
        setPageId(data.id);
        setPage({
          title: data.title,
          subtitle: data.subtitle,
          hero_image: data.hero_image,
          body_content: data.body_content,
          status: data.status,
          publish_date: toDateInput(data.publish_date),
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          canonical_url: data.canonical_url,
          keywords: Array.isArray(data.keywords) ? data.keywords.filter((item): item is string => typeof item === "string").join(", ") : "",
        });
      }
      if (error) setPageMessage(error.message);
      setLoadingPage(false);
    })();
  }, []);

  async function savePage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingPage(true);
    setPageMessage("");
    const payload = {
      title: page.title.trim(),
      path: "/careers",
      subtitle: page.subtitle.trim(),
      hero_image: page.hero_image.trim(),
      body_content: page.body_content.trim(),
      status: page.status,
      publish_date: page.publish_date ? new Date(`${page.publish_date}T09:00:00`).toISOString() : null,
      seo_title: page.seo_title.trim(),
      seo_description: page.seo_description.trim(),
      canonical_url: page.canonical_url.trim(),
      keywords: page.keywords.split(",").map((item) => item.trim()).filter(Boolean),
    };
    const result = pageId
      ? await supabase.from("admin_pages").update(payload).eq("id", pageId).select("id").single()
      : await supabase.from("admin_pages").insert(payload).select("id").single();
    if (result.error) setPageMessage(result.error.message);
    else {
      setPageId(result.data.id);
      setPageMessage("Careers page saved.");
    }
    setSavingPage(false);
  }

  function openNewJob() {
    setEditing(null);
    setJobForm({ ...emptyCareer });
    setJobMessage("");
    setDialogOpen(true);
  }

  function openEditJob(career: Career) {
    setEditing(career);
    setJobForm({
      title: career.title,
      department: career.department,
      location: career.location,
      employment_type: career.employment_type,
      experience: career.experience,
      summary: career.summary,
      description: career.description,
      status: career.status,
      featured: career.featured,
      salary_range: career.salary_range,
      application_type: career.application_type,
      application_email: career.application_email,
      application_url: career.application_url,
      requirements: career.requirements,
      benefits: career.benefits,
      seo_title: career.seo_title,
      seo_description: career.seo_description,
      publish_date: toDateInput(career.publish_date),
      expiry_date: toDateInput(career.expiry_date),
    });
    setJobMessage("");
    setDialogOpen(true);
  }

  async function saveJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingJob(true);
    setJobMessage("");
    const payload: CareerForm = {
      ...jobForm,
      title: String(jobForm.title ?? "").trim(),
      requirements: linesJson(jsonLines(jobForm.requirements)),
      benefits: linesJson(jsonLines(jobForm.benefits)),
      publish_date: jobForm.publish_date ? new Date(`${jobForm.publish_date}T09:00:00`).toISOString() : null,
      expiry_date: jobForm.expiry_date || null,
    };
    const result = editing
      ? await supabase.from("careers").update(payload).eq("id", editing.id)
      : await supabase.from("careers").insert(payload);
    if (result.error) setJobMessage(result.error.message);
    else {
      setDialogOpen(false);
      await onRefresh();
    }
    setSavingJob(false);
  }

  async function removeJob(career: Career) {
    if (!window.confirm(`Delete “${career.title}”? This cannot be undone.`)) return;
    const { error } = await supabase.from("careers").delete().eq("id", career.id);
    if (error) setJobMessage(error.message);
    else await onRefresh();
  }

  const published = careers.filter((career) => career.status === "Published").length;
  const drafts = careers.length - published;
  const visibleCareers = careers.filter((career) => {
    const matchesStatus = statusFilter === "All statuses" || career.status === statusFilter;
    const text = `${career.title} ${career.department} ${career.location}`.toLowerCase();
    return matchesStatus && text.includes(query.trim().toLowerCase());
  });
  const updateJob = (field: keyof CareerForm, value: string | boolean) => setJobForm((current) => ({ ...current, [field]: value }));
  const updatePage = (field: keyof CareerPageForm, value: string) => setPage((current) => ({ ...current, [field]: value }));

  return (
    <div className="ib-careers-workspace">
      <header className="ib-careers-heading">
        <div><p className="ib-careers-kicker">CONTENT MANAGEMENT</p><h1>Careers</h1><p>Manage the careers page and the roles visitors can apply for.</p></div>
        <Button onClick={openNewJob}><Plus /> Add New Job</Button>
      </header>
      <div className="ib-careers-tabs" role="tablist" aria-label="Careers management">
        <Button variant="ghost" role="tab" aria-selected={section === "page"} className={section === "page" ? "active" : ""} onClick={() => setSection("page")}>Careers Page</Button>
        <Button variant="ghost" role="tab" aria-selected={section === "jobs"} className={section === "jobs" ? "active" : ""} onClick={() => setSection("jobs")}>Job Openings <span>{careers.length}</span></Button>
      </div>
      {section === "page" ? (
        <>
          <div className="ib-careers-page-intro"><div><h2>Careers page editor</h2><p>Page details, culture introduction, publishing, and search preview.</p></div><span className={`ib-careers-publish ${page.status.toLowerCase()}`}>{page.status}</span></div>
          {pageMessage && <div className="ib-careers-message" role="status">{pageMessage}</div>}
          {loadingPage ? <div className="ib-careers-empty">Loading careers page…</div> : (
            <form onSubmit={savePage} className="ib-careers-page-grid">
              <div className="ib-careers-form-column">
                <section className="ib-careers-panel">
                  <div className="ib-careers-panel-heading"><div><h3>Page Content</h3><p>Shown at the top of the public careers page.</p></div><FileText /></div>
                  <label>Page Title<input required value={page.title} onChange={(event) => updatePage("title", event.target.value)} placeholder="Careers" /></label>
                  <label>Hero Subtitle<textarea rows={3} value={page.subtitle} onChange={(event) => updatePage("subtitle", event.target.value)} placeholder="A short introduction for prospective applicants" /></label>
                  <label>Hero Image URL<input value={page.hero_image} onChange={(event) => updatePage("hero_image", event.target.value)} placeholder="https://…" /></label>
                  <label>Culture Content<textarea rows={6} value={page.body_content} onChange={(event) => updatePage("body_content", event.target.value)} placeholder="Share what makes working at IronBridge meaningful." /></label>
                </section>
                <section className="ib-careers-panel">
                  <div className="ib-careers-panel-heading"><div><h3>Publishing</h3><p>Control when this page is visible.</p></div><CheckCircle2 /></div>
                  <div className="ib-careers-two-col"><label>Page Status<select value={page.status} onChange={(event) => updatePage("status", event.target.value)}><option>Published</option><option>Draft</option></select></label><label>Publish Date<input type="date" value={page.publish_date} onChange={(event) => updatePage("publish_date", event.target.value)} /></label></div>
                </section>
              </div>
              <aside className="ib-careers-side-column">
                <section className="ib-careers-panel">
                  <div className="ib-careers-panel-heading"><div><h3>Search Preview</h3><p>Metadata used by search engines.</p></div><Search /></div>
                  <label>SEO Title<input value={page.seo_title} onChange={(event) => updatePage("seo_title", event.target.value)} placeholder={page.title || "Careers at IronBridge"} /></label>
                  <label>Meta Description<textarea rows={4} value={page.seo_description} onChange={(event) => updatePage("seo_description", event.target.value)} placeholder="Describe the careers page in search results." /></label>
                  <label>Keywords<input value={page.keywords} onChange={(event) => updatePage("keywords", event.target.value)} placeholder="careers, industrial, Kenya" /></label>
                  <label>Canonical URL<input value={page.canonical_url} onChange={(event) => updatePage("canonical_url", event.target.value)} placeholder="https://ironbridge.co.ke/careers" /></label>
                </section>
                <section className="ib-careers-preview"><p>PAGE PREVIEW</p><h3>{page.title || "Careers"}</h3><span>{page.subtitle || "Your introduction will appear here."}</span>{page.hero_image && <img src={page.hero_image} alt="Careers page preview" />}</section>
                <Button type="submit" disabled={savingPage} className="ib-careers-save-page"><Save />{savingPage ? "Saving…" : "Save Careers Page"}</Button>
              </aside>
            </form>
          )}
        </>
      ) : (
        <>
          <div className="ib-careers-page-intro"><div><h2>Job openings</h2><p>Roles, application details, and publishing status.</p></div></div>
          <div className="ib-career-stat-grid">
            <CareerStat icon={<BriefcaseBusiness />} label="Total Jobs" value={careers.length} note="All listings" />
            <CareerStat icon={<CheckCircle2 />} label="Published" value={published} note="Public openings" />
            <CareerStat icon={<FileText />} label="Drafts" value={drafts} note="Not listed publicly" />
          </div>
          {jobMessage && <div className="ib-careers-message" role="status">{jobMessage}</div>}
          <section className="ib-careers-panel ib-careers-jobs-panel">
            <div className="ib-careers-jobs-toolbar"><div><h3>Job Listings</h3><p>{careers.length} opportunities</p></div><div className="ib-careers-job-filters"><label className="ib-careers-search"><Search /><input aria-label="Search jobs" placeholder="Search jobs…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><select aria-label="Filter jobs by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Published</option><option>Draft</option></select><Button variant="outline" onClick={openNewJob}><Plus /> Add Job</Button></div></div>
            <div className="ib-careers-table-wrap">{loading ? <div className="ib-careers-empty">Loading job listings…</div> : visibleCareers.length === 0 ? <div className="ib-careers-empty">No matching jobs.</div> : (
              <table className="ib-careers-table"><thead><tr><th>Job Title</th><th>Department</th><th>Location</th><th>Employment</th><th>Publish Date</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{visibleCareers.map((career) => <tr key={career.id}><td><div className="ib-careers-role"><span><BriefcaseBusiness /></span><div><strong>{career.title}{career.featured && <Star aria-label="Featured" />}</strong><small>{career.salary_range || career.summary || "No salary range added"}</small></div></div></td><td>{career.department}</td><td>{career.location}</td><td>{career.employment_type}<small className="ib-careers-secondary">{career.experience}</small></td><td>{career.publish_date ? new Date(career.publish_date).toLocaleDateString() : "—"}</td><td><span className={`ib-careers-publish ${career.status.toLowerCase()}`}>{career.status}</span></td><td><div className="ib-careers-row-actions"><Button variant="ghost" size="icon" aria-label={`Edit ${career.title}`} onClick={() => openEditJob(career)}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${career.title}`} onClick={() => void removeJob(career)}><Trash2 /></Button></div></td></tr>)}</tbody></table>
            )}</div>
          </section>
        </>
      )}
      {dialogOpen && <div className="ib-admin-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialogOpen(false); }}><section className="ib-admin-dialog ib-career-dialog" role="dialog" aria-modal="true" aria-labelledby="career-form-heading"><div className="ib-admin-dialog-header"><div><h2 id="career-form-heading">{editing ? "Edit Job" : "Add New Job"}</h2><p>Job details, applications, and search information.</p></div><Button variant="ghost" size="icon" aria-label="Close job editor" onClick={() => setDialogOpen(false)}><X /></Button></div><form className="ib-admin-form ib-career-form" onSubmit={saveJob}>
        <section className="ib-career-form-section"><h3>Job Details</h3><div className="ib-careers-two-col"><label>Job Title<input required value={jobForm.title ?? ""} onChange={(event) => updateJob("title", event.target.value)} placeholder="e.g. Property Manager" /></label><label>Department<input value={jobForm.department ?? ""} onChange={(event) => updateJob("department", event.target.value)} /></label><label>Employment Type<select value={jobForm.employment_type ?? "Full-time"} onChange={(event) => updateJob("employment_type", event.target.value)}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label><label>Location<input value={jobForm.location ?? ""} onChange={(event) => updateJob("location", event.target.value)} /></label><label>Experience<input value={jobForm.experience ?? ""} onChange={(event) => updateJob("experience", event.target.value)} /></label><label>Salary Range<input value={jobForm.salary_range ?? ""} onChange={(event) => updateJob("salary_range", event.target.value)} placeholder="e.g. KES 120,000–160,000" /></label></div><label>Short Summary<textarea rows={3} value={jobForm.summary ?? ""} onChange={(event) => updateJob("summary", event.target.value)} /></label><label>Full Description<textarea rows={5} value={jobForm.description ?? ""} onChange={(event) => updateJob("description", event.target.value)} /></label><div className="ib-careers-feature-check"><label><input type="checkbox" checked={Boolean(jobForm.featured)} onChange={(event) => updateJob("featured", event.target.checked)} /> Featured job</label><label>Publish Status<select value={jobForm.status ?? "Draft"} onChange={(event) => updateJob("status", event.target.value)}><option>Draft</option><option>Published</option></select></label></div></section>
        <section className="ib-career-form-section"><h3>Requirements &amp; Benefits</h3><div className="ib-careers-two-col"><label>Requirements<textarea rows={5} value={jsonLines(jobForm.requirements)} onChange={(event) => updateJob("requirements", event.target.value)} placeholder="One item per line" /></label><label>Benefits<textarea rows={5} value={jsonLines(jobForm.benefits)} onChange={(event) => updateJob("benefits", event.target.value)} placeholder="One item per line" /></label></div></section>
        <section className="ib-career-form-section"><h3>Application Settings</h3><div className="ib-careers-two-col"><label>Application Method<select value={jobForm.application_type ?? "Email"} onChange={(event) => updateJob("application_type", event.target.value)}><option>Email</option><option>Website</option><option>External Link</option></select></label><label>Application Email<input type="email" value={jobForm.application_email ?? ""} onChange={(event) => updateJob("application_email", event.target.value)} /></label><label>Application URL<input type="url" value={jobForm.application_url ?? ""} onChange={(event) => updateJob("application_url", event.target.value)} placeholder="https://…" /></label><label>Publish Date<input type="date" value={toDateInput(jobForm.publish_date)} onChange={(event) => updateJob("publish_date", event.target.value)} /></label><label>Expiry Date<input type="date" value={toDateInput(jobForm.expiry_date)} onChange={(event) => updateJob("expiry_date", event.target.value)} /></label></div></section>
        <section className="ib-career-form-section"><h3>SEO Settings</h3><div className="ib-careers-two-col"><label>SEO Title<input value={jobForm.seo_title ?? ""} onChange={(event) => updateJob("seo_title", event.target.value)} /></label><label>Meta Description<textarea rows={3} value={jobForm.seo_description ?? ""} onChange={(event) => updateJob("seo_description", event.target.value)} /></label></div></section>
        {jobMessage && <div className="ib-careers-message" role="alert">{jobMessage}</div>}<div className="ib-admin-dialog-actions"><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit" disabled={savingJob}>{savingJob ? "Saving…" : editing ? "Save Changes" : "Add Job"}</Button></div>
      </form></section></div>}
    </div>
  );
}