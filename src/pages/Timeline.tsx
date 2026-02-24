import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import { RefreshCw, Trophy, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const timelineEvents = [
  { id: 1, title: "Round 1", date: "May 24th - 26th", position: "top", icon: Calendar, isBringBack: false },
  { id: 2, title: "Round 2", date: "May 28th - June 4th", position: "bottom", icon: Calendar, isBringBack: false },
  { id: 3, title: "Bring-Back Round 1", date: "June 6th - 13th", position: "top", icon: RefreshCw, isBringBack: true },
  { id: 4, title: "Round 3", date: "June 15th", position: "bottom", icon: Calendar, isBringBack: false },
  { id: 5, title: "Bring-Back Round 2", date: "June 17th - 24th", position: "top", icon: RefreshCw, isBringBack: true },
  { id: 6, title: "Final Round", date: "June 30th", position: "bottom", icon: Trophy, isBringBack: false },
  { id: 7, title: "Results Day", date: "July 10th", position: "top", icon: Trophy, isBringBack: false, isResults: true },
];

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const buildCurvePath = useCallback(() => {
    const container = document.querySelector(".timeline-container") as HTMLElement;
    const dots = gsap.utils.toArray<HTMLElement>(".timeline-section .timeline-dot");
    if (!container || dots.length < 2) return "";

    const cRect = container.getBoundingClientRect();
    const points = dots.map((dot) => {
      const r = dot.getBoundingClientRect();
      return {
        x: r.left - cRect.left + r.width / 2,
        y: r.top - cRect.top + r.height / 2,
      };
    });

    // Build a smooth cubic bezier curve through all points
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const midY = (curr.y + next.y) / 2;
      // Curve outward for a serpentine feel
      const curveOffset = (i % 2 === 0 ? 1 : -1) * 60;
      const cp1x = curr.x + curveOffset;
      const cp1y = midY;
      const cp2x = next.x - curveOffset;
      const cp2y = midY;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }
    return d;
  }, []);

  useEffect(() => {
    // Small delay to ensure layout is settled
    const initTimeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate each timeline-item: fade in + slide up
        gsap.utils.toArray<HTMLElement>(".timeline-section .timeline-item").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Animate timeline dots
        gsap.utils.toArray<HTMLElement>(".timeline-section .timeline-dot").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Build curve path through dots
        const pathD = buildCurvePath();
        if (!pathD || !curvePathRef.current || !svgRef.current) return;

        const container = document.querySelector(".timeline-container") as HTMLElement;
        if (!container) return;

        // Set SVG dimensions to match container
        const cRect = container.getBoundingClientRect();
        svgRef.current.setAttribute("viewBox", `0 0 ${cRect.width} ${cRect.height}`);
        svgRef.current.style.width = `${cRect.width}px`;
        svgRef.current.style.height = `${cRect.height}px`;

        curvePathRef.current.setAttribute("d", pathD);

        // Draw the path progressively
        const pathLength = curvePathRef.current.getTotalLength();
        gsap.set(curvePathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(curvePathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        });

        // Magnetic indicator: snaps to each dot with dwell time
        const indicator = indicatorRef.current;
        const dots = gsap.utils.toArray<HTMLElement>(".timeline-section .timeline-dot");
        if (!indicator || dots.length === 0) return;

        const dotCount = dots.length;
        // Each segment: 70% travel, 30% dwell (stick to dot)
        const travelRatio = 0.65;
        const dwellRatio = 0.35;
        const segmentDuration = 1;

        const magnetTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        });

        // Position at first dot
        const getDotPos = (dot: HTMLElement) => {
          const dotR = dot.getBoundingClientRect();
          const contR = container.getBoundingClientRect();
          return {
            x: dotR.left - contR.left + dotR.width / 2,
            y: dotR.top - contR.top + dotR.height / 2,
          };
        };

        const firstPos = getDotPos(dots[0]);
        gsap.set(indicator, {
          top: firstPos.y,
          left: firstPos.x,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
        });

        // Initial dwell on first dot
        magnetTl.to(indicator, {
          duration: dwellRatio * segmentDuration,
          scale: 1.15,
          ease: "sine.inOut",
        });

        for (let i = 1; i < dotCount; i++) {
          const targetDot = dots[i];

          // Travel phase: leave current dot with resistance, accelerate toward next
          magnetTl.to(indicator, {
            duration: travelRatio * segmentDuration,
            top: () => getDotPos(targetDot).y,
            left: () => getDotPos(targetDot).x,
            scale: 0.6,
            ease: "slow(0.5, 0.8, false)", // slow start (resistance), fast end (attraction)
            onUpdate: function () {
              const p = this.progress();
              // Dim glow during travel, brighten on approach
              const intensity = p < 0.4 ? 0.3 : 0.3 + (p - 0.4) * (1.17 / 0.6);
              indicator.style.boxShadow = `0 0 ${12 * intensity}px ${4 * intensity}px hsl(var(--primary) / ${0.4 * intensity}), 0 0 ${24 * intensity}px ${8 * intensity}px hsl(var(--primary) / ${0.15 * intensity})`;
            },
          });

          // Dwell phase: snap onto dot, scale up, glow bright — STAY here
          magnetTl.to(indicator, {
            duration: dwellRatio * segmentDuration,
            scale: 1.15,
            ease: "elastic.out(1.2, 0.4)",
            onStart: () => {
              // Flash glow on snap
              indicator.style.boxShadow = `0 0 20px 8px hsl(var(--primary) / 0.6), 0 0 40px 16px hsl(var(--primary) / 0.25)`;
            },
            onComplete: () => {
              indicator.style.boxShadow = `0 0 12px 4px hsl(var(--primary) / 0.4), 0 0 24px 8px hsl(var(--primary) / 0.15)`;
            },
          });
        }
      }, timelineRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(initTimeout);
  }, [buildCurvePath]);

  return (
    <div className="min-h-screen bg-background" ref={timelineRef}>
      <Navigation />
      <Breadcrumbs />

      <section className="pt-8 pb-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Timeline</p>
              <h1 className="section-headline mb-8">Competition Timeline</h1>
              <p className="body-large">
                Key dates and milestones for VentureCapsule 2025. Learn about the <Link to="/structure" className="text-primary hover:underline">round-based competition structure</Link> and choose your <Link to="/subsections" className="text-primary hover:underline">pathway</Link>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="timeline-section py-16">
        <div className="section-container">
          <div className="timeline timeline-container relative max-w-2xl mx-auto">
            {/* Curvy SVG path connecting dots */}
            <svg
              ref={svgRef}
              className="absolute top-0 left-0 pointer-events-none z-0 overflow-visible"
              fill="none"
            >
              <path
                ref={curvePathRef}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeOpacity="0.25"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Magnetic indicator */}
            <div
              ref={indicatorRef}
              className="moving-indicator absolute w-5 h-5 rounded-full z-30 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                boxShadow: '0 0 12px 4px hsl(var(--primary) / 0.4), 0 0 24px 8px hsl(var(--primary) / 0.15)',
              }}
            />

            <div className="space-y-8">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isEven = index % 2 === 0;
                return (
                  <div key={event.id} className="timeline-item timeline-event">
                    <div className={`flex items-center gap-6 md:gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className={`flex-1 ml-16 md:ml-0 ${isEven ? "md:text-right" : "md:text-left"}`}>
                        <div className={`glass-card p-6 inline-block w-full md:w-auto md:min-w-64 ${event.isResults ? "border-primary/50 ring-2 ring-primary/20" : ""} ${isEven ? "md:ml-auto" : "md:mr-auto"}`}>
                          <div className={`flex items-center gap-3 mb-2 ${isEven ? "md:flex-row-reverse" : ""}`}>
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${event.isBringBack ? "bg-accent text-accent-foreground" : event.isResults ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-display font-semibold text-lg">{event.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                      <div className={`timeline-dot absolute left-6 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-3 z-10 ${event.isResults ? "bg-primary border-primary" : event.isBringBack ? "bg-accent border-accent" : "bg-background border-primary"}`} style={{ borderWidth: '3px' }} />
                      <div className="hidden md:block flex-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="section-container">
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/10 border-2 border-primary" />
                <span className="text-muted-foreground text-xs">Main Rounds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted-foreground text-xs">Bring-Back Rounds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground text-xs">Results</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Timeline;
