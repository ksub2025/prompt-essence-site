import { useEffect, useRef } from "react";
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

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".float-item", { opacity: 0, scale: 0.7 });
      items.forEach((item, i) => {
        const el = containerRef.current?.querySelectorAll(".float-item")[i];
        if (!el) return;
        gsap.to(el, { opacity: 0.55, scale: 1, duration: 1.2, delay: item.delay, ease: "power2.out" });
        gsap.to(el, {
          y: "random(-12, 12)",
          x: "random(-8, 8)",
          duration: item.duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: item.delay,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {items.map((item) => (
        <img
          key={item.alt}
          src={item.src}
          alt={item.alt}
          className="float-item absolute opacity-0 drop-shadow-md"
          draggable={false}
          style={{
            width: item.size,
            height: item.size,
            left: item.x,
            top: item.y,
            objectFit: "contain",
            filter: "brightness(0) saturate(100%)",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
