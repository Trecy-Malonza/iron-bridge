CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL DEFAULT 'Operations',
  location text NOT NULL DEFAULT 'Maai Mahiu, Kenya',
  employment_type text NOT NULL DEFAULT 'Full-time',
  experience text NOT NULL DEFAULT '3-5 Yrs Exp',
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.careers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.careers TO authenticated;
GRANT ALL ON public.careers TO service_role;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published careers" ON public.careers
FOR SELECT USING (status = 'Published');

CREATE POLICY "Admins can view all careers" ON public.careers
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert careers" ON public.careers
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update careers" ON public.careers
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete careers" ON public.careers
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER careers_updated_at BEFORE UPDATE ON public.careers
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.careers (title, department, location, employment_type, experience, summary, description, status) VALUES
('Property Manager', 'Property Management', 'Maai Mahiu, Kenya', 'Full-time', '3-5 Yrs Exp', 'Lead day-to-day operations of our flagship logistics park in Maai Mahiu.', 'Oversee tenant relations, maintenance planning, budgets and compliance across a 20,000 SQM warehouse campus.', 'Published'),
('Leasing Associate', 'Business Development', 'Nairobi, Kenya', 'Full-time', '2-4 Yrs Exp', 'Drive occupancy across our industrial portfolio.', 'Source and convert occupier demand, run site tours and negotiate lease terms with corporate tenants.', 'Published');