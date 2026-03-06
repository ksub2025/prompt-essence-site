import { useEffect, useRef, useCallback } from "react";
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
  const floatTweens = useRef<gsap.core.Tween[]>([]);

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

    floatTweens.current = tweens;
    return () => tweens.forEach((t) => t.kill());
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLImageElement>, index: number) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Direction from click point to element center = push direction
    const dx = centerX - e.clientX;
    const dy = centerY - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Normalize and scale the push force
    const force = 120 + Math.random() * 60;
    const pushX = (dx / dist) * force;
    const pushY = (dy / dist) * force;
    const spin = (Math.random() - 0.5) * 360;

    // Pause the idle float
    floatTweens.current[index]?.pause();

    // Bounce away
    gsap.to(el, {
      x: `+=${pushX}`,
      y: `+=${pushY}`,
      rotation: `+=${spin}`,
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Bounce back with elastic ease
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.4)",
          onComplete: () => {
            // Resume idle float
            floatTweens.current[index]?.resume();
          },
        });
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item, i) => (
        <img
          key={item.alt}
          src={item.src}
          alt={item.alt}
          onClick={(e) => handleClick(e, i)}
          className="float-item absolute opacity-0 brightness-0 invert sepia saturate-[0.3] hue-rotate-[340deg] pointer-events-auto cursor-pointer select-none"
          draggable={false}
          style={{
            width: item.size,
            height: item.size,
            left: item.x,
            top: item.y,
            objectFit: "contain",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
