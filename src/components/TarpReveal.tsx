import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TarpReveal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tarpRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

      // Tarp lifts up with 3D rotation
      tl.to(tarpRef.current, {
        yPercent: -110,
        rotationX: 8,
        ease: "power2.inOut",
      });

      // Tarp scales slightly for gravity effect
      tl.to(
        tarpRef.current,
        {
          scaleY: 0.92,
          transformOrigin: "top",
          ease: "power1.in",
        },
        "<"
      );

      // Title spans reveal with 3D depth
      tl.from(
        ".reveal-title span",
        {
          y: 80,
          rotationX: -45,
          z: -200,
          opacity: 0,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.2"
      );

      // Title settles into place
      tl.to(".reveal-title", {
        rotationX: 0,
        z: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh] bg-background overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* The Tarp */}
      <div
        ref={tarpRef}
        className="absolute inset-0 z-30"
        style={{
          background: "#8B1E1E",
          transformOrigin: "top",
        }}
      >
        {/* Gradient shadow on tarp */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)",
          }}
        />
      </div>

      {/* The Reveal Title */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1
          ref={titleRef}
          className="reveal-title text-center font-headline"
          style={{
            fontSize: "clamp(3rem, 6vw, 6rem)",
            transformStyle: "preserve-3d",
          }}
        >
          <span className="block text-foreground">Venture Capsule</span>
          <span className="block text-primary">is revealed</span>
        </h1>
      </div>
    </section>
  );
};

export default TarpReveal;
