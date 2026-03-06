import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

import dollar from "@/assets/float-3d-dollar.png";
import stockchart from "@/assets/float-3d-stockchart.png";
import piggybank from "@/assets/float-3d-piggybank.png";
import calculator from "@/assets/float-3d-calculator.png";
import idea from "@/assets/float-3d-idea.png";
import trophy from "@/assets/float-3d-trophy.png";
import handshake from "@/assets/float-3d-handshake.png";
import barchart from "@/assets/float-3d-barchart.png";
import briefcase from "@/assets/float-3d-briefcase.png";

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
  { src: dollar, alt: "Dollar", size: 64, x: "8%", y: "18%", delay: 0, duration: 5 },
  { src: stockchart, alt: "Stock Chart", size: 72, x: "85%", y: "12%", delay: 0.8, duration: 6 },
  { src: piggybank, alt: "Piggy Bank", size: 68, x: "78%", y: "72%", delay: 1.4, duration: 5.5 },
  
  { src: idea, alt: "Idea", size: 64, x: "90%", y: "42%", delay: 1, duration: 5.8 },
  { src: trophy, alt: "Trophy", size: 56, x: "5%", y: "45%", delay: 1.8, duration: 6.2 },
  { src: handshake, alt: "Handshake", size: 60, x: "50%", y: "15%", delay: 0.3, duration: 5.4 },
  
  { src: briefcase, alt: "Briefcase", size: 58, x: "65%", y: "50%", delay: 0.7, duration: 5.2 },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  freed: boolean;
  size: number;
}

const FRICTION = 0.985;
const BOUNCE_DAMPING = 0.7;
const COLLISION_FORCE = 4;
const MIN_VELOCITY = 0.05;

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatTweens = useRef<gsap.core.Tween[]>([]);
  const elRefs = useRef<HTMLImageElement[]>([]);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef<number>(0);

  // Physics loop
  const tick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    particles.current.forEach((p, i) => {
      if (!p.freed) return;

      // Apply friction
      p.vx *= FRICTION;
      p.vy *= FRICTION;
      p.vr *= FRICTION;

      // Stop if barely moving
      if (Math.abs(p.vx) < MIN_VELOCITY && Math.abs(p.vy) < MIN_VELOCITY) {
        p.vx = 0;
        p.vy = 0;
        p.vr = 0;
      }

      // Move
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vr;

      // Wall bounce
      const halfW = p.size / 2;
      if (p.x - halfW < 0) { p.x = halfW; p.vx = Math.abs(p.vx) * BOUNCE_DAMPING; }
      if (p.x + halfW > bounds.width) { p.x = bounds.width - halfW; p.vx = -Math.abs(p.vx) * BOUNCE_DAMPING; }
      if (p.y - halfW < 0) { p.y = halfW; p.vy = Math.abs(p.vy) * BOUNCE_DAMPING; }
      if (p.y + halfW > bounds.height) { p.y = bounds.height - halfW; p.vy = -Math.abs(p.vy) * BOUNCE_DAMPING; }

      // Collision with other particles
      particles.current.forEach((other, j) => {
        if (j <= i) return;
        const dx = other.x - p.x;
        const dy = other.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = (p.size + other.size) / 2;

        if (dist < minDist && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;

          // Separate
          p.x -= nx * overlap * 0.5;
          p.y -= ny * overlap * 0.5;
          other.x += nx * overlap * 0.5;
          other.y += ny * overlap * 0.5;

          // Transfer velocity
          const relVx = p.vx - other.vx;
          const relVy = p.vy - other.vy;
          const dot = relVx * nx + relVy * ny;

          if (dot > 0) {
            const impulse = dot * COLLISION_FORCE * 0.25;
            p.vx -= nx * impulse;
            p.vy -= ny * impulse;
            other.vx += nx * impulse;
            other.vy += ny * impulse;
            other.vr += (Math.random() - 0.5) * 3;

            // Free the other element if hit hard enough
            if (!other.freed && Math.sqrt(other.vx ** 2 + other.vy ** 2) > 1) {
              other.freed = true;
              floatTweens.current[j]?.kill();
              gsap.killTweensOf(elRefs.current[j]);
            }
          }
        }
      });

      // Apply to DOM
      const el = elRefs.current[i];
      if (el) {
        el.style.left = `${p.x - p.size / 2}px`;
        el.style.top = `${p.y - p.size / 2}px`;
        el.style.transform = `rotate(${p.rotation}deg)`;
      }
    });

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const els = container.querySelectorAll<HTMLImageElement>(".float-item");
    elRefs.current = Array.from(els);
    const bounds = container.getBoundingClientRect();

    // Initialize particles at their CSS positions
    particles.current = items.map((item) => {
      const xPct = parseFloat(item.x) / 100;
      const yPct = parseFloat(item.y) / 100;
      return {
        x: xPct * bounds.width,
        y: yPct * bounds.height,
        vx: 0,
        vy: 0,
        rotation: 0,
        vr: 0,
        freed: false,
        size: item.size,
      };
    });

    // Start idle float animations
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

    // Start physics loop
    rafId.current = requestAnimationFrame(tick);

    return () => {
      tweens.forEach((t) => t.kill());
      cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLImageElement>, index: number) => {
    const el = e.currentTarget;
    const p = particles.current[index];
    if (!p) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = centerX - e.clientX;
    const dy = centerY - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const force = 12 + Math.random() * 6;

    if (!p.freed) {
      // First click: free from idle animation, sync position
      p.freed = true;
      floatTweens.current[index]?.kill();
      gsap.killTweensOf(el);

      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        p.x = centerX - containerRect.left;
        p.y = centerY - containerRect.top;
      }

      // Set visible
      gsap.set(el, { opacity: 0.55, scale: 1, clearProps: "x,y,rotation" });
    }

    // Apply velocity in push direction
    p.vx += (dx / dist) * force;
    p.vy += (dy / dist) * force;
    p.vr += (Math.random() - 0.5) * 8;

    // Bounce scale feedback
    gsap.fromTo(el, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
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
