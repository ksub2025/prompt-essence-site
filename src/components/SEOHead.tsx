import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '@/lib/constants';

type PageMeta = { title: string; description: string };

const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'VentureCapsule | Business Competition for Students',
    description: 'Global online business, finance & economics competition for students. Teams of 2–6 compete across rounds. Register today.',
  },
  '/about': {
    title: 'About | VentureCapsule Student Business Competition',
    description: 'Learn about VentureCapsule — a global competition for students in finance, economics, and entrepreneurial pitching.',
  },
  '/subsections': {
    title: 'Pathways | Finance, Economics & Pitch Tracks',
    description: 'Explore the four VentureCapsule tracks: Idea Lab, Portfolio Pathways, Intrapreneurship, and Case of Crisis.',
  },
  '/structure': {
    title: 'Structure | VentureCapsule Competition Rounds',
    description: 'Three main rounds plus one bring-back round — how the VentureCapsule student business competition works.',
  },
  '/timeline': {
    title: 'Timeline | VentureCapsule 2026 Competition',
    description: 'Key dates for VentureCapsule 2026 — the global online business, finance, and economics competition for students.',
  },
  '/benefits': {
    title: 'Benefits | Why Join VentureCapsule',
    description: 'Cash prizes, global certificates, and professional mentoring — discover what VentureCapsule offers student competitors.',
  },
  '/faqs': {
    title: 'FAQs | VentureCapsule Competition Answers',
    description: 'Eligibility, structure, rounds, and how to participate in VentureCapsule — answered.',
  },
  '/register': {
    title: 'Register | VentureCapsule 2026',
    description: 'Register your team for VentureCapsule — the premier business competition for students.',
  },
  '/apply': {
    title: 'Apply | VentureCapsule Pitch Contest',
    description: 'Apply to VentureCapsule\'s entrepreneurial pitch contest and student finance challenge.',
  },
  '/contact': {
    title: 'Contact | VentureCapsule Team',
    description: 'Get in touch with the VentureCapsule team about the student business and finance competition.',
  },
  '/login': {
    title: 'Sign In | VentureCapsule',
    description: 'Sign in to your VentureCapsule account to manage your team and registration.',
  },
  '/reset-password': {
    title: 'Reset Password | VentureCapsule',
    description: 'Reset the password for your VentureCapsule account.',
  },
};

const dashboardMeta: Record<string, PageMeta> = {
  '/dashboard': { title: 'Dashboard | VentureCapsule', description: 'Your VentureCapsule competitor workspace.' },
  '/dashboard/supporting-docs': { title: 'Supporting Docs | Dashboard', description: 'Access supporting documents for VentureCapsule competitors.' },
  '/dashboard/timeline': { title: 'Timeline | Dashboard', description: 'Track competition milestones from your dashboard.' },
  '/dashboard/community': { title: 'Community | Dashboard', description: 'Connect with other VentureCapsule competitors.' },
  '/dashboard/guide': { title: 'Guide | Dashboard', description: 'Step-by-step competitor guide.' },
  '/dashboard/judging-criteria': { title: 'Judging Criteria | Dashboard', description: 'How VentureCapsule entries are judged.' },
  '/dashboard/my-registration': { title: 'My Registration | Dashboard', description: 'Manage your team\'s registration.' },
  '/dashboard/about': { title: 'About | Dashboard', description: 'About VentureCapsule for competitors.' },
  '/dashboard/pathways': { title: 'Pathways | Dashboard', description: 'Choose your competition pathway.' },
  '/dashboard/benefits': { title: 'Benefits | Dashboard', description: 'Competitor benefits overview.' },
  '/dashboard/faqs': { title: 'FAQs | Dashboard', description: 'Competitor FAQs.' },
  '/dashboard/contact': { title: 'Contact | Dashboard', description: 'Reach the VentureCapsule team.' },
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'VentureCapsule — Business Competition for Students: Finance, Economics & Pitch',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  startDate: '2026-03-01',
  description: 'VentureCapsule is a global business competition for students. Teams of 2–6 compete across 3 main rounds with a bring-back round.',
  organizer: { '@type': 'Organization', name: 'Venture Capsule', url: 'https://venturecapsule.org' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is VentureCapsule and who is it for?', acceptedAnswer: { '@type': 'Answer', text: 'VentureCapsule is a global business competition for students focused on finance challenges, economics case competitions, and entrepreneurial pitch contests. Teams of 2–6 compete across subsections including business pitching, financial literacy, case studies, and professional mentoring.' } },
    { '@type': 'Question', name: 'Is this competition open to students worldwide?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The competition is open to students worldwide. Teams of 2–6 members register.' } },
    { '@type': 'Question', name: 'How is the competition structured?', acceptedAnswer: { '@type': 'Answer', text: 'VentureCapsule features 3 main rounds and 1 bring-back round. Eliminated teams can re-enter during the bring-back round.' } },
    { '@type': 'Question', name: 'When and where does it take place?', acceptedAnswer: { '@type': 'Answer', text: 'VentureCapsule is fully online, starting March 2026.' } },
    { '@type': 'Question', name: 'What makes VentureCapsule different?', acceptedAnswer: { '@type': 'Answer', text: 'VentureCapsule combines pitch contest, finance challenge, and economics case competition with professional mentoring and a unique bring-back round system.' } },
  ],
};

const SEOHead = () => {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
  const isDashboard = pathname.startsWith('/dashboard');
  const meta =
    pageMeta[pathname] ??
    dashboardMeta[pathname] ??
    (isDashboard ? dashboardMeta['/dashboard'] : pageMeta['/']);

  const includeEvent = pathname === '/';
  const includeFaq = pathname === '/' || pathname === '/faqs';

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={isDashboard ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {includeEvent && (
        <script type="application/ld+json">{JSON.stringify(eventJsonLd)}</script>
      )}
      {includeFaq && (
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
