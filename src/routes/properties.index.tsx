import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Warehouse } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { PropertyMap } from "@/components/site/PropertyMap";
import { properties } from "@/data/properties";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Industrial Properties for Lease in Kenya | IronBridge" },
      {
        name: "description",
        content:
          "Browse all IronBridge industrial properties — warehouses, logistics facilities and industrial land in Maai Mahiu, Naivasha, Nakuru and Athi River, with exact locations on the map.",
      },
      { property: "og:title", content: "Industrial Properties for Lease in Kenya | IronBridge" },
      {
        property: "og:description",
        content: "All available IronBridge warehouses and industrial land, mapped by exact location.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const locations = properties.map((p) => ({ label: p.name, sub: p.location, lat: p.lat, lng: p.lng }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10">
        <p className="eyebrow">All Properties</p>
        <h1 className="mt-4 text-3xl font-extrabold text-navy sm:text-5xl">Industrial Properties Across Kenya</h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Every available IronBridge warehouse, logistics facility and industrial land parcel — select a property below
          to see its exact location on the map.
        </p>

        <div className="mt-10">
          <h2 className="border-l-2 border-primary pl-3 text-xl font-bold text-navy">Exact Property Locations</h2>
          <div className="mt-5">
            <PropertyMap locations={locations} zoom={13} />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <article key={p.slug} className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <img
                src={p.image}
                alt={p.name}
                width={1600}
                height={1067}
                loading="lazy"
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <span className="rounded bg-accent px-2 py-1 text-[0.65rem] font-semibold tracking-wide text-primary">
                  {p.badge}
                </span>
                <h3 className="mt-3 text-base font-bold text-navy">{p.name}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {p.location}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-navy">
                  <span className="flex items-center gap-1.5">
                    <Warehouse className="h-3.5 w-3.5 text-primary" /> {p.size}
                  </span>
                  <span className="font-semibold">{p.price}</span>
                </div>
                <Link
                  to="/properties/$slug"
                  params={{ slug: p.slug }}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-dark sm:w-auto"
                >
                  View Property <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}