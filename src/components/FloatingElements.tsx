import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import coin from "@/assets/float-3d-coin.png";
import chart from "@/assets/float-3d-chart.png";
import goldbar from "@/assets/float-3d-goldbar.png";
import briefcase from "@/assets/float-briefcase.png";
import globe from "@/assets/float-globe.png";
import diamond from "@/assets/float-3d-diamond.png";

interface FloatingItem {
  src: string;
  alt: string;
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
}

const items: FloatingItem[] = [
  { src: coin, alt: "Coin", size: 64, x: "8%", y: "18%", delay: 0, duration: 5 },
  { src: chart, alt: "Chart", size: 72, x: "85%", y: "12%", delay: 0.8, duration: 6 },
  { src: goldbar, alt: "Gold bar", size: 56, x: "78%", y: "72%", delay: 1.4, duration: 5.5 },
  { src: briefcase, alt: "Briefcase", size: 60, x: "12%", y: "70%", delay: 0.5, duration: 6.5 },
  { src: globe, alt: "Globe", size: 52, x: "90%", y: "42%", delay: 1, duration: 5.8 },
  { src: diamond, alt: "Diamond", size: 48, x: "5%", y: "45%", delay: 1.8, duration: 6.2 },
];

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll<HTMLImageElement>(".float-item");

    const tweens = Array.from(els).map((el, i) => {
      const item = items[i];
      gsap.set(el, { opacity: 0, scale: 0.7 });
      gsap.to(el, { opacity: 0.55, scale: 1, duration: 1.2, delay: item.delay, ease: "power2.out" });

      return gsap.to(el, {
        y: "random(-18, 18)",
        x: "random(-10, 10)",
        rotation: "random(-8, 8)",
        duration: item.duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: item.delay,
      });
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <img
          key={item.alt}
          src={item.src}
          alt={item.alt}
          className="float-item absolute opacity-0"
          style={{
            width: item.size,
            height: item.size,
            left: item.x,
            top: item.y,
            objectFit: "contain",
          }}
          className="float-item absolute opacity-0 brightness-0 invert sepia saturate-[0.3] hue-rotate-[340deg]"
        />
      ))}
    </div>
  );
};

export default FloatingElements;
