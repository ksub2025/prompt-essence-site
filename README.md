# VentureCapsule

Marketing site and participant portal for the VentureCapsule competition.

## Tech Stack

- **Framework**: React 18 + Vite 5 + TypeScript
- **Routing**: React Router v6
- **UI**: shadcn/ui (Radix) + Tailwind CSS
- **Data**: TanStack Query + Supabase (Postgres + Auth + Edge Functions)
- **Forms**: react-hook-form + zod
- **Animation/3D**: framer-motion, gsap, three / @react-three/fiber

## Local Development

Requirements: Node 20 LTS (or >= 18), npm.

```bash
git clone <your-repo>
cd prompt-essence-site
npm install
cp .env.example .env       # fill in Supabase values from your dashboard
npm run dev                # serves on http://localhost:8080
```

Get the env values from your Supabase project: **Settings -> API**.

## Build

```bash
npm run build              # outputs to dist/
npm run preview            # preview the production build locally
```

## Deployment (Vercel)

1. Import the repo in Vercel - it auto-detects Vite.
2. Add the three `VITE_*` env vars in **Project Settings -> Environment Variables** (Production, Preview, Development).
3. Deploy. The included `vercel.json` handles SPA routing.

After the first deploy:

- **Supabase -> Auth -> URL Configuration**: set **Site URL** to your custom domain and add both the Vercel preview URL and the production domain to **Additional Redirect URLs**.
- **Google reCAPTCHA admin**: add your Vercel URL(s) and custom domain to allowed domains.
- **Supabase -> Auth -> Providers -> Google**: ensure the Authorized redirect URI on the Google Cloud OAuth client side is `https://<your-supabase-ref>.supabase.co/auth/v1/callback`.

## Project Structure

```
src/
  pages/                React Router routes
  components/           UI components (shadcn + custom)
  layouts/              PublicLayout, DashboardLayout
  integrations/
    supabase/           Supabase client + generated types
  hooks/                Custom React hooks
  lib/                  Utilities
supabase/
  functions/            Edge Functions (verify-recaptcha, report-comment)
  migrations/           SQL migrations (source of truth for schema)
```

## Database Schema

Tables (all in `public`, all with RLS enabled):

- `profiles` - one row per auth user, auto-created via the `on_auth_user_created` trigger
- `waitlist` - public registration submissions
- `comments`, `comment_likes`, `comment_reports` - community discussion thread
- `contact_messages` - contact form submissions

Edge Functions:

- `verify-recaptcha` - verifies Google reCAPTCHA v2 tokens (uses `RECAPTCHA_SECRET_KEY` secret)
- `report-comment` - authenticated insert into `comment_reports`

### Regenerating types after schema changes

```bash
npx supabase login
npx supabase gen types typescript --project-id <your-project-ref> > src/integrations/supabase/types.ts
```

## Notes

- `VITE_*` env vars are public (embedded in the bundle). Never put service-role keys in them.
- The reCAPTCHA site key is currently in `src/components/ReCaptcha.tsx`; the secret key lives only in Supabase Edge Function secrets.
- 3D hero (`HeroScene.tsx`) is desktop-only; mobile gets a static fallback.
