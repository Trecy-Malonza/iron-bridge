ALTER TABLE public.admin_properties
  ADD COLUMN IF NOT EXISTS publish_status text NOT NULL DEFAULT 'Published',
  ADD COLUMN IF NOT EXISTS visibility text NOT NULL DEFAULT 'Public',
  ADD COLUMN IF NOT EXISTS publish_date timestamptz,
  ADD COLUMN IF NOT EXISTS seo_title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS seo_description text NOT NULL DEFAULT '';

UPDATE public.admin_properties
SET publish_status = CASE WHEN lower(status) IN ('hidden', 'draft') THEN 'Draft' ELSE 'Published' END
WHERE publish_status = 'Published' AND lower(status) IN ('hidden', 'draft');