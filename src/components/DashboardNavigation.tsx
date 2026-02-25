import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const dashboardItems = [
  { label: "Supporting Docs", path: "/dashboard/supporting-docs" },
  { label: "Timeline", path: "/dashboard/timeline" },
  { label: "Support", path: "/dashboard/support" },
  { label: "Guide", path: "/dashboard/guide" },
  { label: "Judging Criteria", path: "/dashboard/judging-criteria" },
];

const GLOW_OUT_DURATION = 0.35;

const DashboardNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out" });
    navigate("/");
  };

  const renderNavLink = (item: { label: string; path: string }, extraClass = "") => (
    <Link
      key={item.path}
      to={item.path}
      onClick={() => setIsOpen(false)}
      className={`nav-link relative inline-block rounded-xl px-4 py-2.5 transition-colors duration-300 ${extraClass}`}
    >
      {isActive(item.path) && (
        <motion.div
          layoutId="dashboard-active-pill"
          className="absolute inset-0 rounded-xl bg-foreground/[0.09] backdrop-blur-md border border-foreground/[0.1] shadow-[0_0_16px_hsl(var(--primary)/0.15),inset_0_1px_0_hsl(var(--foreground)/0.08)]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      <span className={`relative z-10 ${isActive(item.path) ? "text-primary font-semibold" : ""}`}>
        {item.label}
      </span>

      <motion.span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none font-semibold whitespace-nowrap z-10"
        style={{
          color: "hsl(var(--primary))",
          textShadow: "0 0 14px hsl(var(--primary) / 0.65), 0 0 28px hsl(var(--primary) / 0.35)",
        }}
        animate={{ opacity: isActive(item.path) ? 1 : 0 }}
        transition={{ duration: GLOW_OUT_DURATION, ease: "easeInOut" }}
        initial={false}
      >
        {item.label}
      </motion.span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/dashboard/supporting-docs" className="font-headline font-bold text-xl tracking-tight text-foreground">
            Venture Capsule
          </Link>

          <LayoutGroup>
            <div className="hidden md:flex items-center gap-1 mx-auto">
              {dashboardItems.map((item) => renderNavLink(item))}
            </div>
          </LayoutGroup>

          <div className="hidden md:flex items-center">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button className="text-foreground p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {dashboardItems.map((item) => renderNavLink(item, "text-lg"))}
              <Button variant="outline" className="w-full mt-4" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default DashboardNavigation;
