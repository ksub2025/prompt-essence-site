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
  { id: 1, title: "Round 1", date: "May 24th - 26th", icon: Calendar, isBringBack: false },
  { id: 2, title: "Round 2", date: "May 28th - June 4th", icon: Calendar, isBringBack: false },
  { id: 3, title: "Bring-Back Round 1", date: "June 6th - 13th", icon: RefreshCw, isBringBack: true },
  { id: 4, title: "Round 3", date: "June 15th", icon: Calendar, isBringBack: false },
  { id: 5, title: "Bring-Back Round 2", date: "June 17th - 24th", icon: RefreshCw, isBringBack: true },
  { id: 6, title: "Final Round", date: "June 30th", icon: Calendar, isBringBack: false },
  { id: 7, title: "Results Day", date: "July 10th", icon: Trophy, isBringBack: false, isResults: true },
];

// Positions for the scattered layout (percentage-based)
const positions = [
  { left: "55%", top: "2%" },
  { left: "10%", top: "16%" },
  { right: "10%", top: "30%" },
  { left: "15%", top: "44%" },
  { left: "55%", top: "58%" },
  { right: "15%", top: "72%" },
  { left: "30%", top: "86%" },
];

const Timeline = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      createTimeline();
    }, 300);

    const onResize = () => {
      createTimeline();
    };
    window.addEventListener("resize", onResize);

    function createTimeline() {
      const main = mainRef.current;
      const indicator = indicatorRef.current;
      if (!main || !indicator) return;

      const ctx = gsap.context(() => {
        const initialContainer = main.querySelector<HTMLElement>(".tl-initial");
        const containers = gsap.utils.toArray<HTMLElement>(".tl-container:not(.tl-initial)");
        if (!initialContainer) return;

        // Position indicator at center of first card
        const mainRect = main.getBoundingClientRect();
        const initRect = initialContainer.getBoundingClientRect();
        const startX = initRect.left + initRect.width / 2 - mainRect.left - 12;
        const startY = initRect.top + initRect.height / 2 - mainRect.top - 12;
        gsap.set(indicator, { x: 0, y: 0, left: startX, top: startY });

        // Build motion path points relative to indicator's starting position
        const indicatorRect = indicator.getBoundingClientRect();
        const points = containers.map((container) => {
          const r = container.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - (indicatorRect.left + indicatorRect.width / 2),
            y: r.top + r.height / 2 - (indicatorRect.top + indicatorRect.height / 2),
          };
        });

        // Animate items in on scroll
        gsap.utils.toArray<HTMLElement>(".tl-container").forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1, scale: 1, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        });

        // Main motion path timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".tl-initial",
            start: "clamp(top center)",
            endTrigger: ".tl-spacer-final",
            end: "clamp(top center)",
            scrub: 1,
          },
        });

        tl.to(indicator, {
          duration: 1,
          ease: "none",
          motionPath: {
            path: points,
            curviness: 1.5,
          },
        });
      }, main);

      // Store context for cleanup
      (mainRef as any)._ctx = ctx;
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      (mainRef as any)?._ctx?.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
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

      {/* Main scattered timeline area */}
      <div ref={mainRef} className="relative" style={{ height: "300vh" }}>
        {/* Glowing indicator — positioned at the center of the first card, moves via MotionPath */}
        <div
          ref={indicatorRef}
          className="tl-indicator absolute z-50 pointer-events-none"
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
            boxShadow: "0 0 16px 6px hsl(var(--primary) / 0.5), 0 0 32px 12px hsl(var(--primary) / 0.2)",
          }}
        />

        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          const pos = positions[index];
          const isFirst = index === 0;

          return (
            <div
              key={event.id}
              className={`tl-container ${isFirst ? "tl-initial" : ""} absolute flex items-center justify-center`}
              style={{
                ...pos,
                width: "clamp(200px, 30vw, 320px)",
              }}
            >
              <div className={`glass-card p-5 w-full ${event.isResults ? "border-primary/50 ring-2 ring-primary/20" : ""}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${event.isBringBack ? "bg-accent text-accent-foreground" : event.isResults ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{event.title}</h3>
                </div>
                <p className="text-muted-foreground">{event.date}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* End spacer for ScrollTrigger end */}
      <div className="tl-spacer-final h-[20vh]" />

      {/* Legend */}
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
