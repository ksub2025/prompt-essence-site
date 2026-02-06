import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VaultReveal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleSpan1Ref = useRef<HTMLSpanElement>(null);
  const titleSpan2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Ensure all refs are available
    if (
      !sectionRef.current ||
      !leftDoorRef.current ||
      !rightDoorRef.current ||
      !titleRef.current ||
      !titleSpan1Ref.current ||
      !titleSpan2Ref.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      // Doors opening simultaneously
      tl.to(
        leftDoorRef.current,
        {
          rotationY: -14,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        rightDoorRef.current,
        {
          rotationY: 14,
          ease: "power2.inOut",
        },
        0
      );

      // Title emergence with 3D depth
      tl.from(
        [titleSpan1Ref.current, titleSpan2Ref.current],
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
      tl.to(
        titleRef.current,
        {
          rotationX: 0,
          z: 0,
          duration: 0.2,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
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
          ref={leftDoorRef}
          className="flex-1"
          style={{
            background: "linear-gradient(to bottom, #7A1818, #8B1E1E)",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.25), 0 40px 80px rgba(0,0,0,0.25)",
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
          }}
        />
        {/* Right door */}
        <div
          ref={rightDoorRef}
          className="flex-1"
          style={{
            background: "linear-gradient(to bottom, #7A1818, #8B1E1E)",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.25), 0 40px 80px rgba(0,0,0,0.25)",
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
          ref={titleRef}
          className="text-center font-headline text-foreground"
          style={{
            fontSize: "clamp(3rem, 6vw, 6rem)",
            transformStyle: "preserve-3d",
          }}
        >
          <span ref={titleSpan1Ref} className="block">
            Venture Capsule
          </span>
          <span ref={titleSpan2Ref} className="block text-primary">
            is revealed
          </span>
        </h1>
      </div>
    </section>
  );
};

export default VaultReveal;
