CREATE OR REPLACE FUNCTION public.grant_dashboard_access()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.grant_dashboard_access() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER on_auth_user_created_grant_dashboard
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.grant_dashboard_access();
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users ON CONFLICT DO NOTHING;