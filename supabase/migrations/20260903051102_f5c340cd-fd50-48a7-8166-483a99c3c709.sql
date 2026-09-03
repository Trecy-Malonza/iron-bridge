INSERT INTO public.user_roles (user_id, role)
VALUES ('58648e6a-77e0-4943-b0b5-d4ee3085b713', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;