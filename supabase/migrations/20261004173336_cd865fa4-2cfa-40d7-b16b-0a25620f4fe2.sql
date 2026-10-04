CREATE OR REPLACE FUNCTION public.grant_dashboard_access()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) = 'admin@ironbridge.co.ke' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END; $$;

DELETE FROM public.user_roles ur USING auth.users u
WHERE ur.user_id = u.id AND ur.role = 'admin' AND lower(u.email) <> 'admin@ironbridge.co.ke';

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email) = 'admin@ironbridge.co.ke'
ON CONFLICT DO NOTHING;