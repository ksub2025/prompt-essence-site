import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import { RefreshCw, Trophy, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { id: 1, title: "Round 1", date: "May 24th - 26th", icon: Calendar, isBringBack: false },
  { id: 2, title: "Round 2", date: "May 28th - June 4th", icon: Calendar, isBringBack: false },
  { id: 3, title: "Bring-Back Round 1", date: "June 6th - 13th", icon: RefreshCw, isBringBack: true },
  { id: 4, title: "Round 3", date: "June 15th", icon: Calendar, isBringBack: false },
  { id: 5, title: "Bring-Back Round 2", date: "June 17th - 24th", icon: RefreshCw, isBringBack: true },
  { id: 6, title: "Final Round", date: "June 30th", icon: Calendar, isBringBack: false },
  { id: 7, title: "Results Day", date: "July 10th", icon: Trophy, isBringBack: false, isResults: true },
];

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const container = timelineRef.current;
        const indicator = indicatorRef.current;
        const line = lineRef.current;
        const trail = trailRef.current;
        if (!container || !indicator || !line || !trail) return;

        const dots = gsap.utils.toArray<HTMLElement>(".tl-dot");
        const items = gsap.utils.toArray<HTMLElement>(".tl-item");

        if (dots.length < 2) return;

        // Animate items in on scroll
        items.forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        });

        // Animate dots popping in
        dots.forEach((el) => {
          gsap.fromTo(el,
            { scale: 0 },
            {
              scale: 1, duration: 0.4, ease: "back.out(2)",
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        });

        // Get positions of first and last dot relative to the line container
        const lineRect = line.getBoundingClientRect();
        const firstDot = dots[0].getBoundingClientRect();
        const lastDot = dots[dots.length - 1].getBoundingClientRect();

        // Calculate dot centers relative to the vertical line
        const dotPositions = dots.map((dot) => {
          const r = dot.getBoundingClientRect();
          return (r.top + r.height / 2 - lineRect.top) / lineRect.height;
        });

        // Position indicator at first dot
        const startY = firstDot.top + firstDot.height / 2 - lineRect.top;
        gsap.set(indicator, { y: startY - 10, opacity: 1 });

        // Main ScrollTrigger for the indicator
        const endTriggerEl = dots[dots.length - 1].closest('.tl-item') || dots[dots.length - 1];

        ScrollTrigger.create({
          trigger: dots[0],
          endTrigger: endTriggerEl,
          start: "center 70%",
          end: "center 30%",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Map progress to position along the line using magnetic snapping
            const mappedProgress = magneticMap(progress, dotPositions);

            // Position indicator
            const yPos = mappedProgress * lineRect.height;
            gsap.set(indicator, { y: yPos - 10 });

            // Draw trail
            trail.style.height = `${mappedProgress * 100}%`;

            // Proximity glow
            let minDist = 1;
            for (const dp of dotPositions) {
              const dist = Math.abs(mappedProgress - dp);
              if (dist < minDist) minDist = dist;
            }
            const proximity = 1 - Math.min(minDist * 12, 1);

            const glowSize = 8 + proximity * 18;
            const glowSpread = 2 + proximity * 12;
            const glowAlpha = 0.15 + proximity * 0.65;
            const scale = 0.6 + proximity * 0.7;

            indicator.style.boxShadow = `0 0 ${glowSize}px ${glowSpread}px hsl(var(--primary) / ${glowAlpha}), 0 0 ${glowSize * 2}px ${glowSpread * 2}px hsl(var(--primary) / ${glowAlpha * 0.4})`;
            indicator.style.transform = `translateY(${yPos - 10}px) scale(${scale})`;

            // Highlight active dot
            dots.forEach((dot, i) => {
              const dotDist = Math.abs(mappedProgress - dotPositions[i]);
              if (dotDist < 0.03) {
                dot.style.boxShadow = `0 0 12px 4px hsl(var(--primary) / 0.5)`;
                dot.style.transform = `scale(1.3)`;
              } else {
                dot.style.boxShadow = `none`;
                dot.style.transform = `scale(1)`;
              }
            });
          },
        });
      }, timelineRef);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

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

      <section className="py-16">
        <div className="section-container">
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div
              ref={lineRef}
              className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/10"
            >
              {/* Trail (lit portion) */}
              <div
                ref={trailRef}
                className="absolute top-0 left-0 w-full bg-primary/50"
                style={{ height: "0%" }}
              />
            </div>

            {/* Glowing indicator */}
            <div
              ref={indicatorRef}
              className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full z-30 pointer-events-none opacity-0"
              style={{
                marginLeft: '-10px',
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                boxShadow: '0 0 12px 4px hsl(var(--primary) / 0.4)',
              }}
            />

            <div className="space-y-8">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isEven = index % 2 === 0;
                return (
                  <div key={event.id} className="tl-item">
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
                      <div
                        className={`tl-dot absolute left-6 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full z-10 transition-all duration-200 ${event.isResults ? "bg-primary border-primary" : event.isBringBack ? "bg-accent border-accent" : "bg-background border-primary"}`}
                        style={{ borderWidth: '3px' }}
                      />
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

// Magnetic mapping: creates dwell zones at each dot position
function magneticMap(scrollProgress: number, dotPositions: number[]): number {
  const DWELL = 0.35;
  const p = Math.max(0, Math.min(1, scrollProgress));
  const n = dotPositions.length;

  for (let i = 0; i < n - 1; i++) {
    const segStart = i / (n - 1);
    const segEnd = (i + 1) / (n - 1);

    if (p >= segStart && p <= segEnd) {
      const segProgress = (p - segStart) / (segEnd - segStart);
      const pathStart = dotPositions[i];
      const pathEnd = dotPositions[i + 1];
      const halfDwell = DWELL / 2;

      if (segProgress <= halfDwell) {
        return pathStart;
      } else if (segProgress >= 1 - halfDwell) {
        return pathEnd;
      } else {
        const transitProgress = (segProgress - halfDwell) / (1 - DWELL);
        const eased = 0.5 - 0.5 * Math.cos(Math.PI * transitProgress);
        return pathStart + (pathEnd - pathStart) * eased;
      }
    }
  }
  return dotPositions[n - 1];
}

export default Timeline;
