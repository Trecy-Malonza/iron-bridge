import warehouseIllustration from "@/assets/warehouse-illustration.svg";
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


export const properties: Property[] = [
  { slug: "grade-a-warehouse", name: "Grade A Warehouse", location: "Maai Mahiu Industrial Area", size: "12,000 sqm", price: "", image: warehouseIllustration, badge: "AVAILABLE", description: "Modern warehouse with multiple loading bays, ample yard and easy access to the Nairobi–Nakuru highway.", features: ["Multi Loading Bays", "Ample Parking", "24/7 Security"], lat: -0.9333, lng: 36.5833 },
  { slug: "cold-storage-facility", name: "Cold Storage Facility", location: "Athi River, Machakos", size: "8,500 sqm", price: "", image: warehouseIllustration, badge: "AVAILABLE", description: "Temperature-controlled warehouse ideal for perishable goods, with dock-level loading and backup power.", features: ["Cold Chain", "Dock Level", "Backup Power"], lat: -1.4565, lng: 36.9785 },
  { slug: "industrial-godown", name: "Industrial Godown", location: "Industrial Area, Nairobi", size: "5,200 sqm", price: "", image: warehouseIllustration, badge: "AVAILABLE", description: "Well-maintained godown with high eaves, concrete floor and excellent road connectivity to CBD.", features: ["High Eaves", "Concrete Floor", "City Access"], lat: -1.2833, lng: 36.8333 },
  { slug: "logistics-hub", name: "Logistics Hub", location: "Mombasa Road Corridor", size: "18,000 sqm", price: "", image: warehouseIllustration, badge: "AVAILABLE", description: "Large-scale logistics centre with cross-docking capability, container yard and 24-hour operations.", features: ["Cross Dock", "Container Yard", "24hr Ops"], lat: -1.35, lng: 36.9 },
  { slug: "light-industrial-unit", name: "Light Industrial Unit", location: "Ruiru, Kiambu", size: "3,800 sqm", price: "", image: warehouseIllustration, badge: "AVAILABLE", description: "Flexible unit suitable for light manufacturing or assembly, with office block and ample parking.", features: ["Office Block", "Flexible Use", "Parking"], lat: -1.15, lng: 36.96 },
];
