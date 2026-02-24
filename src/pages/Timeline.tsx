import { useEffect, useRef } from "react";
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

  useEffect(() => {
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

      // Magnetic snap: indicator travels between dots with resistance + attraction
      const dots = gsap.utils.toArray<HTMLElement>(".timeline-section .timeline-dot");
      const indicator = indicatorRef.current;
      if (!indicator || dots.length === 0) return;

      const container = document.querySelector(".timeline-container") as HTMLElement;
      if (!container) return;

      // Build a timeline that snaps between dot positions with magnetic feel
      const magnetTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      // Position indicator at first dot initially
      const containerRect = container.getBoundingClientRect();
      const firstDotRect = dots[0].getBoundingClientRect();
      const startY = firstDotRect.top - containerRect.top + firstDotRect.height / 2;
      const startX = firstDotRect.left - containerRect.left + firstDotRect.width / 2;
      gsap.set(indicator, { top: startY, left: startX, xPercent: -50, yPercent: -50 });

      // For each subsequent dot, create a magnetic snap animation
      dots.forEach((dot, i) => {
        if (i === 0) return;
        const prevDot = dots[i - 1];

        magnetTl.to(indicator, {
          duration: 1,
          ease: "power2.in", // resistance: slow start leaving previous dot
          top: () => {
            const cRect = container.getBoundingClientRect();
            const prevR = prevDot.getBoundingClientRect();
            const dotR = dot.getBoundingClientRect();
            // Move to midpoint first
            return ((prevR.top + dotR.top) / 2) - cRect.top + dotR.height / 2;
          },
          left: () => {
            const cRect = container.getBoundingClientRect();
            const prevR = prevDot.getBoundingClientRect();
            const dotR = dot.getBoundingClientRect();
            return ((prevR.left + dotR.left) / 2) - cRect.left + dotR.width / 2;
          },
          scale: 0.7, // shrink in transit
          onUpdate: function() {
            // Pulse glow down during transit
            const progress = this.progress();
            const glow = progress < 0.5 ? 1 - progress : progress;
            indicator.style.boxShadow = `0 0 ${12 * glow}px ${4 * glow}px hsl(var(--primary) / ${0.4 * glow}), 0 0 ${24 * glow}px ${8 * glow}px hsl(var(--primary) / ${0.15 * glow})`;
          }
        });

        magnetTl.to(indicator, {
          duration: 1,
          ease: "power4.out", // attraction: fast snap into dot
          top: () => {
            const cRect = container.getBoundingClientRect();
            const dotR = dot.getBoundingClientRect();
            return dotR.top - cRect.top + dotR.height / 2;
          },
          left: () => {
            const cRect = container.getBoundingClientRect();
            const dotR = dot.getBoundingClientRect();
            return dotR.left - cRect.left + dotR.width / 2;
          },
          scale: 1.3, // overshoot on snap
          onComplete: () => {
            // Settle back
            gsap.to(indicator, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" });
          },
          onUpdate: function() {
            // Ramp glow up on attraction
            const progress = this.progress();
            indicator.style.boxShadow = `0 0 ${12 + 8 * progress}px ${4 + 4 * progress}px hsl(var(--primary) / ${0.4 + 0.2 * progress}), 0 0 ${24 + 12 * progress}px ${8 + 6 * progress}px hsl(var(--primary) / ${0.15 + 0.1 * progress})`;
          }
        });
      });
    }, timelineRef);

    return () => ctx.revert();
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

      <section className="timeline-section py-16">
        <div className="section-container">
          <div className="timeline timeline-container relative max-w-2xl mx-auto">
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
