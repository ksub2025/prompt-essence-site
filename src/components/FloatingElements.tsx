import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import dollar from "@/assets/float-3d-dollar.png";
import stockchart from "@/assets/float-3d-stockchart.png";
import calculator from "@/assets/float-3d-calculator.png";
import idea from "@/assets/float-3d-idea.png";
import trophy from "@/assets/float-3d-trophy.png";
import handshake from "@/assets/float-3d-handshake.png";
import briefcase from "@/assets/float-3d-briefcase.png";
import barchart from "@/assets/float-3d-barchart.png";
import coin from "@/assets/float-3d-coin.png";
import diamond from "@/assets/float-3d-diamond.png";
import goldbar from "@/assets/float-3d-goldbar.png";
import rocket from "@/assets/float-3d-rocket.png";
import chart from "@/assets/float-3d-chart.png";

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
  { src: stockchart, alt: "Stock Chart", size: 72, x: "85%", y: "12%", delay: 0.8, duration: 6 },
  { src: idea, alt: "Idea", size: 64, x: "90%", y: "42%", delay: 1, duration: 5.8 },
  { src: trophy, alt: "Trophy", size: 56, x: "5%", y: "45%", delay: 1.8, duration: 6.2 },
  { src: handshake, alt: "Handshake", size: 60, x: "50%", y: "15%", delay: 0.3, duration: 5.4 },
  { src: briefcase, alt: "Briefcase", size: 58, x: "65%", y: "50%", delay: 0.7, duration: 5.2 },
  { src: barchart, alt: "Bar Chart", size: 66, x: "75%", y: "35%", delay: 0.5, duration: 5.3 },
  { src: rocket, alt: "Rocket", size: 58, x: "92%", y: "68%", delay: 0.4, duration: 5.1 },
  { src: chart, alt: "Chart", size: 54, x: "55%", y: "78%", delay: 2.0, duration: 6.3 },
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
            filter: "brightness(0) invert(1) drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black)",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
