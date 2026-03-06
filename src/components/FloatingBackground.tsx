import { useEffect, useRef } from "react";
import float3dGoldbar from "@/assets/float-3d-goldbar.png";
import float3dChart from "@/assets/float-3d-chart.png";
import float3dDiamond from "@/assets/float-3d-diamond.png";
import float3dCoin from "@/assets/float-3d-coin.png";
import float3dRocket from "@/assets/float-3d-rocket.png";
import float3dBulb from "@/assets/float-3d-bulb.png";

const images = [
  { src: float3dGoldbar, alt: "Gold bar" },
  { src: float3dChart, alt: "Growth chart" },
  { src: float3dDiamond, alt: "Diamond" },
  { src: float3dCoin, alt: "Dollar coin" },
  { src: float3dRocket, alt: "Rocket" },
  { src: float3dBulb, alt: "Innovation bulb" },
];

const positions = [
  { top: "6%", left: "4%", size: 64, rotate: -12 },
  { top: "12%", right: "5%", size: 56, rotate: 8 },
  { top: "42%", left: "2%", size: 52, rotate: 15 },
  { top: "50%", right: "3%", size: 60, rotate: -6 },
  { top: "75%", left: "6%", size: 48, rotate: 10 },
  { top: "80%", right: "5%", size: 54, rotate: -18 },
];

interface FloatingBackgroundProps {
  density?: "low" | "medium" | "full";
}

const FloatingBackground = ({ density = "full" }: FloatingBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = density === "low" ? 3 : density === "medium" ? 4 : 6;
  const visibleImages = images.slice(0, count);
  const visiblePositions = positions.slice(0, count);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll<HTMLImageElement>(".float-3d");
    const animations: Animation[] = [];

    els.forEach((el, i) => {
      const dur = 10000 + i * 2500;
      const yRange = 20 + (i % 3) * 8;
      const baseRotate = visiblePositions[i]?.rotate ?? 0;

      const anim = el.animate(
        [
          { transform: `rotate(${baseRotate}deg) translate(0, 0) scale(1)` },
          { transform: `rotate(${baseRotate + 3}deg) translate(6px, -${yRange}px) scale(1.05)` },
          { transform: `rotate(${baseRotate - 2}deg) translate(-4px, ${yRange / 3}px) scale(0.97)` },
          { transform: `rotate(${baseRotate}deg) translate(0, 0) scale(1)` },
        ],
        {
          duration: dur,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: i * 1200,
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
            className="float-3d absolute select-none drop-shadow-lg"
            style={{
              top: pos.top,
              left: (pos as any).left,
              right: (pos as any).right,
              width: pos.size,
              height: pos.size,
              objectFit: "contain",
              opacity: 0.18,
              transform: `rotate(${pos.rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingBackground;
