alter table public.admin_properties
  add column if not exists property_code text not null default '',
  add column if not exists property_type text not null default 'Warehouse',
  add column if not exists category text not null default '',
  add column if not exists offer text not null default 'For Lease',
  add column if not exists featured boolean not null default false,
  add column if not exists highlights jsonb not null default '[]'::jsonb,
  add column if not exists images jsonb not null default '[]'::jsonb,
  add column if not exists clear_height text not null default '',
  add column if not exists dock_doors text not null default '',
  add column if not exists year_built text not null default '',
  add column if not exists lease_type text not null default 'Long Term',
  add column if not exists zoning text not null default 'Industrial',
  add column if not exists power_supply text not null default '',
  add column if not exists water_supply text not null default '',
  add column if not exists security text not null default '';

GRANT SELECT ON public.admin_properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_properties TO authenticated;
GRANT ALL ON public.admin_properties TO service_role;

-- Storage: public read for everyone, uploads/deletes only for admins
CREATE POLICY "Public read property images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'property-images');
CREATE POLICY "Admins upload property images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'property-images' AND private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update property images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'property-images' AND private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete property images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'property-images' AND private.has_role(auth.uid(), 'admin'::app_role));