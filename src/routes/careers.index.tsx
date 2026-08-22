import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  DollarSign,
  Handshake,
  HeartHandshake,
  MapPin,
  Rocket,
  ShieldCheck,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import warehouseDusk from "@/assets/warehouse-exterior.jpg";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers | Build the Future With IronBridge Industrial" },
      {
        name: "description",
        content:
          "Explore open roles at IronBridge Industrial Group across property management, operations, finance, business development and HSE in Kenya.",
      },
      { property: "og:title", content: "Careers | Build the Future With IronBridge Industrial" },
      {
        property: "og:description",
        content: "Join a team shaping the future of logistics, infrastructure and industrial real estate in Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersIndex,
});

const values = [
  {
    Icon: Rocket,
    title: "Purpose Driven",
    body: "Be part of meaningful projects that drive industrial growth and economic impact.",
  },
  {
    Icon: TrendingUp,
    title: "Grow With Us",
    body: "We invest in our people through training, mentorship, and career development.",
  },
  {
    Icon: HeartHandshake,
    title: "Strong Culture",
    body: "A collaborative, respectful, and inclusive environment where every voice matters.",
  },
  {
    Icon: Award,
    title: "Impact & Ownership",
    body: "Take ownership, solve real challenges, and see the impact of your work.",
  },
];

type Job = {
  title: string;
  Icon: typeof Building2;
  dept: string;
  deptValue: string;
  location: string;
  locValue: string;
  desc: string;
  type: string;
  exp: string;
  detail?: boolean;
};

const jobs: Job[] = [
  {
    title: "Property Manager",
    Icon: Building2,
    dept: "Property Management",
    deptValue: "property",
    location: "Maai Mahiu",
    locValue: "maai-mahiu",
    desc: "Oversee daily property operations, tenant relations, and ensure optimal performance of industrial assets.",
    type: "Full-time",
    exp: "3–5 Yrs Exp",
    detail: true,
  },
  {
    title: "Operations Manager",
    Icon: ShieldCheck,
    dept: "Operations",
    deptValue: "operations",
    location: "Maai Mahiu",
    locValue: "maai-mahiu",
    desc: "Lead warehouse and logistics operations to ensure efficiency, safety, and exceptional service delivery.",
    type: "Full-time",
    exp: "5–7 Yrs Exp",
  },
  {
    title: "Finance Analyst",
    Icon: DollarSign,
    dept: "Finance",
    deptValue: "finance",
    location: "Nairobi",
    locValue: "nairobi",
    desc: "Support financial planning, reporting, budgeting, and analysis to drive informed business decisions.",
    type: "Full-time",
    exp: "2–4 Yrs Exp",
  },
  {
    title: "Business Development Officer",
    Icon: TrendingUp,
    dept: "Business Development",
    deptValue: "bd",
    location: "Nairobi",
    locValue: "nairobi",
    desc: "Identify new business opportunities, build client relationships, and drive growth across our industrial parks.",
    type: "Full-time",
    exp: "2–4 Yrs Exp",
  },
  {
    title: "Client Relations Manager",
    Icon: Handshake,
    dept: "Client Relations",
    deptValue: "client",
    location: "Nairobi",
    locValue: "nairobi",
    desc: "Manage client relationships, ensure satisfaction, and drive long-term partnerships.",
    type: "Full-time",
    exp: "3–5 Yrs Exp",
  },
  {
    title: "HSE Officer",
    Icon: Users,
    dept: "Health, Safety & Environment",
    deptValue: "hse",
    location: "Maai Mahiu",
    locValue: "maai-mahiu",
    desc: "Ensure compliance with health, safety, and environmental standards across all operations.",
    type: "Full-time",
    exp: "2–4 Yrs Exp",
  },
];

const departments = [
  { label: "All Departments", value: "all" },
  { label: "Property Management", value: "property" },
  { label: "Operations", value: "operations" },
  { label: "Finance", value: "finance" },
  { label: "Business Development", value: "bd" },
  { label: "Client Relations", value: "client" },
  { label: "HSE", value: "hse" },
];

const locations = [
  { label: "All Locations", value: "all" },
  { label: "Maai Mahiu", value: "maai-mahiu" },
  { label: "Nairobi", value: "nairobi" },
];

function CareersIndex() {
  const [dept, setDept] = useState("all");
  const [loc, setLoc] = useState("all");

  const visible = useMemo(
    () => jobs.filter((j) => (dept === "all" || j.deptValue === dept) && (loc === "all" || j.locValue === loc)),
    [dept, loc],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[480px] items-center overflow-hidden">
        <img
          src={warehouseDusk}
          alt="IronBridge industrial facility at dusk"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-navy-deep/30" />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/60">Careers</p>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-navy-foreground sm:text-[52px]">
            Build the Future
            <br />
            With Us
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-foreground/75 sm:text-base">
            At IronBridge Industrial Group, we're unlocking the potential of industrialization in Kenya. Join a team
            that's shaping the future of logistics, infrastructure, and industrial real estate.
          </p>
          <a
            href="#positions"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:w-auto"
          >
            View Open Positions <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 mx-auto -mt-10 max-w-[1200px] px-5 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-float sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className={`p-7 text-center ${i < values.length - 1 ? "border-b border-border sm:border-b-0 lg:border-r" : ""} ${
                i === 0 ? "sm:border-r" : ""
              } ${i === 1 ? "sm:border-b lg:border-b-0" : ""} ${i === 2 ? "sm:border-r sm:border-b-0" : ""}`}
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <h2 className="mt-4 text-[0.95rem] font-bold text-navy">{title}</h2>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Positions */}
      <section id="positions" className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-14 pt-16 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Open Positions</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Explore Opportunities
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Find the right role and help us build the future of industrial Kenya.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <select
              aria-label="Filter by department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="rounded-lg border border-border bg-card px-3.5 py-2.5 text-[0.85rem] font-medium text-foreground outline-none focus:border-primary"
            >
              {departments.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Filter by location"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="rounded-lg border border-border bg-card px-3.5 py-2.5 text-[0.85rem] font-medium text-foreground outline-none focus:border-primary"
            >
              {locations.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((j) => (
            <article
              key={j.title}
              className="flex flex-col rounded-[14px] border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-muted-foreground/40 hover:shadow-float"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent">
                <j.Icon className="h-5 w-5 text-primary" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy">{j.title}</h3>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[0.78rem] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 opacity-70" /> {j.dept}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 opacity-70" /> {j.location}
                </span>
              </div>
              <p className="mt-3 flex-grow text-[0.84rem] leading-relaxed text-muted-foreground">{j.desc}</p>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-3.5 text-[0.78rem] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {j.type}
                </span>
                <span className="inline-flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" /> {j.exp}
                </span>
              </div>
              {j.detail ? (
                <Link
                  to="/careers/property-manager"
                  className="group mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-primary"
                >
                  View Details
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <a
                  href="#send-cv"
                  className="group mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-primary"
                >
                  Apply Now
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No roles match those filters right now — send us your CV below.
          </p>
        )}

        <div className="mt-9 text-center">
          <button
            type="button"
            onClick={() => {
              setDept("all");
              setLoc("all");
            }}
            className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-border bg-card px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-muted-foreground hover:bg-surface"
          >
            View All Open Positions
          </button>
        </div>
      </section>

      {/* CTA */}
      <section id="send-cv" className="mx-auto mb-16 max-w-[1200px] scroll-mt-24 px-5 lg:px-8">
        <div className="flex flex-col gap-6 rounded-2xl bg-[#f0f5ff] p-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div className="flex items-start gap-4.5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15">
              <Timer className="h-5 w-5 text-primary" />
            </span>
            <div>
              <h2 className="text-[1.05rem] font-bold text-navy">Don't See the Right Role?</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                We're always looking for great talent. Send us your CV and tell us how you can contribute to IronBridge
                Industrial Group.
              </p>
            </div>
          </div>
          <Link
            to="/careers/property-manager"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark sm:w-auto"
          >
            Send Your CV <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
