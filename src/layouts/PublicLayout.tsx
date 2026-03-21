import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PublicLayoutProps {
  showBreadcrumbs?: boolean;
}

const PublicLayout = ({ showBreadcrumbs = true }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      {showBreadcrumbs && <Breadcrumbs />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
