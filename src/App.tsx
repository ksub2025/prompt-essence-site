import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Waitlist from "./pages/Waitlist";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Timeline from "./pages/Timeline";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import DashboardLayout from "./layouts/DashboardLayout";
import SupportingDocs from "./pages/dashboard/SupportingDocs";
import DashboardTimeline from "./pages/dashboard/DashboardTimeline";
import Support from "./pages/dashboard/Support";
import Guide from "./pages/dashboard/Guide";
import JudgingCriteria from "./pages/dashboard/JudgingCriteria";

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
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/structure" element={<Structure />} />
              <Route path="/subsections" element={<Subsections />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/login" element={<Login />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="supporting-docs" element={<SupportingDocs />} />
                <Route path="timeline" element={<DashboardTimeline />} />
                <Route path="support" element={<Support />} />
                <Route path="guide" element={<Guide />} />
                <Route path="judging-criteria" element={<JudgingCriteria />} />
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
