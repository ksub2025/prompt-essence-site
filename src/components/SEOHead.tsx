import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOHead = () => {
  const { pathname } = useLocation();
  const canonical = `https://venturecapsule.org${pathname === '/' ? '' : pathname}`;

  return (
    <Helmet>
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
};

export default SEOHead;
