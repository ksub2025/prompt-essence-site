import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Structure", path: "/structure" },
  { label: "Timeline", path: "/timeline" },
  { label: "Subsections", path: "/subsections" },
  { label: "Benefits", path: "/benefits" },
  { label: "FAQs", path: "/faqs" },
  { label: "Contact", path: "/contact" },
];

const GLOW_OUT_DURATION = 0.35; // seconds
const GLOW_OUT_MS = GLOW_OUT_DURATION * 1000 + 40; // a little buffer

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // null means no glow visible (between glow-out and glow-in)
  const [activeGlow, setActiveGlow] = useState<string | null>(location.pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    const next = location.pathname;
    const prev = prevPathRef.current;
    if (next === prev) return;

    prevPathRef.current = next;

    // Cancel any pending glow-in
    if (timerRef.current) clearTimeout(timerRef.current);

    // Phase 1 — glow-out: set activeGlow to null so the old item fades to opacity 0
    setActiveGlow(null);

    // Phase 2 — glow-in: after glow-out finishes, fade in the new item
    timerRef.current = setTimeout(() => {
      setActiveGlow(next);
    }, GLOW_OUT_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  const isActive = (path: string) => activeGlow === path;

  const renderNavLink = (item: { label: string; path: string }, extraClass = "") => (
    <Link
      key={item.path}
      to={item.path}
      className={`nav-link relative inline-block rounded-xl px-4 py-2.5 transition-all duration-300 hover:bg-foreground/[0.05] ${extraClass}`}
    >
      {/* Active glass pill background */}
      {isActive(item.path) && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 rounded-xl bg-foreground/[0.09] backdrop-blur-md border border-foreground/[0.1] shadow-[0_0_16px_hsl(var(--primary)/0.15),inset_0_1px_0_hsl(var(--foreground)/0.08)]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      {/* Base text — always rendered for layout */}
      <span className={`relative z-10 ${isActive(item.path) ? "text-primary font-semibold" : ""}`}>
        {item.label}
      </span>

      {/* Glow overlay — animated opacity, sequential via state machine */}
      <motion.span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none font-semibold whitespace-nowrap z-10"
        style={{
          color: "hsl(var(--primary))",
          textShadow:
            "0 0 14px hsl(var(--primary) / 0.65), 0 0 28px hsl(var(--primary) / 0.35)",
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
          {/* Logo */}
          <Link to="/" className="font-headline font-bold text-xl tracking-tight text-foreground">
            Venture Capsule
          </Link>

          {/* Desktop Navigation */}
          <LayoutGroup>
            <div className="hidden md:flex items-center gap-1 mx-auto mr-8">
              {navItems.map((item) => renderNavLink(item))}
            </div>
          </LayoutGroup>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/waitlist">
              <Button variant="hero" size="sm">
                Join Waitlist
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="text-foreground p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {navItems.map((item) => renderNavLink(item, "text-lg"))}
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/waitlist" onClick={() => setIsOpen(false)}>
                  <Button variant="hero" className="w-full">
                    Join Waitlist
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
