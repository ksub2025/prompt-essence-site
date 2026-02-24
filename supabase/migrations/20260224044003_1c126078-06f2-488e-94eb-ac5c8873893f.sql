
-- Drop the restrictive policies
DROP POLICY IF EXISTS "Anyone can submit contact message" ON public.contact_messages;
DROP POLICY IF EXISTS "No public reads" ON public.contact_messages;

-- Recreate as permissive policies
CREATE POLICY "Anyone can submit contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "No public reads"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);
