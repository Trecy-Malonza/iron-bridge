// Public website content read from the admin dashboard tables (public RLS reads).
import { queryOptions, useQuery } from "@tanstack/react-query";

import warehouseIllustration from "@/assets/warehouse-illustration.svg";
import { properties as staticProperties, type Property } from "@/data/properties";
import { supabase } from "@/integrations/supabase/client";

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function fetchProperties(): Promise<Property[]> {
  const [{ data: rows, error }, { data: locs }] = await Promise.all([
    supabase.from("admin_properties").select("*").order("created_at", { ascending: true }),
    supabase.from("admin_locations").select("name, lat, lng"),
  ]);
  if (error || !rows) return staticProperties;
  return rows
    .filter((r) => r.status.toLowerCase() !== "hidden")
    .map((r) => {
      const base = staticProperties.find((p) => p.name.toLowerCase() === r.name.toLowerCase());
      const loc = locs?.find(
        (l) => r.location.toLowerCase().includes(l.name.toLowerCase()) || l.name.toLowerCase().includes(r.location.toLowerCase()),
      );
      return {
        slug: base?.slug ?? slugify(r.name),
        name: r.name,
        location: r.location,
        size: r.size,
        price: r.price,
        image: base?.image ?? warehouseIllustration,
        badge: r.status.toUpperCase(),
        description: r.description || base?.description || "",
        features: base?.features ?? [],
        lat: loc ? Number(loc.lat) : base?.lat ?? -1.2921,
        lng: loc ? Number(loc.lng) : base?.lng ?? 36.8219,
      };
    });
}

export const propertiesQuery = queryOptions({ queryKey: ["site", "properties"], queryFn: fetchProperties });
export function useProperties() {
  return useQuery({ ...propertiesQuery, placeholderData: staticProperties }).data ?? staticProperties;
}

export type CareerRow = {
  id: string; title: string; department: string; location: string;
  employment_type: string; experience: string; summary: string; description: string;
};
export function useCareers() {
  return useQuery({
    queryKey: ["site", "careers"],
    queryFn: async (): Promise<CareerRow[]> => {
      const { data } = await supabase.from("careers").select("*").eq("status", "Published").order("created_at", { ascending: true });
      return data ?? [];
    },
  });
}

export type BlogRow = { id: string; title: string; category: string; author: string; excerpt: string; created_at: string };
export function useBlogPosts() {
  return useQuery({
    queryKey: ["site", "blog"],
    queryFn: async (): Promise<BlogRow[]> => {
      const { data } = await supabase.from("admin_blog_posts").select("*").eq("status", "Published").order("created_at", { ascending: false });
      return data ?? [];
    },
  });
}

const defaultSettings = {
  company_name: "IronBridge Industrial Group",
  email: "info@ironbridge.co.ke",
  phone: "+254 700 000 000",
  address: "IronBridge Business Park, Maai Mahiu, Nakuru County, Kenya.",
};
export function useSiteSettings() {
  const q = useQuery({
    queryKey: ["site", "settings"],
    queryFn: async () => {
      const { data } = await supabase.from("admin_settings").select("company_name, email, phone, address").limit(1).maybeSingle();
      return data ?? defaultSettings;
    },
  });
  return q.data ?? defaultSettings;
}
