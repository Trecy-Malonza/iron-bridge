import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Truck, Warehouse } from "lucide-react";
import { useEffect, useState } from "react";

import { useProperties } from "@/lib/site-data";

const CENTER = "translate-x-[-50%] translate-z-0 scale-100 opacity-100 z-[5] blur-0";
const RIGHT =
  "translate-x-[-32%] -translate-z-20 rotate-y-[-8deg] scale-[0.86] opacity-50 z-[2] blur-[0.8px] pointer-events-none";
const LEFT =
  "translate-x-[-68%] -translate-z-20 rotate-y-[8deg] scale-[0.86] opacity-50 z-[2] blur-[0.8px] pointer-events-none";
const FAR_RIGHT =
  "translate-x-[-18%] -translate-z-40 rotate-y-[-12deg] scale-75 opacity-0 z-[1] blur-[2px] pointer-events-none";
const FAR_LEFT =
  "translate-x-[-82%] -translate-z-40 rotate-y-[12deg] scale-75 opacity-0 z-[1] blur-[2px] pointer-events-none";
const HIDDEN = "translate-x-[-50%] -translate-z-52 scale-[0.7] opacity-0 z-0 pointer-events-none";

function classFor(offset: number, total: number) {
  const norm = ((offset % total) + total) % total;
  const signed = norm > total / 2 ? norm - total : norm;
  if (signed === 0) return CENTER;
  if (signed === 1) return RIGHT;
  if (signed === -1) return LEFT;
  if (signed === 2) return FAR_RIGHT;
  if (signed === -2) return FAR_LEFT;
  return HIDDEN;
}


export function PropertyCarousel() {
  const properties = useProperties();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = properties.length;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % total), 5000);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);

  return (
    <div
      className="flex w-full flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto w-full max-w-[720px] [perspective:1200px]">
        <div className="relative h-[44rem] w-full [transform-style:preserve-3d]">
          {properties.map((p, i) => (
            <article
              key={p.slug}
              className={`absolute left-1/2 top-0 w-full max-w-[560px] overflow-hidden rounded-[20px] bg-card shadow-float transition-all duration-500 ease-out ${classFor(
                i - active,
                total,
              )}`}
            >
              <div className="relative h-[22rem] overflow-hidden bg-navy-deep">
                <img
                  src={p.image}
                  alt={p.name}
                  width={960}
                  height={640}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-navy-deep/80 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-navy-foreground backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" /> {p.badge}
                </span>
              </div>

              <div className="bg-[linear-gradient(180deg,oklch(0.24_0.062_262)_0%,oklch(0.3_0.05_262)_100%)] p-5 text-navy-foreground">
                <div className="flex items-start justify-between gap-2.5">
                  <h3 className="text-[1.05rem] font-bold leading-snug tracking-tight">{p.name}</h3>
                  <p className="flex shrink-0 items-center gap-1 text-xs text-navy-foreground/70">
                    <Warehouse className="h-3.5 w-3.5" /> {p.size}
                  </p>
                </div>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-navy-foreground/70">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> {p.location}
                </p>
                <p className="mt-2.5 text-[0.8rem] leading-relaxed text-navy-foreground/80">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 rounded-md border border-navy-foreground/10 bg-navy-foreground/10 px-2 py-1 text-[0.68rem]"
                    >
                      <Truck className="h-3 w-3 opacity-80" /> {f}
                    </span>
                  ))}
                </div>
                <Link
                  to="/properties/$slug"
                  params={{ slug: p.slug }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-4 py-3 text-[0.84rem] font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                >
                  View Property <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous property"
          onClick={prev}
          className="absolute left-[-6px] top-[42%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-card transition-transform hover:scale-105 hover:bg-surface"
        >
          <ChevronLeft className="h-[18px] w-[18px] text-navy" />
        </button>
        <button
          type="button"
          aria-label="Next property"
          onClick={next}
          className="absolute right-[-6px] top-[42%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-card transition-transform hover:scale-105 hover:bg-surface"
        >
          <ChevronRight className="h-[18px] w-[18px] text-navy" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {properties.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-label={`Show ${p.name}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-2 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
