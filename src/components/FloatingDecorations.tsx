import { motion } from "framer-motion";
import { Lightbulb, BarChart3, Settings, Orbit, Puzzle } from "lucide-react";

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

const allDecorations: DecorationItem[] = [
  // --- Row 1: top area ---
  { icon: Lightbulb, x: "6%", y: "8%", size: 44, rotate: -15, delay: 0, duration: 8, drift: 16 },
  { icon: Puzzle, x: "28%", y: "5%", size: 36, rotate: 35, delay: 0.6, duration: 10, drift: -12 },
  { icon: BarChart3, x: "52%", y: "10%", size: 40, rotate: 10, delay: 1.2, duration: 9, drift: 14 },
  { icon: Puzzle, x: "75%", y: "6%", size: 32, rotate: -25, delay: 0.3, duration: 11, drift: -10 },
  { icon: Orbit, x: "92%", y: "12%", size: 42, rotate: -8, delay: 1.8, duration: 7, drift: -14 },

  // --- Row 2: upper-mid ---
  { icon: Settings, x: "4%", y: "28%", size: 38, rotate: 20, delay: 0.8, duration: 10, drift: 18 },
  { icon: Puzzle, x: "18%", y: "24%", size: 30, rotate: 50, delay: 2, duration: 9, drift: -8 },
  { icon: Lightbulb, x: "42%", y: "30%", size: 34, rotate: -10, delay: 1.5, duration: 8, drift: 10 },
  { icon: Puzzle, x: "65%", y: "26%", size: 38, rotate: -40, delay: 0.4, duration: 12, drift: 12 },
  { icon: BarChart3, x: "88%", y: "32%", size: 36, rotate: 15, delay: 2.5, duration: 9, drift: -16 },

  // --- Row 3: middle ---
  { icon: Orbit, x: "8%", y: "48%", size: 40, rotate: -20, delay: 1, duration: 8, drift: -14 },
  { icon: Puzzle, x: "32%", y: "50%", size: 34, rotate: 60, delay: 1.8, duration: 10, drift: 10 },
  { icon: Settings, x: "55%", y: "46%", size: 32, rotate: 30, delay: 0.5, duration: 11, drift: -12 },
  { icon: Puzzle, x: "78%", y: "52%", size: 28, rotate: -15, delay: 2.2, duration: 9, drift: 8 },
  { icon: Lightbulb, x: "94%", y: "48%", size: 36, rotate: 12, delay: 3, duration: 8, drift: -10 },

  // --- Row 4: lower-mid ---
  { icon: Puzzle, x: "5%", y: "68%", size: 42, rotate: 45, delay: 0.7, duration: 9, drift: 14 },
  { icon: BarChart3, x: "22%", y: "72%", size: 34, rotate: -22, delay: 1.4, duration: 10, drift: -10 },
  { icon: Orbit, x: "48%", y: "70%", size: 38, rotate: 8, delay: 2, duration: 8, drift: 16 },
  { icon: Puzzle, x: "70%", y: "66%", size: 32, rotate: -50, delay: 0.9, duration: 11, drift: -12 },
  { icon: Settings, x: "90%", y: "72%", size: 36, rotate: 25, delay: 1.6, duration: 9, drift: 10 },

  // --- Row 5: bottom ---
  { icon: Lightbulb, x: "12%", y: "88%", size: 32, rotate: -30, delay: 2.4, duration: 10, drift: -8 },
  { icon: Puzzle, x: "38%", y: "90%", size: 40, rotate: 20, delay: 0.2, duration: 8, drift: 12 },
  { icon: BarChart3, x: "60%", y: "86%", size: 34, rotate: -12, delay: 1.1, duration: 9, drift: -14 },
  { icon: Puzzle, x: "82%", y: "92%", size: 30, rotate: 40, delay: 1.7, duration: 11, drift: 10 },
  { icon: Orbit, x: "95%", y: "88%", size: 38, rotate: -5, delay: 2.8, duration: 7, drift: -12 },
];

type Variant = "full" | "medium" | "sparse";

const variantIndices: Record<Variant, number[]> = {
  full: Array.from({ length: allDecorations.length }, (_, i) => i),
  medium: [0, 2, 4, 5, 8, 10, 12, 15, 17, 19, 21, 23, 24],
  sparse: [0, 4, 6, 10, 14, 16, 20, 24],
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
              opacity: [0.45, 0.6, 0.45, 0.55, 0.45],
              y: [0, d.drift, -d.drift * 0.6, d.drift * 0.4, 0],
              rotate: [d.rotate, d.rotate + 10, d.rotate - 6, d.rotate],
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
              strokeWidth={1.6}
              style={{
                filter: "drop-shadow(0 0 12px hsl(22 68% 86% / 0.5)) drop-shadow(0 0 24px hsl(22 68% 86% / 0.2))",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingDecorations;
