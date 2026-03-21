import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbEntry {
  label: string;
  path?: string;
}

const routeBreadcrumbs: Record<string, BreadcrumbEntry[]> = {
  "/about": [{ label: "About" }],
  "/structure": [
    { label: "Competition", path: "/about" },
    { label: "Competition Structure" },
  ],
  "/subsections": [
    { label: "Competition", path: "/about" },
    { label: "Pathways" },
  ],
  "/timeline": [
    { label: "Competition", path: "/about" },
    { label: "Timeline" },
  ],
  "/benefits": [{ label: "Benefits" }],
  "/faqs": [{ label: "FAQs" }],
  "/waitlist": [{ label: "Join Waitlist" }],
  "/apply": [{ label: "Apply" }],
  "/contact": [{ label: "Contact" }],
};

import { SITE_URL } from "@/lib/constants";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const crumbs = routeBreadcrumbs[pathname];
  if (!crumbs) return null;

  const allItems = [{ label: "Home", path: "/" }, ...crumbs];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(i < allItems.length - 1 || item.path
        ? { item: `${SITE_URL}${item.path || pathname}` }
        : {}),
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="section-container pt-24 pb-0">
        <Breadcrumb>
          <BreadcrumbList>
            {allItems.map((item, i) => {
              const isLast = i === allItems.length - 1;
              return (
                <span key={i} className="contents">
                  {i > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {isLast && !item.path ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={item.path!}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </>
  );
};

export default Breadcrumbs;
