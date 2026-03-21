import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavPill from "@/components/NavPill";

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

const GLOW_OUT_DURATION = 0.35;
const GLOW_OUT_MS = GLOW_OUT_DURATION * 1000 + 40;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const [activeGlow, setActiveGlow] = useState<string | null>(location.pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    const next = location.pathname;
    const prev = prevPathRef.current;
    if (next === prev) return;

    prevPathRef.current = next;

    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveGlow(null);

    timerRef.current = setTimeout(() => {
      setActiveGlow(next);
    }, GLOW_OUT_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-headline font-bold text-xl tracking-tight text-foreground">
            Venture Capsule
          </Link>

          <LayoutGroup>
            <div className="hidden md:flex items-center gap-1 mx-auto mr-8">
              {navItems.map((item) => (
                <NavPill
                  key={item.path}
                  item={item}
                  isActive={activeGlow === item.path}
                  layoutId="active-pill"
                  glowDuration={GLOW_OUT_DURATION}
                />
              ))}
            </div>
          </LayoutGroup>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">Log In</Button>
            </Link>
            <Link to="/waitlist">
              <Button variant="hero" size="sm">Join Waitlist</Button>
            </Link>
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
              {navItems.map((item) => (
                <NavPill
                  key={item.path}
                  item={item}
                  isActive={activeGlow === item.path}
                  layoutId="active-pill"
                  glowDuration={GLOW_OUT_DURATION}
                  extraClass="text-lg"
                  onClick={() => setIsOpen(false)}
                />
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/waitlist" onClick={() => setIsOpen(false)}>
                  <Button variant="hero" className="w-full">Join Waitlist</Button>
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
