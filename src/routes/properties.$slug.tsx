import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  MoveVertical,
  Truck,
  Warehouse,
} from "lucide-react";
import { useState } from "react";

import warehouseInterior from "@/assets/warehouse-interior.jpg";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { fetchProperties, useProperties } from "@/lib/site-data";

export const Route = createFileRoute("/properties/$slug")({
  loader: async ({ params }) => {
    const properties = await fetchProperties();
    const property = properties.find((p) => p.slug === params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.property.name ?? "Industrial Property";
    return {
      meta: [
        { title: `${name} | IronBridge Industrial Group` },
        { name: "description", content: loaderData?.property.description ?? "Industrial property in Kenya." },
        { property: "og:title", content: `${name} | IronBridge Industrial Group` },
        { property: "og:description", content: loaderData?.property.description ?? "Industrial property in Kenya." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PropertyPage,
  notFoundComponent: () => <div className="p-10 text-center">Property not found. <Link to="/properties" className="text-primary">View all properties</Link></div>,
  errorComponent: ({ error }) => <div role="alert" className="p-10 text-center">{error.message}</div>,
});

const highlights = [
  "Grade A Industrial Warehouse",
  "12 Dock Loading Bays",
  "11.5m Clear Height",
  "ESFR Sprinkler System",
  "24/7 Security with CCTV",
  "Large Maneuvering Yard",
  "Ample Parking Space",
  "Power Capacity: 1,000 KVA",
];

const idealFor = ["Logistics & Distribution", "E-commerce Fulfillment", "Manufacturing", "Wholesale & Storage"];

const advantages = [
  "2 km from Naivasha–Maai Mahiu Highway",
  "8 km from Naivasha SEZ",
  "15 km from Naivasha Town",
  "Easy access for heavy trucks",
];

function PropertyPage() {
  const properties = useProperties();
  const { property } = Route.useLoaderData();
  const gallery = [property.image, warehouseInterior, warehouseInterior, property.image];
  const [index, setIndex] = useState(0);
  const others = properties.filter((p) => p.slug !== property.slug).slice(0, 4);

  const details: [string, string][] = [
    ["Property ID", "IBG-WH-001"],
    ["Property Type", "Warehouse"],
    ["Total Area", property.size],
    ["Available Area", property.size],
    ["Price", property.price],
    ["Availability", "Available"],
    ["Lease Type", "Long Term"],
    ["Zoning", "Industrial"],
    ["Power Supply", "1,000 KVA"],
    ["Water Supply", "Borehole + County"],
    ["Security", "24/7 Manned Security"],
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-[1400px] px-5 py-8 lg:px-10">
        <Link to="/" hash="find-space" className="inline-flex items-center gap-2 text-sm text-navy">
          <ArrowLeft className="h-4 w-4" /> Back to Listings
        </Link>

        <div className="relative mt-5 overflow-hidden rounded-xl">
          <img
            src={gallery[index]}
            alt={`${property.name} photo ${index + 1}`}
            width={1200}
            height={800}
            className="h-[22rem] w-full object-cover sm:h-[30rem]"
          />
          <span className="absolute right-4 top-4 rounded bg-navy-deep/60 px-2 py-1 text-xs text-navy-foreground">
            {index + 1} / {gallery.length}
          </span>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => setIndex((i) => (i - 1 + gallery.length) % gallery.length)}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-navy"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => setIndex((i) => (i + 1) % gallery.length)}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-navy"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-7">
          {gallery.map((g, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`overflow-hidden rounded-md border-2 ${i === index ? "border-primary" : "border-transparent"}`}
            >
              <img src={g} alt="" width={1200} height={800} loading="lazy" className="h-16 w-full object-cover" />
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="rounded bg-accent px-2 py-1 text-xs font-semibold tracking-wide text-primary">
              WAREHOUSE
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">{property.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> {property.location}
            </p>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{property.description}</p>

            <div className="mt-8 grid gap-6 border-b border-border pb-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { Icon: Warehouse, label: "Warehouse Size", value: property.size },
                { Icon: MoveVertical, label: "Clear Height", value: "11.5 Meters" },
                { Icon: Truck, label: "Dock Doors", value: "12" },
                { Icon: Calendar, label: "Year Built", value: "2023" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="h-7 w-7 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-bold text-navy">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                { title: "Property Highlights", items: highlights },
                { title: "Ideal For", items: idealFor },
                { title: "Location Advantages", items: advantages },
              ].map((col) => (
                <div key={col.title}>
                  <h2 className="eyebrow border-l-2 border-primary pl-2">{col.title}</h2>
                  <ul className="mt-4 space-y-2">
                    {col.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="relative mt-10 flex h-56 items-center justify-center rounded-xl border border-border bg-surface">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-border bg-surface p-6 shadow-card">
            <h2 className="eyebrow border-l-2 border-primary pl-2">Property Details</h2>
            <dl className="mt-5 divide-y divide-border text-sm">
              {details.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className={`font-medium ${k === "Availability" ? "text-primary" : "text-navy"}`}>{v}</dd>
                </div>
              ))}
            </dl>

            <Link
              to="/"
              hash="contact"
              className="mt-6 flex items-center justify-center gap-3 rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
            >
              Inquire About This Property <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-3 rounded-md border border-border bg-card py-3.5 text-sm font-semibold text-navy hover:bg-accent"
            >
              Download Brochure <Download className="h-4 w-4" />
            </button>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex items-center justify-between">
            <h2 className="border-l-2 border-primary pl-3 text-xl font-bold text-navy">You May Also Like</h2>
            <Link to="/" hash="find-space" className="flex items-center gap-2 text-sm font-semibold text-primary">
              View All Properties <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/properties/$slug"
                params={{ slug: p.slug }}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-card"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-36 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-bold text-navy">{p.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {p.location}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-navy">
                    <span>{p.size}</span>
                    <span className="font-semibold">{p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}