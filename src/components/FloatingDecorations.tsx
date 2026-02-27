import { motion } from "framer-motion";
import {
  Lightbulb, BarChart3, Settings, Orbit, Puzzle,
  Trophy, RefreshCw, Calendar, Award, Globe,
  Rocket, Target, Users, TrendingUp, FileText,
} from "lucide-react";

interface DecorationItem {
  icon: React.ElementType;
  x: string;
  y: string;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  drift: number;
}

// Icons placed exclusively in left/right margins (0-6% and 94-100% x)
// to never overlap centered page content (which lives in ~8%-92%)
const allDecorations: DecorationItem[] = [
  // ===== LEFT MARGIN =====
  // Subsection icons
  { icon: Lightbulb, x: "2%", y: "6%", size: 40, rotate: -12, delay: 0, duration: 9, drift: 14 },
  { icon: Settings, x: "4%", y: "18%", size: 34, rotate: 18, delay: 1.2, duration: 10, drift: -10 },
  { icon: BarChart3, x: "1%", y: "30%", size: 36, rotate: -8, delay: 0.5, duration: 8, drift: 12 },
  { icon: Orbit, x: "3%", y: "42%", size: 38, rotate: 22, delay: 2, duration: 9, drift: -16 },
  // Puzzle pieces
  { icon: Puzzle, x: "2%", y: "54%", size: 32, rotate: 35, delay: 0.8, duration: 11, drift: 10 },
  { icon: Puzzle, x: "4%", y: "66%", size: 28, rotate: -28, delay: 1.6, duration: 8, drift: -8 },
  // Round & competition icons
  { icon: Trophy, x: "1%", y: "76%", size: 34, rotate: 10, delay: 2.4, duration: 10, drift: 14 },
  { icon: RefreshCw, x: "3%", y: "86%", size: 30, rotate: -20, delay: 0.3, duration: 9, drift: -12 },
  { icon: Calendar, x: "2%", y: "94%", size: 32, rotate: 15, delay: 1.8, duration: 8, drift: 10 },

  // ===== RIGHT MARGIN =====
  // Subsection icons
  { icon: Orbit, x: "96%", y: "4%", size: 38, rotate: -15, delay: 0.6, duration: 8, drift: -14 },
  { icon: Lightbulb, x: "94%", y: "16%", size: 36, rotate: 12, delay: 1.8, duration: 10, drift: 10 },
  { icon: BarChart3, x: "97%", y: "28%", size: 34, rotate: -22, delay: 0.2, duration: 9, drift: -12 },
  { icon: Settings, x: "95%", y: "40%", size: 32, rotate: 30, delay: 2.2, duration: 11, drift: 16 },
  // Puzzle pieces
  { icon: Puzzle, x: "96%", y: "52%", size: 36, rotate: -40, delay: 1, duration: 8, drift: -10 },
  { icon: Puzzle, x: "94%", y: "64%", size: 30, rotate: 45, delay: 0.4, duration: 10, drift: 8 },
  // Additional competition icons
  { icon: Award, x: "97%", y: "74%", size: 34, rotate: -10, delay: 2.6, duration: 9, drift: -14 },
  { icon: Globe, x: "95%", y: "84%", size: 32, rotate: 20, delay: 1.4, duration: 8, drift: 12 },
  { icon: Rocket, x: "96%", y: "93%", size: 36, rotate: -18, delay: 0.7, duration: 10, drift: -10 },

  // ===== SCATTERED CENTER-ISH (far enough from text, decorative fill) =====
  { icon: Target, x: "12%", y: "12%", size: 28, rotate: 25, delay: 1.5, duration: 9, drift: 8 },
  { icon: TrendingUp, x: "85%", y: "10%", size: 30, rotate: -14, delay: 0.9, duration: 10, drift: -10 },
  { icon: Puzzle, x: "10%", y: "48%", size: 26, rotate: 50, delay: 2.1, duration: 8, drift: 12 },
  { icon: FileText, x: "88%", y: "50%", size: 28, rotate: -35, delay: 0.3, duration: 11, drift: -8 },
  { icon: Users, x: "11%", y: "82%", size: 30, rotate: 15, delay: 1.7, duration: 9, drift: -14 },
  { icon: Trophy, x: "87%", y: "88%", size: 32, rotate: -22, delay: 2.3, duration: 8, drift: 10 },
];

type Variant = "full" | "medium" | "sparse";

const variantIndices: Record<Variant, number[]> = {
  full: Array.from({ length: allDecorations.length }, (_, i) => i),
  medium: [0, 3, 4, 7, 9, 12, 13, 16, 18, 19, 20, 22, 23],
  sparse: [0, 3, 6, 9, 12, 15, 18, 22],
};

interface FloatingDecorationsProps {
  variant?: Variant;
  className?: string;
}

const FloatingDecorations = ({ variant = "full", className = "" }: FloatingDecorationsProps) => {
  const indices = variantIndices[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {indices.map((i) => {
        const d = allDecorations[i];
        const Icon = d.icon;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: d.x, top: d.y }}
            initial={{ opacity: 0, y: 0, rotate: d.rotate }}
            animate={{
              opacity: [0.5, 0.7, 0.5, 0.65, 0.5],
              y: [0, d.drift, -d.drift * 0.5, d.drift * 0.3, 0],
              rotate: [d.rotate, d.rotate + 8, d.rotate - 5, d.rotate],
            }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              size={d.size}
              className="text-primary"
              strokeWidth={1.5}
              style={{
                filter:
                  "drop-shadow(0 0 10px hsl(22 68% 86% / 0.45)) drop-shadow(0 0 20px hsl(22 68% 86% / 0.2))",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingDecorations;
