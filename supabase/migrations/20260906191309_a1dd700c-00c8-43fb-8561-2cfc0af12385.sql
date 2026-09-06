-- Helper trigger already exists: public.set_updated_at()

CREATE TABLE public.admin_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL DEFAULT '',
  size text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Available',
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_properties TO authenticated;
GRANT ALL ON public.admin_properties TO service_role;
ALTER TABLE public.admin_properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view properties" ON public.admin_properties FOR SELECT USING (true);
CREATE POLICY "Admins manage properties" ON public.admin_properties FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_properties_updated_at BEFORE UPDATE ON public.admin_properties FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_categories TO authenticated;
GRANT ALL ON public.admin_categories TO service_role;
ALTER TABLE public.admin_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view categories" ON public.admin_categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.admin_categories FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_categories_updated_at BEFORE UPDATE ON public.admin_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  region text NOT NULL DEFAULT '',
  lat numeric NOT NULL DEFAULT 0,
  lng numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_locations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_locations TO authenticated;
GRANT ALL ON public.admin_locations TO service_role;
ALTER TABLE public.admin_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view locations" ON public.admin_locations FOR SELECT USING (true);
CREATE POLICY "Admins manage locations" ON public.admin_locations FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_locations_updated_at BEFORE UPDATE ON public.admin_locations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_amenities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_amenities TO authenticated;
GRANT ALL ON public.admin_amenities TO service_role;
ALTER TABLE public.admin_amenities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view amenities" ON public.admin_amenities FOR SELECT USING (true);
CREATE POLICY "Admins manage amenities" ON public.admin_amenities FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_amenities_updated_at BEFORE UPDATE ON public.admin_amenities FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  requirement text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_leads TO authenticated;
GRANT ALL ON public.admin_leads TO service_role;
ALTER TABLE public.admin_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage leads" ON public.admin_leads FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_leads_updated_at BEFORE UPDATE ON public.admin_leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL,
  email text NOT NULL DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Unread',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_inquiries TO authenticated;
GRANT ALL ON public.admin_inquiries TO service_role;
ALTER TABLE public.admin_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage inquiries" ON public.admin_inquiries FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_inquiries_updated_at BEFORE UPDATE ON public.admin_inquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  contact_person text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  occupied_space text NOT NULL DEFAULT '',
  renewal_status text NOT NULL DEFAULT 'Active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_clients TO authenticated;
GRANT ALL ON public.admin_clients TO service_role;
ALTER TABLE public.admin_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage clients" ON public.admin_clients FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_clients_updated_at BEFORE UPDATE ON public.admin_clients FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Market Insights',
  author text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_blog_posts TO authenticated;
GRANT ALL ON public.admin_blog_posts TO service_role;
ALTER TABLE public.admin_blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published posts" ON public.admin_blog_posts FOR SELECT USING (status = 'Published');
CREATE POLICY "Admins view all posts" ON public.admin_blog_posts FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage posts" ON public.admin_blog_posts FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update posts" ON public.admin_blog_posts FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete posts" ON public.admin_blog_posts FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_blog_posts_updated_at BEFORE UPDATE ON public.admin_blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL DEFAULT '',
  media_type text NOT NULL DEFAULT 'Image',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_media TO authenticated;
GRANT ALL ON public.admin_media TO service_role;
ALTER TABLE public.admin_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view media" ON public.admin_media FOR SELECT USING (true);
CREATE POLICY "Admins manage media" ON public.admin_media FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_media_updated_at BEFORE UPDATE ON public.admin_media FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  path text NOT NULL DEFAULT '/',
  status text NOT NULL DEFAULT 'Published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_pages TO authenticated;
GRANT ALL ON public.admin_pages TO service_role;
ALTER TABLE public.admin_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pages" ON public.admin_pages FOR SELECT USING (true);
CREATE POLICY "Admins manage pages" ON public.admin_pages FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_pages_updated_at BEFORE UPDATE ON public.admin_pages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL DEFAULT 'IronBridge Industrial Group',
  email text NOT NULL DEFAULT 'info@ironbridge.co.ke',
  phone text NOT NULL DEFAULT '+254 700 000 000',
  address text NOT NULL DEFAULT 'Maai Mahiu, Kenya',
  summary text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_settings TO authenticated;
GRANT ALL ON public.admin_settings TO service_role;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage settings" ON public.admin_settings FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER admin_settings_updated_at BEFORE UPDATE ON public.admin_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.admin_properties (name, location, size, price, status, description) VALUES
  ('Grade A Warehouse', 'Maai Mahiu Industrial Area', '12,000 sqm', 'On request', 'Available', 'Modern warehouse with multiple loading bays and highway access.'),
  ('Cold Storage Facility', 'Athi River, Machakos', '8,500 sqm', 'On request', 'Available', 'Temperature-controlled warehouse with backup power.'),
  ('Industrial Godown', 'Industrial Area, Nairobi', '5,200 sqm', 'On request', 'Available', 'High-eaves godown with excellent road connectivity.'),
  ('Logistics Hub', 'Mombasa Road Corridor', '18,000 sqm', 'On request', 'Available', 'Cross-docking logistics centre with container yard.'),
  ('Light Industrial Unit', 'Ruiru, Kiambu', '3,800 sqm', 'On request', 'Available', 'Flexible unit with office block and ample parking.');

INSERT INTO public.admin_categories (name, description) VALUES
  ('Warehouse', 'Grade A and standard warehousing space'),
  ('Cold Storage', 'Temperature-controlled facilities'),
  ('Logistics Hub', 'Large-scale distribution centres'),
  ('Industrial Land', 'Serviced land for development'),
  ('Light Industrial', 'Assembly and light manufacturing units');

INSERT INTO public.admin_locations (name, region, lat, lng) VALUES
  ('Maai Mahiu', 'Nakuru County', -0.9333, 36.5833),
  ('Athi River', 'Machakos County', -1.4565, 36.9785),
  ('Nairobi Industrial Area', 'Nairobi County', -1.2833, 36.8333),
  ('Mombasa Road Corridor', 'Nairobi County', -1.35, 36.9),
  ('Ruiru', 'Kiambu County', -1.15, 36.96);

INSERT INTO public.admin_amenities (name, description) VALUES
  ('Multi Loading Bays', 'Several dock-level loading bays'),
  ('24/7 Security', 'Round-the-clock manned security'),
  ('Backup Power', 'Standby generator capacity'),
  ('Container Yard', 'Hardstand yard for container handling'),
  ('Ample Parking', 'Truck and staff parking'),
  ('High Eaves', 'Clear internal height above 10m');

INSERT INTO public.admin_leads (name, company, email, phone, requirement, status) VALUES
  ('James Mwangi', 'Rift Valley Logistics', 'james@rvlogistics.co.ke', '+254 711 222 333', '10,000 sqm warehouse in Naivasha', 'New'),
  ('Aisha Noor', 'Coast Distributors', 'aisha@coastdist.co.ke', '+254 722 444 555', 'Cold storage near Mombasa Road', 'Contacted'),
  ('Peter Kariuki', 'Kariuki Manufacturing', 'peter@kmfg.co.ke', '+254 733 666 777', 'Light industrial unit in Ruiru', 'Qualified');

INSERT INTO public.admin_inquiries (sender_name, email, subject, message, status) VALUES
  ('Grace Wanjiru', 'grace@example.com', 'Site visit request', 'Would like to schedule a visit to the Maai Mahiu warehouse.', 'Unread'),
  ('Daniel Otieno', 'daniel@example.com', 'Lease terms', 'Please share lease terms for the logistics hub.', 'Replied');

INSERT INTO public.admin_clients (company, contact_person, email, phone, occupied_space, renewal_status) VALUES
  ('Rift Valley Logistics', 'James Mwangi', 'james@rvlogistics.co.ke', '+254 711 222 333', '9,000 sqm', 'Active'),
  ('Coast Distributors', 'Aisha Noor', 'aisha@coastdist.co.ke', '+254 722 444 555', '6,500 sqm', 'Renewal Due');

INSERT INTO public.admin_blog_posts (title, category, author, excerpt, status) VALUES
  ('Kenya''s Industrial Corridor Takes Shape', 'Market Insights', 'Brian O.', 'How the Nairobi-Nakuru corridor is reshaping logistics.', 'Published'),
  ('Choosing the Right Warehouse Specification', 'Market Insights', 'Collins K. Kimani', 'Eaves height, floor loading and dock doors explained.', 'Published'),
  ('IronBridge Expands Maai Mahiu Park', 'Company News', 'Grace W. Kariuki', 'New phase adds 20,000 sqm of Grade A space.', 'Draft');

INSERT INTO public.admin_media (title, url, media_type) VALUES
  ('Warehouse exterior at dusk', '/src/assets/warehouse-exterior.jpg', 'Image'),
  ('Warehouse interior', '/src/assets/warehouse-interior.jpg', 'Image'),
  ('Industrial land', '/src/assets/industrial-land.jpg', 'Image');

INSERT INTO public.admin_pages (title, path, status) VALUES
  ('Home', '/', 'Published'),
  ('Properties', '/properties', 'Published'),
  ('Careers', '/careers', 'Published'),
  ('Blog', '/blog', 'Published');

INSERT INTO public.admin_settings (summary) VALUES
  ('IronBridge Industrial Group develops and manages industrial real estate across Kenya.');