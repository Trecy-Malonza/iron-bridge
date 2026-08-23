import warehouseGradeA from "@/assets/warehouse-grade-a.jpg";
import warehouseDusk from "@/assets/warehouse-exterior.jpg";
import warehouseInterior from "@/assets/warehouse-interior.jpg";
import heroPark from "@/assets/hero-industrial-park.jpg";
import warehouseYard from "@/assets/warehouse-yard.jpg";
import industrialLand from "@/assets/industrial-land.jpg";

export type Property = {
  slug: string;
  name: string;
  location: string;
  size: string;
  price: string;
  image: string;
  badge: string;
  description: string;
  features: string[];
  lat: number;
  lng: number;
};

const warehouseIllustration = (sky: string, building: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${sky}"/><stop offset="100%" stop-color="#f0f9ff"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${building}"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs><rect width="800" height="450" fill="url(#s)"/><g fill="#fff" opacity=".6"><ellipse cx="120" cy="70" rx="80" ry="30"/><ellipse cx="650" cy="55" rx="90" ry="28"/></g><rect y="340" width="800" height="110" fill="#64748b"/><rect y="340" width="800" height="18" fill="#475569"/><rect x="80" y="140" width="640" height="220" rx="4" fill="url(#b)"/><rect x="70" y="130" width="660" height="16" rx="2" fill="#334155"/><g stroke="#475569" stroke-width="2" opacity=".5">${[160,240,320,400,480,560,640].map(x=>`<line x1="${x}" y1="146" x2="${x}" y2="360"/>`).join("")}</g><g fill="#0f172a">${[130,220,310,480,570].map(x=>`<rect x="${x}" y="250" width="70" height="110" rx="2"/>`).join("")}</g><g fill="#38bdf8" opacity=".5">${[145,235,325,495,585].map(x=>`<rect x="${x}" y="170" width="40" height="26" rx="2"/>`).join("")}</g><g transform="translate(380 308)"><rect width="90" height="35" y="20" rx="3" fill="#1e40af"/><rect x="90" width="40" height="50" y="5" rx="3" fill="#1e3a8a"/><circle cx="25" cy="58" r="11" fill="#1e293b"/><circle cx="70" cy="58" r="11" fill="#1e293b"/><circle cx="115" cy="58" r="11" fill="#1e293b"/></g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const properties: Property[] = [
  { slug: "grade-a-warehouse", name: "Grade A Warehouse", location: "Maai Mahiu Industrial Area", size: "12,000 sqm", price: "", image: warehouseIllustration("#87ceeb", "#1e293b"), badge: "AVAILABLE", description: "Modern warehouse with multiple loading bays, ample yard and easy access to the Nairobi–Nakuru highway.", features: ["Multi Loading Bays", "Ample Parking", "24/7 Security"], lat: -0.9333, lng: 36.5833 },
  { slug: "cold-storage-facility", name: "Cold Storage Facility", location: "Athi River, Machakos", size: "8,500 sqm", price: "", image: warehouseIllustration("#7dd3fc", "#1e3a5f"), badge: "AVAILABLE", description: "Temperature-controlled warehouse ideal for perishable goods, with dock-level loading and backup power.", features: ["Cold Chain", "Dock Level", "Backup Power"], lat: -1.4565, lng: 36.9785 },
  { slug: "industrial-godown", name: "Industrial Godown", location: "Industrial Area, Nairobi", size: "5,200 sqm", price: "", image: warehouseIllustration("#93c5fd", "#334155"), badge: "AVAILABLE", description: "Well-maintained godown with high eaves, concrete floor and excellent road connectivity to CBD.", features: ["High Eaves", "Concrete Floor", "City Access"], lat: -1.2833, lng: 36.8333 },
  { slug: "logistics-hub", name: "Logistics Hub", location: "Mombasa Road Corridor", size: "18,000 sqm", price: "", image: warehouseIllustration("#67e8f9", "#0f172a"), badge: "AVAILABLE", description: "Large-scale logistics centre with cross-docking capability, container yard and 24-hour operations.", features: ["Cross Dock", "Container Yard", "24hr Ops"], lat: -1.35, lng: 36.9 },
  { slug: "light-industrial-unit", name: "Light Industrial Unit", location: "Ruiru, Kiambu", size: "3,800 sqm", price: "", image: warehouseIllustration("#a5b4fc", "#1e3a8a"), badge: "AVAILABLE", description: "Flexible unit suitable for light manufacturing or assembly, with office block and ample parking.", features: ["Office Block", "Flexible Use", "Parking"], lat: -1.15, lng: 36.96 },
];
