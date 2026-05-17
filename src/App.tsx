import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import SEOHead from "./components/SEOHead";
import Index from "./pages/Index";
import About from "./pages/About";
import Structure from "./pages/Structure";
import Subsections from "./pages/Subsections";
import Benefits from "./pages/Benefits";
import FAQ from "./pages/FAQ";
import Apply from "./pages/Apply";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Timeline from "./pages/Timeline";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthGuard from "./components/AuthGuard";
import SupportingDocs from "./pages/dashboard/SupportingDocs";
import DashboardTimeline from "./pages/dashboard/DashboardTimeline";
import Community from "./pages/dashboard/Community";
import Guide from "./pages/dashboard/Guide";
import JudgingCriteria from "./pages/dashboard/JudgingCriteria";
import MyRegistration from "./pages/dashboard/MyRegistration";
import DashboardAbout from "./pages/dashboard/DashboardAbout";
import DashboardSubsections from "./pages/dashboard/DashboardSubsections";
import DashboardBenefits from "./pages/dashboard/DashboardBenefits";
import DashboardFAQs from "./pages/dashboard/DashboardFAQs";
import DashboardContact from "./pages/dashboard/DashboardContact";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <SEOHead />
            <Routes>
              {/* Standalone pages (no shared layout) */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Public pages with shared Navigation + Breadcrumbs + Footer */}
              <Route element={<PublicLayout />}>
                <Route path="/about" element={<About />} />
                <Route path="/structure" element={<Structure />} />
                <Route path="/subsections" element={<Subsections />} />
                <Route path="/benefits" element={<Benefits />} />
                <Route path="/faqs" element={<FAQ />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/timeline" element={<Timeline />} />
              </Route>

              {/* Dashboard */}
              <Route path="/dashboard" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
                <Route index element={<Navigate to="supporting-docs" replace />} />
                <Route path="supporting-docs" element={<SupportingDocs />} />
                <Route path="timeline" element={<DashboardTimeline />} />
                <Route path="community" element={<Community />} />
                <Route path="guide" element={<Guide />} />
                <Route path="judging-criteria" element={<JudgingCriteria />} />
                <Route path="my-registration" element={<MyRegistration />} />
                <Route path="about" element={<DashboardAbout />} />
                <Route path="pathways" element={<DashboardSubsections />} />
                <Route path="benefits" element={<DashboardBenefits />} />
                <Route path="faqs" element={<DashboardFAQs />} />
                <Route path="contact" element={<DashboardContact />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
