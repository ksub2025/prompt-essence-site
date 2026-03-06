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
  const elRefs = useRef<HTMLImageElement[]>([]);
  const busyRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll<HTMLImageElement>(".float-item");
    elRefs.current = Array.from(els);

    const tweens = elRefs.current.map((el, i) => {
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

  const getCenter = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, w: rect.width };
  };

  const launchElement = useCallback((index: number, pushX: number, pushY: number, spin: number) => {
    const el = elRefs.current[index];
    if (!el || busyRef.current.has(index)) return;

    busyRef.current.add(index);
    floatTweens.current[index]?.pause();

    gsap.to(el, {
      x: `+=${pushX}`,
      y: `+=${pushY}`,
      rotation: `+=${spin}`,
      scale: 1.15,
      duration: 0.35,
      ease: "power2.out",
      onUpdate: () => checkCollisions(index),
      onComplete: () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.6,
          ease: "elastic.out(1, 0.35)",
          onComplete: () => {
            busyRef.current.delete(index);
            floatTweens.current[index]?.resume();
          },
        });
      },
    });
  }, []);

  const checkCollisions = useCallback((movedIndex: number) => {
    const movedEl = elRefs.current[movedIndex];
    if (!movedEl) return;
    const movedCenter = getCenter(movedEl);

    elRefs.current.forEach((otherEl, j) => {
      if (j === movedIndex || busyRef.current.has(j)) return;

      const otherCenter = getCenter(otherEl);
      const dx = otherCenter.x - movedCenter.x;
      const dy = otherCenter.y - movedCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = (movedCenter.w + otherCenter.w) / 2;

      if (dist < minDist && dist > 0) {
        // Collision! Push the other element away
        const force = 80 + Math.random() * 40;
        const nx = dx / dist;
        const ny = dy / dist;
        const spin = (Math.random() - 0.5) * 270;
        launchElement(j, nx * force, ny * force, spin);
      }
    });
  }, [launchElement]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLImageElement>, index: number) => {
    const el = e.currentTarget;
    const center = getCenter(el);

    const dx = center.x - e.clientX;
    const dy = center.y - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const force = 140 + Math.random() * 60;
    const pushX = (dx / dist) * force;
    const pushY = (dy / dist) * force;
    const spin = (Math.random() - 0.5) * 360;

    // Reset busy state so we can re-launch
    busyRef.current.delete(index);
    gsap.killTweensOf(el);

    launchElement(index, pushX, pushY, spin);
  }, [launchElement]);

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
