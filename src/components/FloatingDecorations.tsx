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
  // Subsection symbols
  { icon: Lightbulb, x: "8%", y: "15%", size: 28, rotate: -15, delay: 0, duration: 8, drift: 12 },
  { icon: BarChart3, x: "88%", y: "22%", size: 24, rotate: 10, delay: 1.5, duration: 9, drift: -10 },
  { icon: Settings, x: "5%", y: "55%", size: 22, rotate: 20, delay: 0.8, duration: 10, drift: 14 },
  { icon: Orbit, x: "92%", y: "60%", size: 26, rotate: -8, delay: 2, duration: 7, drift: -12 },
  // Puzzle pieces
  { icon: Puzzle, x: "15%", y: "35%", size: 20, rotate: 25, delay: 0.5, duration: 11, drift: -8 },
  { icon: Puzzle, x: "82%", y: "42%", size: 18, rotate: -30, delay: 1.2, duration: 9, drift: 10 },
  { icon: Puzzle, x: "10%", y: "78%", size: 22, rotate: 45, delay: 1.8, duration: 8, drift: -14 },
  { icon: Puzzle, x: "90%", y: "82%", size: 16, rotate: -20, delay: 2.5, duration: 10, drift: 8 },
  // Extra subsection accents
  { icon: Lightbulb, x: "78%", y: "88%", size: 18, rotate: 12, delay: 3, duration: 9, drift: -6 },
  { icon: BarChart3, x: "20%", y: "92%", size: 20, rotate: -22, delay: 2.2, duration: 8, drift: 10 },
];

type Variant = "full" | "sparse" | "hero";

const variantIndices: Record<Variant, number[]> = {
  full: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  sparse: [0, 3, 4, 7],
  hero: [0, 1, 2, 3, 5, 6],
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
              opacity: [0, 0.12, 0.08, 0.12, 0],
              y: [0, d.drift, -d.drift * 0.6, d.drift * 0.4, 0],
              rotate: [d.rotate, d.rotate + 8, d.rotate - 4, d.rotate],
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
              strokeWidth={1.2}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingDecorations;
