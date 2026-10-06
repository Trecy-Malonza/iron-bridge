GRANT SELECT ON public.admin_settings TO anon, authenticated;
CREATE POLICY "Anyone can view company contact settings" ON public.admin_settings FOR SELECT TO anon, authenticated USING (true);