import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VaultReveal = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500",
          scrub: true,
          pin: true,
        },
      });

      // Doors opening simultaneously
      tl.to(".door-left", {
        rotationY: -14,
        ease: "power2.inOut",
      }, 0);

      tl.to(".door-right", {
        rotationY: 14,
        ease: "power2.inOut",
      }, 0);

      // Title emergence with 3D depth
      tl.from(
        ".vault-title span",
        {
          y: 60,
          rotationX: -25,
          z: -120,
          opacity: 0,
          stagger: 0.2,
          ease: "power3.out",
        },
        0.15
      );

      // Final settle
      tl.to(".vault-title", {
        rotationX: 0,
        z: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[130vh] overflow-hidden bg-background"
      style={{ perspective: "1200px" }}
    >
      {/* Vault doors container */}
      <div className="absolute inset-0 z-30 flex">
        {/* Left door */}
        <div
          className="door-left flex-1"
          style={{
            background: "linear-gradient(to bottom, #7A1818, #8B1E1E)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.25), 0 40px 80px rgba(0,0,0,0.25)",
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
          }}
        />
        {/* Right door */}
        <div
          className="door-right flex-1"
          style={{
            background: "linear-gradient(to bottom, #7A1818, #8B1E1E)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.25), 0 40px 80px rgba(0,0,0,0.25)",
            transformStyle: "preserve-3d",
            transformOrigin: "right center",
          }}
        />
        {/* Center seam */}
        <div
          className="absolute left-1/2 top-0 h-full w-[2px] z-40"
          style={{
            background: "rgba(0,0,0,0.3)",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Title behind the vault doors */}
      <div className="absolute inset-0 z-10 grid place-items-center">
        <h1
          className="vault-title text-center font-headline text-foreground"
          style={{
            fontSize: "clamp(3rem, 6vw, 6rem)",
            transformStyle: "preserve-3d",
          }}
        >
          <span className="block">Venture Capsule</span>
          <span className="block text-primary">is revealed</span>
        </h1>
      </div>
    </section>
  );
};

export default VaultReveal;
