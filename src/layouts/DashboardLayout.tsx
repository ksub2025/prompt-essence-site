import { Outlet } from "react-router-dom";
import DashboardNavigation from "@/components/DashboardNavigation";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <DashboardNavigation />
      <FloatingElements />
      <main className="pt-24 pb-20 relative z-10">
        <div className="section-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
