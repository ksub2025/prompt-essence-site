import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface NavPillProps {
  item: { label: string; path: string };
  isActive: boolean;
  layoutId: string;
  glowDuration?: number;
  extraClass?: string;
  onClick?: () => void;
}

const NavPill = ({
  item,
  isActive,
  layoutId,
  glowDuration = 0.35,
  extraClass = "",
  onClick,
}: NavPillProps) => {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`nav-link relative inline-block rounded-xl px-4 py-2.5 transition-colors duration-300 ${extraClass}`}
    >
      {/* Active glass pill background */}
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 rounded-xl bg-foreground/[0.09] backdrop-blur-md border border-foreground/[0.1] shadow-[0_0_16px_hsl(var(--primary)/0.15),inset_0_1px_0_hsl(var(--foreground)/0.08)]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      {/* Base text */}
      <span
        className={`relative z-10 ${isActive ? "text-primary font-semibold" : ""}`}
      >
        {item.label}
      </span>

      {/* Glow overlay */}
      <motion.span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none font-semibold whitespace-nowrap z-10"
        style={{
          color: "hsl(var(--primary))",
          textShadow:
            "0 0 14px hsl(var(--primary) / 0.65), 0 0 28px hsl(var(--primary) / 0.35)",
        }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: glowDuration, ease: "easeInOut" }}
        initial={false}
      >
        {item.label}
      </motion.span>
    </Link>
  );
};

export default NavPill;
