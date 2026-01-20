import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Structure from "./pages/Structure";
import Subsections from "./pages/Subsections";
import Benefits from "./pages/Benefits";
import Apply from "./pages/Apply";
import Waitlist from "./pages/Waitlist";
import Contact from "./pages/Contact";
import Timeline from "./pages/Timeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/subsections" element={<Subsections />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
