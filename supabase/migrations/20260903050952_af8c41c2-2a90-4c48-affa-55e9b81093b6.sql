CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
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

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all careers" ON public.careers;
DROP POLICY IF EXISTS "Admins can insert careers" ON public.careers;
DROP POLICY IF EXISTS "Admins can update careers" ON public.careers;
DROP POLICY IF EXISTS "Admins can delete careers" ON public.careers;

CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all careers" ON public.careers
FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert careers" ON public.careers
FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update careers" ON public.careers
FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete careers" ON public.careers
FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));