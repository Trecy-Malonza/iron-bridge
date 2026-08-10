import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Lock,
  MapPin,
  Timer,
  TrendingUp,
  Upload,
} from "lucide-react";

import warehouseDusk from "@/assets/warehouse-exterior.jpg";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Property Manager Vacancy | IronBridge Careers" },
      {
        name: "description",
        content:
          "Join IronBridge Industrial Group as a Property Manager in Maai Mahiu. Oversee industrial property operations, tenant relations and asset performance.",
      },
      { property: "og:title", content: "Property Manager Vacancy | IronBridge Careers" },
      {
        property: "og:description",
        content: "Full-time Property Manager role in Maai Mahiu, Nakuru County. Apply online with IronBridge.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const responsibilities = [
  "Oversee daily operations of industrial properties and ensure smooth functioning.",
  "Manage tenant relationships, lease agreements, renewals, and rent collection.",
  "Conduct property inspections and ensure compliance with lease terms.",
  "Coordinate maintenance, repairs, and facility upgrades.",
  "Prepare reports on property performance, occupancy, and financials.",
  "Ensure compliance with legal, safety, and company standards.",
  "Work closely with internal teams to support business objectives.",
];

const requirements = [
  "Bachelor's degree in Real Estate, Business Administration, or a related field.",
  "3–5 years of experience in property or facility management (industrial preferred).",
  "Strong knowledge of lease agreements and property management practices.",
  "Excellent communication, negotiation, and organizational skills.",
  "Proficiency in MS Office and property management software.",
  "Valid driver's license and willingness to travel within site locations.",
];

const offers = [
  { Icon: Briefcase, label: "Competitive Salary" },
  { Icon: HeartPulse, label: "Health Coverage" },
  { Icon: TrendingUp, label: "Career Growth Opportunities" },
  { Icon: GraduationCap, label: "Training & Development" },
  { Icon: Calendar, label: "Paid Time Off" },
];

const facts = [
  { Icon: Briefcase, label: "Job Type", value: "Full-time" },
  { Icon: MapPin, label: "Location", value: "Maai Mahiu" },
  { Icon: TrendingUp, label: "Experience", value: "3–5 Yrs Exp" },
  { Icon: Calendar, label: "Posted On", value: "May 24, 2025" },
];

function CareersPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <section className="relative overflow-hidden">
        <img
          src={warehouseDusk}
          alt="IronBridge industrial facility at dusk"
          width={1200}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/70 to-navy-deep/20" />
        <div className="relative mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
          <p className="flex flex-wrap items-center gap-2 text-xs text-navy-foreground/70">
            Careers <ChevronRight className="h-3 w-3" /> Open Positions <ChevronRight className="h-3 w-3" />
            <span className="text-navy-foreground">Property Manager</span>
          </p>
          <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-navy-foreground/80">
            FULL-TIME • MAAI MAHIU
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-navy-foreground sm:text-5xl">Property Manager</h1>
          <p className="mt-4 max-w-xl text-sm text-navy-foreground/85">
            Oversee daily property operations, tenant relations, and ensure optimal performance of industrial assets.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-[1400px] px-5 pb-16 lg:px-10">
        <div className="rounded-2xl bg-card p-6 shadow-card lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="grid gap-6 border-b border-border pb-8 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-bold text-navy">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="mt-8 text-xl font-bold text-navy">About the Role</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We are looking for a detail-oriented and proactive Property Manager to join our team in Maai Mahiu. The
                ideal candidate will be responsible for the effective management of our industrial properties, ensuring
                high occupancy, tenant satisfaction, and asset performance.
              </p>

              <h2 className="mt-8 border-t border-border pt-8 text-xl font-bold text-navy">Key Responsibilities</h2>
              <ul className="mt-4 space-y-2.5">
                {responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {r}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 border-t border-border pt-8 text-xl font-bold text-navy">Requirements</h2>
              <ul className="mt-4 space-y-2.5">
                {requirements.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {r}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 border-t border-border pt-8 text-xl font-bold text-navy">What We Offer</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
                {offers.map(({ Icon, label }) => (
                  <div key={label} className="flex items-start gap-2">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm text-navy">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-xl font-bold text-navy">Apply for This Role</h2>
              <p className="mt-2 text-xs text-muted-foreground">
                Fill in your details below to apply. All fields marked with <span className="text-destructive">*</span>{" "}
                are required.
              </p>

              <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: "Full Name", placeholder: "Enter your full name", required: true, type: "text" },
                  { label: "Email Address", placeholder: "Enter your email address", required: true, type: "email" },
                  { label: "Phone Number", placeholder: "Enter your phone number", required: true, type: "tel" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-medium text-navy">
                      {f.label} {f.required && <span className="text-destructive">*</span>}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                ))}

                {[
                  { label: "Current Location", options: ["Nakuru", "Naivasha", "Nairobi", "Mombasa"] },
                  { label: "Years of Experience", options: ["0–2 years", "3–5 years", "6+ years"] },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-medium text-navy">
                      {f.label} <span className="text-destructive">*</span>
                    </label>
                    <select
                      defaultValue=""
                      className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary"
                    >
                      <option value="" disabled>
                        Select your {f.label.toLowerCase()}
                      </option>
                      {f.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}

                <div>
                  <label className="text-xs font-medium text-navy">Current Position</label>
                  <input
                    placeholder="Enter your current position"
                    className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-navy">
                    Upload CV <span className="text-destructive">*</span>
                  </label>
                  <div className="mt-1.5 rounded-md border border-dashed border-input bg-surface px-4 py-6 text-center">
                    <Upload className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-2 text-sm text-navy">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max. 5MB)</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-navy">Cover Letter (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us why you're a great fit for this role..."
                    className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
                >
                  Submit Application <ArrowRight className="h-4 w-4" />
                </button>

                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Your information is secure and will only be used for
                  this application.
                </p>
              </form>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start gap-6 rounded-xl bg-accent p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <Timer className="h-10 w-10 shrink-0 text-primary" />
              <div>
                <h2 className="text-lg font-bold text-navy">Don't See the Right Role?</h2>
                <p className="mt-1 max-w-lg text-sm text-muted-foreground">
                  We're always looking for great talent. Send us your CV and tell us how you can contribute to
                  IronBridge Industrial Group.
                </p>
              </div>
            </div>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-3 rounded-md border border-primary px-6 py-3.5 text-sm font-semibold text-primary hover:bg-card"
            >
              Send Your CV <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}