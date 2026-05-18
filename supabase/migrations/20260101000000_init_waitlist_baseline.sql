-- Baseline: create waitlist table that pre-dated Lovable's migration tracking.
-- team_members column is added by the next migration (20260210151212).

CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  team_name TEXT,
  subsection TEXT,
  how_heard TEXT,
  improvement_suggestion TEXT,
  faqs TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can submit a registration
CREATE POLICY "Anyone can submit waitlist entry"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Default-deny SELECT; a later migration adds a per-user read policy
CREATE POLICY "No public reads on waitlist"
  ON public.waitlist
  FOR SELECT
  TO anon
  USING (false);
