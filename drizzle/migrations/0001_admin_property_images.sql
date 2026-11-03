CREATE TABLE public.admin_property_images (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  mime_type text not null default 'image/jpeg',
  data bytea not null,
  byte_size integer not null default 0,
  created_at timestamptz not null default now()
);

GRANT SELECT ON public.admin_property_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_property_images TO authenticated;
GRANT ALL ON public.admin_property_images TO service_role;

ALTER TABLE public.admin_property_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view property images" ON public.admin_property_images FOR SELECT TO public USING (true);
CREATE POLICY "Admins manage property images" ON public.admin_property_images FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));