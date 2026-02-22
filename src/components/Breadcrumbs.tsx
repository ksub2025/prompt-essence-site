import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/structure": "Competition Structure",
  "/subsections": "Pathways",
  "/timeline": "Timeline",
  "/benefits": "Benefits",
  "/faqs": "FAQs",
  "/waitlist": "Join Waitlist",
  "/apply": "Apply",
  "/contact": "Contact",
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const label = routeLabels[pathname] ?? pathname.replace("/", "");

  return (
    <div className="section-container pt-24 pb-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
