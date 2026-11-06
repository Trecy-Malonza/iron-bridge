ALTER TABLE public.careers
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS salary_range text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS application_type text NOT NULL DEFAULT 'Email',
  ADD COLUMN IF NOT EXISTS application_email text NOT NULL DEFAULT 'careers@ironbridge.co.ke',
  ADD COLUMN IF NOT EXISTS application_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS seo_title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS seo_description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS publish_date timestamptz,
  ADD COLUMN IF NOT EXISTS expiry_date date;

ALTER TABLE public.admin_pages
  ADD COLUMN IF NOT EXISTS subtitle text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS hero_image text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS body_content text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS publish_date timestamptz,
  ADD COLUMN IF NOT EXISTS seo_title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS seo_description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS canonical_url text NOT NULL DEFAULT '';

GRANT SELECT ON public.careers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.careers TO authenticated;
GRANT ALL ON public.careers TO service_role;
GRANT SELECT ON public.admin_pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.admin_pages TO authenticated;
GRANT ALL ON public.admin_pages TO service_role;

DROP POLICY IF EXISTS "Anyone can view published careers" ON public.careers;
CREATE POLICY "Anyone can view currently published careers" ON public.careers
  FOR SELECT TO public
  USING (
    status = 'Published'
    AND (publish_date IS NULL OR publish_date <= now())
    AND (expiry_date IS NULL OR expiry_date >= CURRENT_DATE)
  );