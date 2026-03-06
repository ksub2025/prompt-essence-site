import { useEffect, useRef } from "react";
import floatChart from "@/assets/float-chart.png";
import floatCoins from "@/assets/float-coins.png";
import floatHandshake from "@/assets/float-handshake.png";
import floatBriefcase from "@/assets/float-briefcase.png";
import floatGlobe from "@/assets/float-globe.png";
import floatInnovation from "@/assets/float-innovation.png";

const images = [
  { src: floatChart, alt: "Stock chart" },
  { src: floatCoins, alt: "Gold coins" },
  { src: floatHandshake, alt: "Business handshake" },
  { src: floatBriefcase, alt: "Briefcase" },
  { src: floatGlobe, alt: "Global economy" },
  { src: floatInnovation, alt: "Innovation" },
];

// Fixed positions to avoid overlap, spread across the viewport
const positions = [
  { top: "8%", left: "5%", size: 90 },
  { top: "15%", right: "6%", size: 80 },
  { top: "45%", left: "3%", size: 75 },
  { top: "55%", right: "4%", size: 85 },
  { top: "78%", left: "7%", size: 70 },
  { top: "82%", right: "8%", size: 80 },
];

interface FloatingBackgroundProps {
  /** Show fewer images for smaller pages */
  density?: "low" | "medium" | "full";
}

const FloatingBackground = ({ density = "full" }: FloatingBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const count = density === "low" ? 3 : density === "medium" ? 4 : 6;
  const visibleImages = images.slice(0, count);
  const visiblePositions = positions.slice(0, count);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll<HTMLImageElement>(".float-img");
    const animations: Animation[] = [];

    els.forEach((el, i) => {
      const dur = 12000 + i * 3000;
      const yRange = 18 + (i % 3) * 6;
      const xRange = 8 + (i % 2) * 5;

      const anim = el.animate(
        [
          { transform: `translate(0, 0) rotate(0deg)` },
          { transform: `translate(${xRange}px, -${yRange}px) rotate(${2 + i}deg)` },
          { transform: `translate(-${xRange / 2}px, ${yRange / 2}px) rotate(-${1 + i}deg)` },
          { transform: `translate(0, 0) rotate(0deg)` },
        ],
        {
          duration: dur,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: i * 1500,
        }
      );
      animations.push(anim);
    });

    return () => animations.forEach((a) => a.cancel());
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {visibleImages.map((img, i) => {
        const pos = visiblePositions[i];
        return (
          <img
            key={img.alt}
            src={img.src}
            alt=""
            className="float-img absolute opacity-[0.06] select-none"
            style={{
              top: pos.top,
              left: (pos as any).left,
              right: (pos as any).right,
              width: pos.size,
              height: pos.size,
              objectFit: "contain",
              filter: "grayscale(40%) blur(0.5px)",
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingBackground;
