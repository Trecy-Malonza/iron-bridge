import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Construction as ConstructionIcon,
  ChevronLeft,
  ChevronRight,
  Factory,
  HardHat,
  Handshake,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Search,
  ShieldCheck,
  TrendingUp,
  Truck,
  User,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";


import businessPark from "@/assets/business-park.jpg";
import handshake from "@/assets/handshake.jpg";
import heroPark from "@/assets/hero-industrial-park.jpg";
import teamBrian from "@/assets/team-brian.png";
import teamCollins from "@/assets/team-collins.png";
import teamGrace from "@/assets/team-grace.png";
import warehouseDusk from "@/assets/warehouse-exterior.jpg";
import { ChatAssistant } from "@/components/site/ChatAssistant";
import { CenteredEyebrow, Eyebrow } from "@/components/site/Section";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { PropertyCarousel } from "@/components/site/PropertyCarousel";
import { PropertyMap } from "@/components/site/PropertyMap";
import { properties } from "@/data/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IronBridge Industrial Group | Industrial Space in Kenya" },
      {
        name: "description",
        content:
          "Premium industrial land, warehouses and logistics facilities in Kenya's fastest growing industrial corridors. Built for today. Designed for tomorrow.",
      },
      { property: "og:title", content: "IronBridge Industrial Group | Industrial Space in Kenya" },
      {
        property: "og:description",
        content:
          "Industrial land sales, warehouse leasing, property management and build-to-suit development across Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    Icon: MapPin,
    title: "Industrial Land Sales",
    body: "Strategically located industrial land for manufacturing, logistics and industrial developments.",
  },
  {
    Icon: Warehouse,
    title: "Warehouse Leasing",
    body: "Flexible warehouse solutions designed for logistics, manufacturing and distribution.",
  },
  {
    Icon: Building2,
    title: "Industrial Property Management",
    body: "Professional management that maximizes asset performance and long-term value.",
  },
  {
    Icon: TrendingUp,
    title: "Investment Advisory",
    body: "Expert advisory to help investors identify, evaluate and invest in high-potential industrial assets.",
  },
  {
    Icon: Search,
    title: "Site Selection & Due Diligence",
    body: "Data-driven site selection and thorough due diligence to de-risk your investment.",
  },
  {
    Icon: ConstructionIcon,
    title: "Build-to-Suit Development",
    body: "Tailored industrial facilities developed to meet your operational requirements.",
  },
];

const pillars = [
  { Icon: ShieldCheck, title: "Trusted Expertise", body: "Industry specialists with proven track record." },
  { Icon: MapPin, title: "Strategic Locations", body: "Properties in Kenya's fastest growing industrial corridors." },
  { Icon: Handshake, title: "Client-Focused", body: "Solutions tailored to your business goals." },
  { Icon: TrendingUp, title: "Long-Term Value", body: "Building sustainable value for every stakeholder." },
];

const team = [
  { name: "Grace W. Kariuki", role: "Head of Client Relations", image: teamGrace, scale: "h-72" },
  { name: "Collins K. Kimani", role: "Founder & Chief Executive Officer", image: teamCollins, scale: "h-96" },
  { name: "Brian O.", role: "Chief Operating Officer", image: teamBrian, scale: "h-72" },
];

function Index() {

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img
          src={heroPark}
          alt="Aerial view of an industrial logistics park at sunset"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/55 to-navy-deep/5" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 pt-32 lg:px-10">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-6xl lg:text-7xl">
            The Future
            <br />
            Has an Address
          </h1>
          <span className="mt-6 block h-1 w-24 bg-primary" />
          <p className="mt-6 max-w-xl text-base text-navy-foreground/85 sm:text-lg">
            Premium industrial spaces in strategic locations.
            <br />
            Built for today. Designed for tomorrow.
          </p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              to="/properties"
              className="inline-flex w-full items-center justify-center gap-3 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark sm:w-auto sm:px-7 sm:py-4"
            >
              Find Industrial Space <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              hash="find-space"
              className="inline-flex w-full items-center justify-center gap-3 border border-navy-foreground/50 px-6 py-3.5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10 sm:w-auto sm:px-7 sm:py-4"
            >
              Partner With Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section id="who-we-are" className="scroll-mt-24 bg-[image:var(--gradient-surface)] py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
          <div>
            <Eyebrow>Who We Are</Eyebrow>
            <span className="mt-3 block h-0.5 w-14 bg-primary" />
            <h2 className="mt-6 text-3xl font-extrabold text-navy sm:text-5xl">
              Your Industrial
              <br />
              Real Estate Partner
            </h2>
            <span className="mt-6 block h-0.5 w-14 bg-primary/50" />
            <div className="mt-7 space-y-5 text-sm leading-relaxed text-foreground/75 sm:text-base">
              <p>
                Industrial growth begins with the right location, the right partnerships, and the right expertise. At
                IronBridge Industrial Group, we connect businesses with strategically positioned industrial land,
                warehouses, logistics facilities, and development opportunities designed to support long-term success.
              </p>
              <p>
                Whether you're expanding manufacturing operations, establishing a distribution hub, or investing in
                Kenya's growing industrial sector, our focus is to simplify the journey from opportunity to ownership. We
                combine local market knowledge with a professional, client-first approach to deliver industrial real
                estate solutions that create lasting value.
              </p>
              <p className="font-semibold text-navy">
                We don't simply market properties—we help businesses secure the foundations for their next stage of
                growth.
              </p>
            </div>
            <Link
              to="/"
              hash="find-space"
              className="mt-9 inline-flex w-full items-center justify-center gap-3 bg-[image:var(--gradient-primary)] px-6 py-3.5 text-xs font-bold tracking-[0.15em] text-primary-foreground shadow-card sm:w-auto sm:px-7 sm:py-4"
            >
              PARTNER WITH US <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <img
              src={warehouseDusk}
              alt="Modern warehouse with loading docks and glass office block"
              width={1200}
              height={912}
              loading="lazy"
              className="w-full rounded-lg object-cover shadow-card"
            />
            <img
              src={handshake}
              alt="Business partners shaking hands inside a warehouse"
              width={1200}
              height={800}
              loading="lazy"
              className="mx-auto -mt-16 w-[85%] rounded-lg border-[6px] border-card object-cover shadow-float lg:absolute lg:-bottom-14 lg:right-0 lg:mt-0 lg:w-[70%]"
            />
          </div>
        </div>
      </section>

      {/* Find industrial space */}
      <section id="find-space" className="scroll-mt-24 bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <CenteredEyebrow>Find Your Next Industrial Space</CenteredEyebrow>
          <h2 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Find Your Next Industrial Space
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Tell us what you're looking for, and our team will match you with industrial properties that fit your operational and investment goals.
          </p>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="flex flex-col items-center">
              <PropertyCarousel />
              <div className="mt-2 flex w-full max-w-[480px] flex-wrap justify-center gap-3">
                <Link to="/properties" className="flex min-w-[140px] flex-1 items-center gap-2.5 rounded-xl border border-border bg-card p-3 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40">
                  <span className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] bg-primary/10 text-primary"><Building2 className="h-4.5 w-4.5" /></span>
                  <span><strong className="block text-sm font-bold leading-tight text-navy">{properties.length}+</strong><span className="text-[0.72rem] text-muted-foreground">Properties Listed</span></span>
                </Link>
                <a href="#team" className="flex min-w-[140px] flex-1 items-center gap-2.5 rounded-xl border border-border bg-card p-3 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40">
                  <span className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] bg-primary/10 text-primary"><HardHat className="h-4.5 w-4.5" /></span>
                  <span><strong className="block text-sm font-bold leading-tight text-navy">Industrial</strong><span className="text-[0.72rem] text-muted-foreground">Specialists</span></span>
                </a>
                <Link to="/properties" className="flex min-w-[140px] flex-1 items-center gap-2.5 rounded-xl border border-border bg-card p-3 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40">
                  <span className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] bg-primary/10 text-primary"><MapPin className="h-4.5 w-4.5" /></span>
                  <span><strong className="block text-sm font-bold leading-tight text-navy">Nationwide</strong><span className="text-[0.72rem] text-muted-foreground">Coverage</span></span>
                </Link>
              </div>
            </div>

            <div className="rounded-[20px] border border-border/80 bg-card p-6 shadow-float sm:p-7">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Search className="h-5 w-5" /></span>
                <div>
                  <h3 className="text-lg font-bold text-navy">Tell Us What You're Looking For</h3>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">Can't find the right property? Our team will help you source one.</p>
                </div>
              </div>

              <form className="mt-6 grid gap-x-3.5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
                <Field label="Full Name" required placeholder="Your full name" Icon={User} />
                <Field label="Company / Organization" placeholder="Company name" Icon={Building2} />
                <Field label="Email Address" required type="email" placeholder="you@example.com" Icon={Mail} />
                <Field label="Phone Number" required type="tel" placeholder="+254 7XX XXX XXX" Icon={Phone} />
                <SelectField label="Property Type" required options={["Warehouse", "Factory", "Godown", "Industrial Park", "Yard / Open Land"]} />
                <SelectField label="Preferred Location" options={["Maai Mahiu", "Nairobi", "Athi River", "Mombasa", "Nakuru", "Other"]} />
                <Field label="Space Requirement" placeholder="e.g. 10,000 sqm / 5 acres" Icon={Maximize} />
                <Field label="Budget (KES)" placeholder="e.g. 500,000,000" Icon={Wallet} />
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[0.82rem] font-semibold text-navy">Description / Requirements</label>
                  <textarea rows={4} placeholder="Tell us about your business and the type of industrial property you're looking for..." className="w-full rounded-lg border border-input bg-surface px-3.5 py-3 text-[0.85rem] outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <p className="text-[0.82rem] font-semibold text-navy">Preferred Contact Method</p>
                  <div className="flex flex-wrap gap-2.5">
                    {[{ label: "Phone", Icon: Phone }, { label: "Email", Icon: Mail }].map(({ label, Icon }, i) => (
                      <label key={label} className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-input bg-surface px-4 py-2.5 text-[0.85rem] transition hover:border-primary">
                        <input type="radio" name="contact-method" defaultChecked={i === 0} className="accent-primary" />
                        <Icon className="h-4 w-4 text-muted-foreground" /> {label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2"><ChatAssistant /></div>
                <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-[10px] bg-primary py-3.5 text-[0.9rem] font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 hover:bg-primary-dark">
                  Find My Property <ArrowRight className="h-4 w-4" />
                </button>
                <p className="sm:col-span-2 flex items-center justify-center gap-2 text-[0.75rem] text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> Your information is safe with us. We respond within 24 hours.
                </p>
              </form>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2.5 text-[0.82rem] text-muted-foreground">
            <Building2 className="h-6 w-6 shrink-0 text-muted-foreground/50" />
            <span className="flex flex-wrap items-center justify-center gap-2">
              Strategic Locations
              <span className="h-1 w-1 rounded-full bg-border" />
              Premium Properties
              <span className="h-1 w-1 rounded-full bg-border" />
              Lasting Partnerships.
            </span>
          </div>

        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
        <img
          src={businessPark}
          alt="IronBridge Business Park glass office building"
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy/45 to-background" />
        <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
          <Eyebrow tone="light">Our Services</Eyebrow>
          <span className="mt-3 block h-0.5 w-24 bg-primary" />
          <h2 className="mt-6 max-w-2xl text-3xl font-extrabold text-navy-foreground sm:text-5xl">
            End-to-End Industrial
            <br />
            Real Estate Solutions
          </h2>
          <p className="mt-5 max-w-lg text-sm text-navy-foreground/85 sm:text-base">
            From acquiring the right land to managing your property, we provide integrated solutions that support your
            operations and long-term growth.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ Icon, title, body }) => (
              <article
                key={title}
                className="rounded-xl border border-card/40 bg-card/90 p-6 shadow-card backdrop-blur transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
                <span className="mt-5 ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-6 rounded-xl bg-card/90 p-6 shadow-card backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-navy">{title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-24 bg-card py-20 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-5 lg:px-6">
          <CenteredEyebrow>Partner With Us</CenteredEyebrow>
          <h2 className="mt-5 text-center text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">
            Built on Expertise.
            <br />
            Driven by Partnership.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Our team combines deep market knowledge, industry experience and a shared commitment to unlocking the
            potential of industrialization in Kenya.
          </p>

          <p className="mt-14 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-primary">Our Leadership Team</p>
          <div className="relative mx-auto mt-8 grid max-w-[880px] items-start gap-10 sm:grid-cols-[1fr_1.15fr_1fr] sm:gap-0">
            {team.map((m, i) => (
              <div
                key={m.name}
                className={i === 1
                  ? "relative z-10 order-first flex flex-col items-center text-center sm:order-2"
                  : i === 0
                    ? "relative z-[1] flex flex-col items-center text-center sm:order-1 sm:translate-x-7"
                    : "relative z-[1] flex flex-col items-center text-center sm:order-3 sm:-translate-x-7"}
              >
                <div className={i === 1 ? "mb-4 w-full max-w-[340px]" : "mb-3.5 w-full max-w-[220px]"}>
                  <img
                    src={m.image}
                    alt={m.name + ", " + m.role}
                    width={768}
                    height={1024}
                    loading="lazy"
                    className={"mx-auto w-auto object-contain drop-shadow-[0_12px_24px_rgba(15,23,42,0.18)] transition-transform duration-300 hover:scale-[1.04] " + m.scale}
                  />
                </div>
                <h3 className={i === 1 ? "relative z-20 text-[1.05rem] font-bold tracking-tight text-navy" : "relative z-20 text-base font-bold tracking-tight text-navy"}>{m.name}</h3>
                <p className="relative z-20 mb-2.5 text-sm font-medium text-primary">{m.role}</p>
                <a href="#contact" aria-label={"Connect with " + m.name + " on LinkedIn"} className="relative z-20 inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#0A66C2] text-[0.65rem] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#004182]">in</a>
              </div>
            ))}
          </div>

{/* Map */}
          <div className="mt-20 grid gap-10 rounded-2xl border border-border bg-card p-6 shadow-card lg:grid-cols-[1fr_1.4fr] lg:p-10">
            <div>
              <Eyebrow>Strategic Locations</Eyebrow>
              <h3 className="mt-5 text-2xl font-bold text-navy sm:text-3xl">
                Industrial Opportunities
                <br />
                Across Kenya
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Explore our industrial properties in key economic corridors and discover the right location for your
                business.
              </p>
              <Link
                to="/properties"
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-md border border-border px-5 py-3.5 text-sm font-semibold text-navy hover:bg-accent sm:w-auto sm:px-6"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" /> View All Properties on Map
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
            <PropertyMap
              locations={properties.map((p) => ({ label: p.name, sub: p.location, lat: p.lat, lng: p.lng }))}
              zoom={12}
            />
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-start gap-6 rounded-2xl bg-accent p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              <Building2 className="h-12 w-12 shrink-0 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-navy">Let's Build the Future Together</h3>
                <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                  Partner with IronBridge for smart industrial solutions that drive growth and lasting impact.
                </p>
              </div>
            </div>
            <Link
              to="/"
              hash="find-space"
              className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark sm:w-auto sm:px-7 sm:py-4"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required,
  Icon,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  Icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.82rem] font-semibold text-navy">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-input bg-surface py-2.5 pr-3.5 text-[0.85rem] outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 ${
            Icon ? "pl-9.5" : "pl-3.5"
          }`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, options, required }: { label: string; options: string[]; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.82rem] font-semibold text-navy">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select
        defaultValue=""
        className="w-full rounded-lg border border-input bg-surface px-3.5 py-2.5 text-[0.85rem] text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

