import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Structure", path: "/structure" },
  { label: "Timeline", path: "/timeline" },
  { label: "Subsections", path: "/subsections" },
  { label: "Benefits", path: "/benefits" },
  { label: "Contact", path: "/contact" },
];

const GLOW_DURATION = 380; // ms — slightly longer than CSS transition so it fully finishes

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // The path whose glow is currently visible / animating
  const [activeGlow, setActiveGlow] = useState<string>(location.pathname);
  // The path whose glow is fading out
  const [glowingOut, setGlowingOut] = useState<string | null>(null);

  const pendingPath = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const next = location.pathname;

    // Same page — nothing to do
    if (next === activeGlow && !glowingOut) return;

    // Cancel any in-flight sequence
    if (timerRef.current) clearTimeout(timerRef.current);

    pendingPath.current = next;

    // Phase 1: glow-out the current active item
    setGlowingOut(activeGlow);
    setActiveGlow(""); // remove active glow class immediately

    // Phase 2: after glow-out finishes, glow-in the new item
    timerRef.current = setTimeout(() => {
      setGlowingOut(null);
      setActiveGlow(pendingPath.current ?? next);
    }, GLOW_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const getLinkClass = (path: string) => {
    if (path === activeGlow) return "nav-link nav-link-active";
    if (path === glowingOut) return "nav-link nav-link-glow-out";
    return "nav-link";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-headline font-bold text-xl tracking-tight text-foreground">
            Venture Capsule
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getLinkClass(item.path)}
              >
                {item.label}
              </Link>
            ))}
          </div>

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
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${getLinkClass(item.path)} text-lg`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
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
