import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'VentureCapsule | Business Competition for Students & Finance Challenge',
    description: 'VentureCapsule is a global business competition for students covering finance challenges, economics case competitions, and entrepreneurial pitch contests. Register your team today.',
  },
  '/about': {
    title: 'About VentureCapsule | Student Business & Finance Competition',
    description: 'Learn about VentureCapsule — a global business competition for students in finance, economics, and entrepreneurial pitching.',
  },
  '/subsections': {
    title: 'Competition Tracks | Finance Challenge & Economics Case Competition',
    description: 'Explore VentureCapsule\'s tracks: business pitching, finance challenge for students, economics case competition, and professional mentoring.',
  },
  '/structure': {
    title: 'Competition Structure | VentureCapsule Student Business Pitch',
    description: 'Understand how VentureCapsule\'s rounds work — 4 main rounds and 2 bring-back rounds for the ultimate student business competition experience.',
  },
  '/timeline': {
    title: 'Timeline | VentureCapsule Business & Finance Competition 2026',
    description: 'Key dates for VentureCapsule 2026 — the global business competition for students in finance, economics, and entrepreneurial pitching.',
  },
  '/benefits': {
    title: 'Benefits | Why Join This Student Finance & Economics Competition',
    description: 'Win cash prizes, earn a global certificate, and get mentored by professionals. Discover what VentureCapsule\'s business competition offers students.',
  },
  '/waitlist': {
    title: 'Join Waitlist | VentureCapsule Business Competition for Students',
    description: 'Secure your spot in VentureCapsule — the premier business competition for students featuring finance challenges and economics case competitions.',
  },
  '/apply': {
    title: 'Apply | VentureCapsule Entrepreneurial Pitch Contest',
    description: 'Apply to VentureCapsule\'s entrepreneurial pitch contest and student finance challenge. Applications opening soon.',
  },
  '/contact': {
    title: 'Contact | VentureCapsule Student Business Competition',
    description: 'Get in touch with the VentureCapsule team about our student business competition, finance challenge, or economics case competition.',
  },
};

const SEOHead = () => {
  const { pathname } = useLocation();
  const canonical = `https://venturecapsule.org${pathname === '/' ? '' : pathname}`;
  const meta = pageMeta[pathname] ?? pageMeta['/'];

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
};

export default SEOHead;
