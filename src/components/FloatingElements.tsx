import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";

import dollar from "@/assets/float-3d-dollar.png";
import stockchart from "@/assets/float-3d-stockchart.png";
import piggybank from "@/assets/float-3d-piggybank.png";
import idea from "@/assets/float-3d-idea.png";
import trophy from "@/assets/float-3d-trophy.png";
import handshake from "@/assets/float-3d-handshake.png";
import briefcase from "@/assets/float-3d-briefcase.png";

interface FloatingItem {
  src: string;
  alt: string;
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  depth: number; // 0 = far background, 1 = mid, 2 = foreground
}

const items: FloatingItem[] = [
  { src: dollar, alt: "Dollar", size: 64, x: "8%", y: "18%", delay: 0, duration: 5, depth: 2 },
  { src: stockchart, alt: "Stock Chart", size: 72, x: "85%", y: "12%", delay: 0.8, duration: 6, depth: 0 },
  { src: piggybank, alt: "Piggy Bank", size: 68, x: "78%", y: "72%", delay: 1.4, duration: 5.5, depth: 1 },
  { src: idea, alt: "Idea", size: 64, x: "90%", y: "42%", delay: 1, duration: 5.8, depth: 2 },
  { src: trophy, alt: "Trophy", size: 56, x: "5%", y: "45%", delay: 1.8, duration: 6.2, depth: 0 },
  { src: handshake, alt: "Handshake", size: 60, x: "50%", y: "15%", delay: 0.3, duration: 5.4, depth: 1 },
  { src: briefcase, alt: "Briefcase", size: 58, x: "65%", y: "50%", delay: 0.7, duration: 5.2, depth: 2 },
];

// Depth config: opacity, scale multiplier, parallax speed
const DEPTH_CONFIG = [
  { opacity: 0.25, scale: 0.75, parallax: 0.3 },  // far
  { opacity: 0.45, scale: 0.9, parallax: 0.6 },   // mid
  { opacity: 0.7, scale: 1.0, parallax: 1.0 },    // near
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
  depth: number;
}

const FRICTION = 0.985;
const BOUNCE_DAMPING = 0.7;
const COLLISION_FORCE = 4;
const MIN_VELOCITY = 0.05;
const MOUSE_REPEL_RADIUS = 150;
const MOUSE_REPEL_FORCE = 0.8;

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatTweens = useRef<gsap.core.Tween[]>([]);
  const elRefs = useRef<HTMLImageElement[]>([]);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef<number>(0);
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Track mouse position relative to container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = null;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Physics loop
  const tick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const bounds = container.getBoundingClientRect();
    const mouse = mousePos.current;

    particles.current.forEach((p, i) => {
      // Mouse proximity repulsion (works even on idle elements)
      if (mouse) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const depthConfig = DEPTH_CONFIG[p.depth];
        const effectiveRadius = MOUSE_REPEL_RADIUS * depthConfig.parallax;

        if (dist < effectiveRadius && dist > 0) {
          const strength = (1 - dist / effectiveRadius) * MOUSE_REPEL_FORCE * depthConfig.parallax;
          const nx = dx / dist;
          const ny = dy / dist;

          if (!p.freed) {
            // Gentle nudge for idle elements (don't free them)
            const el = elRefs.current[i];
            if (el) {
              gsap.to(el, {
                x: `+=${nx * strength * 3}`,
                y: `+=${ny * strength * 3}`,
                duration: 0.3,
                overwrite: "auto",
              });
            }
          } else {
            p.vx += nx * strength;
            p.vy += ny * strength;
          }
        }
      }

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

          p.x -= nx * overlap * 0.5;
          p.y -= ny * overlap * 0.5;
          other.x += nx * overlap * 0.5;
          other.y += ny * overlap * 0.5;

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
        el.style.transform = `rotate(${p.rotation}deg) scale(${DEPTH_CONFIG[p.depth].scale})`;
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
        depth: item.depth,
      };
    });

    // Start idle float animations with depth-based properties
    const tweens = elRefs.current.map((el, i) => {
      const item = items[i];
      const depthCfg = DEPTH_CONFIG[item.depth];
      const floatRange = 8 + item.depth * 6; // deeper layers move less

      gsap.set(el, { opacity: 0, scale: depthCfg.scale * 0.7 });
      gsap.to(el, {
        opacity: depthCfg.opacity,
        scale: depthCfg.scale,
        duration: 1.2,
        delay: item.delay,
        ease: "power2.out",
      });

      return gsap.to(el, {
        y: `random(-${floatRange}, ${floatRange})`,
        x: `random(-${floatRange * 0.6}, ${floatRange * 0.6})`,
        rotation: `random(-${4 + item.depth * 3}, ${4 + item.depth * 3})`,
        duration: item.duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: item.delay,
      });
    });

    floatTweens.current = tweens;
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
    const depthCfg = DEPTH_CONFIG[p.depth];

    if (!p.freed) {
      p.freed = true;
      floatTweens.current[index]?.kill();
      gsap.killTweensOf(el);

      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        p.x = centerX - containerRect.left;
        p.y = centerY - containerRect.top;
      }

      gsap.set(el, { opacity: depthCfg.opacity, scale: depthCfg.scale, clearProps: "x,y,rotation" });
    }

    p.vx += (dx / dist) * force;
    p.vy += (dy / dist) * force;
    p.vr += (Math.random() - 0.5) * 8;

    // Bounce + glow feedback
    gsap.fromTo(
      el,
      { scale: depthCfg.scale * 1.25, filter: "drop-shadow(0 0 12px hsl(22 68% 86% / 0.6))" },
      {
        scale: depthCfg.scale,
        filter: "drop-shadow(0 0 0px hsl(22 68% 86% / 0))",
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      style={{ pointerEvents: "none" }}
    >
      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <img
            key={item.alt}
            src={item.src}
            alt={item.alt}
            onClick={(e) => handleClick(e, i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="float-item absolute opacity-0 pointer-events-auto cursor-grab active:cursor-grabbing select-none transition-[filter] duration-300"
            draggable={false}
            style={{
              width: item.size,
              height: item.size,
              left: item.x,
              top: item.y,
              objectFit: "contain",
              filter: isHovered
                ? "drop-shadow(0 0 16px hsl(22 68% 86% / 0.5)) brightness(1.15)"
                : "drop-shadow(0 2px 8px hsl(245 34% 20% / 0.3)) brightness(0.9) sepia(0.2) hue-rotate(340deg)",
              zIndex: item.depth * 10,
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingElements;
