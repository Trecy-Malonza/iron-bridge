import { MapPin } from "lucide-react";
import { useState } from "react";

export type MapLocation = {
  label: string;
  lat: number;
  lng: number;
  sub?: string;
};

function embedSrc(loc: MapLocation, zoom: number) {
  return `https://maps.google.com/maps?q=${loc.lat},${loc.lng}&z=${zoom}&hl=en&output=embed`;
}

/** Responsive Google Maps view with selectable locations. */
export function PropertyMap({
  locations,
  zoom = 12,
  className = "",
  showSelector = true,
}: {
  locations: MapLocation[];
  zoom?: number;
  className?: string;
  showSelector?: boolean;
}) {
  const [active, setActive] = useState(0);
  const current = locations[active] ?? locations[0];
  if (!current) return null;

  return (
    <div className={`w-full ${className}`}>
      {showSelector && locations.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {locations.map((l, i) => (
            <button
              key={`${l.label}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                i === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-navy hover:bg-accent"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" /> {l.label}
            </button>
          ))}
        </div>
      )}

      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-surface">
        <div className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
          <iframe
            key={`${current.lat},${current.lng}`}
            title={`Map of ${current.label}`}
            src={embedSrc(current, zoom)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>

      <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        <span className="font-medium text-navy">{current.label}</span>
        {current.sub && <span>— {current.sub}</span>}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${current.lat},${current.lng}`}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary"
        >
          Open in Google Maps
        </a>
      </p>
    </div>
  );
}