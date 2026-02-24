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
  const trailPathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const buildCurvePath = useCallback((dots: HTMLElement[], container: HTMLElement) => {
    const cRect = container.getBoundingClientRect();
    const points = dots.map((dot) => {
      const r = dot.getBoundingClientRect();
      return {
        x: r.left - cRect.left + r.width / 2,
        y: r.top - cRect.top + r.height / 2,
      };
    });

    if (points.length < 2) return "";

    // Build smooth cubic bezier serpentine through all dot centers
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const dy = next.y - curr.y;
      // Alternate curve direction for serpentine feel
      const curveX = (i % 2 === 0 ? 1 : -1) * 80;
      const cp1x = curr.x + curveX;
      const cp1y = curr.y + dy * 0.4;
      const cp2x = next.x - curveX;
      const cp2y = next.y - dy * 0.4;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }
    return d;
  }, []);

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Fade in timeline items
        gsap.utils.toArray<HTMLElement>(".timeline-section .timeline-item").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
          });
        });

        // Pop in timeline dots
        gsap.utils.toArray<HTMLElement>(".timeline-section .timeline-dot").forEach((el) => {
          gsap.fromTo(el, { scale: 0 }, {
            scale: 1, duration: 0.4, ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          });
        });

        const container = document.querySelector(".timeline-container") as HTMLElement;
        const dots = gsap.utils.toArray<HTMLElement>(".timeline-section .timeline-dot");
        const indicator = indicatorRef.current;
        const curvePath = curvePathRef.current;
        const trailPath = trailPathRef.current;
        const svg = svgRef.current;

        if (!container || dots.length < 2 || !indicator || !curvePath || !trailPath || !svg) return;

        // Size SVG to container
        const cRect = container.getBoundingClientRect();
        svg.setAttribute("viewBox", `0 0 ${cRect.width} ${cRect.height}`);
        svg.style.width = `${cRect.width}px`;
        svg.style.height = `${cRect.height}px`;

        // Build and set the curvy path
        const pathD = buildCurvePath(dots, container);
        if (!pathD) return;
        curvePath.setAttribute("d", pathD);
        trailPath.setAttribute("d", pathD);

        // Draw trail path progressively (the "lit" portion following the indicator)
        const totalLength = trailPath.getTotalLength();
        gsap.set(trailPath, { strokeDasharray: totalLength, strokeDashoffset: totalLength });

        // Calculate snap points: fraction of path length at each dot
        const snapPoints: number[] = [];
        const pathEl = curvePath;
        const pathTotalLen = pathEl.getTotalLength();

        // Find the closest point on the path for each dot
        dots.forEach((dot) => {
          const dotR = dot.getBoundingClientRect();
          const dotX = dotR.left - cRect.left + dotR.width / 2;
          const dotY = dotR.top - cRect.top + dotR.height / 2;

          let closestLen = 0;
          let closestDist = Infinity;
          const steps = 200;
          for (let s = 0; s <= steps; s++) {
            const len = (s / steps) * pathTotalLen;
            const pt = pathEl.getPointAtLength(len);
            const dist = Math.hypot(pt.x - dotX, pt.y - dotY);
            if (dist < closestDist) {
              closestDist = dist;
              closestLen = len;
            }
          }
          snapPoints.push(closestLen / pathTotalLen);
        });

        // Main scroll-driven animation
        // Move indicator along the path using MotionPath
        const motionTween = gsap.to(indicator, {
          motionPath: {
            path: curvePath,
            align: curvePath,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.3,
            snap: {
              snapTo: snapPoints,
              duration: { min: 0.15, max: 0.4 },
              ease: "power3.inOut",
            },
            onUpdate: (self) => {
              // Draw trail to match progress
              const offset = totalLength * (1 - self.progress);
              trailPath.style.strokeDashoffset = `${offset}`;

              // Magnetic glow effect: brighter when near a snap point
              const progress = self.progress;
              let minDist = 1;
              for (const sp of snapPoints) {
                const dist = Math.abs(progress - sp);
                if (dist < minDist) minDist = dist;
              }
              // Near dot = bright glow, between dots = dim
              const proximity = 1 - Math.min(minDist * 8, 1);
              const glowSize = 12 + proximity * 10;
              const glowSpread = 4 + proximity * 6;
              const glowAlpha = 0.3 + proximity * 0.4;
              const outerSize = 24 + proximity * 16;
              const outerSpread = 8 + proximity * 8;
              const outerAlpha = 0.1 + proximity * 0.2;
              indicator.style.boxShadow = `0 0 ${glowSize}px ${glowSpread}px hsl(var(--primary) / ${glowAlpha}), 0 0 ${outerSize}px ${outerSpread}px hsl(var(--primary) / ${outerAlpha})`;

              // Scale: bigger when snapped to dot, smaller in transit
              const scale = 0.75 + proximity * 0.55;
              indicator.style.transform = indicator.style.transform.replace(/scale\([^)]*\)/, '') + ` scale(${scale})`;
            },
          },
        });

        // Cleanup
        return () => {
          motionTween.kill();
        };
      }, timelineRef);

      return () => ctx.revert();
    }, 150);

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
            {/* Curvy SVG path */}
            <svg
              ref={svgRef}
              className="absolute top-0 left-0 pointer-events-none z-0 overflow-visible"
              fill="none"
            >
              {/* Background path (dim, full curve) */}
              <path
                ref={curvePathRef}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeOpacity="0.12"
                strokeLinecap="round"
                fill="none"
              />
              {/* Trail path (bright, drawn progressively) */}
              <path
                ref={trailPathRef}
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeOpacity="0.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Glowing indicator circle */}
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
