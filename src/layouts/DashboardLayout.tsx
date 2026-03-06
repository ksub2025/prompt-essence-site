import { Outlet } from "react-router-dom";
import DashboardNavigation from "@/components/DashboardNavigation";
import Footer from "@/components/Footer";
import FloatingBackground from "@/components/FloatingBackground";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingBackground density="low" />
      <DashboardNavigation />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
