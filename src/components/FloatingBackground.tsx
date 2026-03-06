import { useEffect, useRef, useMemo } from "react";
import float3dGoldbar from "@/assets/float-3d-goldbar.png";
import float3dChart from "@/assets/float-3d-chart.png";
import float3dDiamond from "@/assets/float-3d-diamond.png";
import float3dCoin from "@/assets/float-3d-coin.png";
import float3dRocket from "@/assets/float-3d-rocket.png";
import float3dBulb from "@/assets/float-3d-bulb.png";

const allImages = [
  { src: float3dGoldbar, alt: "Gold bar" },
  { src: float3dChart, alt: "Growth chart" },
  { src: float3dDiamond, alt: "Diamond" },
  { src: float3dCoin, alt: "Dollar coin" },
  { src: float3dRocket, alt: "Rocket" },
  { src: float3dBulb, alt: "Innovation bulb" },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

interface PlacedElement {
  src: string;
  alt: string;
  top: number; // vh
  left: number; // vw
  size: number; // px
  rotate: number;
  delay: number;
  duration: number;
}

function generateElements(count: number): PlacedElement[] {
  const seed = Math.floor(Math.random() * 100000);
  const rand = seededRandom(seed);
  const elements: PlacedElement[] = [];

  // Divide the vertical space into rows, place elements avoiding overlap
  const rowHeight = (count > 0) ? Math.max(8, 300 / count) : 20; // vh per element roughly

  for (let i = 0; i < count; i++) {
    const img = allImages[i % allImages.length];
    const row = i;
    const topMin = row * rowHeight;
    const topMax = topMin + rowHeight - 5;
    const top = topMin + rand() * (topMax - topMin);

    // Alternate sides with randomness
    const side = rand();
    let left: number;
    if (side < 0.35) {
      left = rand() * 12; // left edge 0-12vw
    } else if (side > 0.65) {
      left = 88 + rand() * 10; // right edge 88-98vw
    } else {
      // Sometimes middle-ish but offset
      left = 15 + rand() * 70;
    }

    const size = 48 + rand() * 40; // 48-88px
    const rotate = -25 + rand() * 50; // -25 to +25 deg
    const delay = rand() * 4000;
    const duration = 8000 + rand() * 6000;

    elements.push({
      src: img.src,
      alt: img.alt,
      top,
      left,
      size,
      rotate,
      delay,
      duration,
    });
  }

  return elements;
}

interface FloatingBackgroundProps {
  density?: "low" | "medium" | "full";
}

const FloatingBackground = ({ density = "full" }: FloatingBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = density === "low" ? 12 : density === "medium" ? 18 : 28;

  // Generate random positions once per mount (randomized each page load/login)
  const elements = useMemo(() => generateElements(count), [count]);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll<HTMLImageElement>(".float-3d");
    const animations: Animation[] = [];

    els.forEach((el, i) => {
      const elem = elements[i];
      if (!elem) return;

      const yRange = 15 + (i % 4) * 6;
      const xRange = 5 + (i % 3) * 4;

      const anim = el.animate(
        [
          { transform: `rotate(${elem.rotate}deg) translate(0, 0) scale(1)` },
          { transform: `rotate(${elem.rotate + 4}deg) translate(${xRange}px, -${yRange}px) scale(1.06)` },
          { transform: `rotate(${elem.rotate - 3}deg) translate(-${xRange}px, ${yRange / 2}px) scale(0.96)` },
          { transform: `rotate(${elem.rotate}deg) translate(0, 0) scale(1)` },
        ],
        {
          duration: elem.duration,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: elem.delay,
        }
      );
      animations.push(anim);
    });

    return () => animations.forEach((a) => a.cancel());
  }, [elements]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ minHeight: "100%" }}
    >
      {elements.map((elem, i) => (
        <img
          key={`${elem.alt}-${i}`}
          src={elem.src}
          alt=""
          className="float-3d absolute select-none drop-shadow-xl"
          style={{
            top: `${elem.top}vh`,
            left: `${elem.left}vw`,
            width: elem.size,
            height: elem.size,
            objectFit: "contain",
            opacity: 0.45,
            transform: `rotate(${elem.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;
