GRANT INSERT ON public.admin_leads TO anon, authenticated;
GRANT INSERT ON public.admin_inquiries TO anon, authenticated;
CREATE POLICY "Visitors can submit leads" ON public.admin_leads FOR INSERT TO anon, authenticated
WITH CHECK (status = 'New' AND length(name) BETWEEN 1 AND 100 AND length(email) <= 255 AND length(phone) <= 40 AND length(company) <= 150 AND length(requirement) <= 2000);
CREATE POLICY "Visitors can send inquiries" ON public.admin_inquiries FOR INSERT TO anon, authenticated
WITH CHECK (status = 'Unread' AND length(sender_name) BETWEEN 1 AND 100 AND length(email) <= 255 AND length(subject) <= 200 AND length(message) BETWEEN 1 AND 2000);