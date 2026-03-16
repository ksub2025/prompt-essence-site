import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import chessKing from "@/assets/hero-chess-king.png";

const FloatingElements = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    const el = imgRef.current;

    gsap.set(el, { opacity: 0, y: 40 });
    gsap.to(el, { opacity: 0.85, y: 0, duration: 1.4, delay: 0.6, ease: "power3.out" });
    gsap.to(el, {
      y: "-=10",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2,
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <img
        ref={imgRef}
        src={chessKing}
        alt="Chess King — Strategy & Leadership"
        draggable={false}
        className="absolute opacity-0 drop-shadow-2xl"
        style={{
          width: "clamp(220px, 28vw, 420px)",
          height: "auto",
          bottom: "2%",
          left: "3%",
          objectFit: "contain",
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.45))",
        }}
      />
    </div>
  );
};

export default FloatingElements;
