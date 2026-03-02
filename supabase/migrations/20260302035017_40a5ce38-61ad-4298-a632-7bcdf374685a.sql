-- Allow authenticated users to read their own waitlist entry by email
CREATE POLICY "Users can view their own waitlist entry"
ON public.waitlist
FOR SELECT
USING (auth.jwt() ->> 'email' = email);
