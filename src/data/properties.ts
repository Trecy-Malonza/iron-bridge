import warehouseGradeA from "@/assets/warehouse-grade-a.jpg";
import warehouseDusk from "@/assets/warehouse-exterior.jpg";
import warehouseInterior from "@/assets/warehouse-interior.jpg";
import heroPark from "@/assets/hero-industrial-park.jpg";

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
};

export const properties: Property[] = [
  {
    slug: "maai-mahiu-logistics-warehouse-1",
    name: "Maai Mahiu Logistics Warehouse 1",
    location: "Maai Mahiu Industrial Area, Nakuru County",
    size: "20,000 SQM",
    price: "KSh 120 / SQM",
    image: warehouseGradeA,
    badge: "AVAILABLE",
    description:
      "Modern warehouse with multiple loading bays, ample yard and easy access to the Nairobi–Nakuru highway.",
    features: ["Multi Loading Bays", "Ample Parking", "24/7 Security"],
  },
  {
    slug: "naivasha-industrial-park-warehouse-a2",
    name: "Naivasha Industrial Park Warehouse A2",
    location: "Naivasha, Nakuru County",
    size: "15,000 SQM",
    price: "KSh 110 / SQM",
    image: warehouseDusk,
    badge: "AVAILABLE",
    description:
      "Grade A facility inside a serviced industrial park with dedicated power supply and heavy truck access.",
    features: ["Dedicated Power", "Truck Access", "Manned Security"],
  },
  {
    slug: "maai-mahiu-warehouse-2",
    name: "Maai Mahiu Warehouse 2",
    location: "Maai Mahiu, Nakuru County",
    size: "10,000 SQM",
    price: "KSh 115 / SQM",
    image: warehouseInterior,
    badge: "AVAILABLE",
    description: "Flexible warehouse space suited to distribution, storage and light manufacturing operations.",
    features: ["Flexible Layout", "High Clear Height", "Loading Bays"],
  },
  {
    slug: "naivasha-sez-warehouse-3",
    name: "Naivasha SEZ Warehouse 3",
    location: "Naivasha, Nakuru County",
    size: "25,000 SQM",
    price: "KSh 125 / SQM",
    image: heroPark,
    badge: "AVAILABLE",
    description: "Large-scale facility within the Naivasha Special Economic Zone with rail and highway connectivity.",
    features: ["SEZ Incentives", "Rail Access", "Large Yard"],
  },
  {
    slug: "elementaita-industrial-units",
    name: "Elementaita Industrial Units",
    location: "Elementaita, Nakuru County",
    size: "5,000 SQM",
    price: "KSh 100 / SQM",
    image: warehouseGradeA,
    badge: "AVAILABLE",
    description: "Compact industrial units ideal for SMEs, workshops and regional distribution hubs.",
    features: ["Modular Units", "Secure Estate", "Ample Parking"],
  },
];