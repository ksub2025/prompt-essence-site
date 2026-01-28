import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { RefreshCw, Trophy, Calendar } from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    title: "Round 1",
    date: "May 24th - 26th",
    position: "top",
    icon: Calendar,
    isBringBack: false,
  },
  {
    id: 2,
    title: "Round 2",
    date: "May 28th - June 4th",
    position: "bottom",
    icon: Calendar,
    isBringBack: false,
  },
  {
    id: 3,
    title: "Bring-Back Round 1",
    date: "June 6th - 13th",
    position: "top",
    icon: RefreshCw,
    isBringBack: true,
  },
  {
    id: 4,
    title: "Round 3",
    date: "June 15th",
    position: "bottom",
    icon: Calendar,
    isBringBack: false,
  },
  {
    id: 5,
    title: "Bring-Back Round 2",
    date: "June 17th - 24th",
    position: "top",
    icon: RefreshCw,
    isBringBack: true,
  },
  {
    id: 6,
    title: "Final Round",
    date: "June 30th",
    position: "bottom",
    icon: Trophy,
    isBringBack: false,
  },
  {
    id: 7,
    title: "Results Day",
    date: "July 10th",
    position: "top",
    icon: Trophy,
    isBringBack: false,
    isResults: true,
  },
];

const Timeline = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Timeline</p>
              <h1 className="section-headline mb-8">
                Competition Timeline
              </h1>
              <p className="body-large">
                Key dates and milestones for VentureCapsule 2025.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Desktop Timeline - Clean horizontal */}
      <section className="py-16 hidden lg:block overflow-x-auto">
        <div className="max-w-7xl mx-auto px-8">
          <AnimatedSection>
            <div className="relative pt-48 pb-8">
              {/* Main horizontal line */}
              <div className="absolute left-0 right-0 top-48 h-0.5 bg-border" />
              
              {/* Events container */}
              <div className="flex justify-between relative">
                {timelineEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div key={event.id} className="flex flex-col items-center relative" style={{ width: `${100 / timelineEvents.length}%` }}>
                      {/* Card above line */}
                      <div className={`glass-card p-4 w-32 text-center mb-4 ${
                        event.isResults ? "border-primary/50 ring-2 ring-primary/20" : ""
                      }`}>
                        <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-2 ${
                          event.isBringBack 
                            ? "bg-accent text-accent-foreground" 
                            : event.isResults 
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-display font-semibold text-xs leading-tight mb-1">{event.title}</h3>
                        <p className="text-[10px] text-muted-foreground leading-tight">{event.date}</p>
                      </div>
                      
                      {/* Vertical connector */}
                      <div className="w-px h-6 bg-border" />
                      
                      {/* Node dot */}
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        event.isResults 
                          ? "bg-primary border-primary" 
                          : event.isBringBack
                            ? "bg-accent border-accent"
                            : "bg-background border-primary"
                      }`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tablet Timeline */}
      <section className="py-12 hidden md:block lg:hidden">
        <div className="section-container">
          <AnimatedSection>
            <div className="grid grid-cols-4 gap-4">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className={`glass-card p-4 text-center ${
                    event.isResults ? "border-primary/50 ring-2 ring-primary/20" : ""
                  }`}>
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${
                      event.isBringBack 
                        ? "bg-accent text-accent-foreground" 
                        : event.isResults 
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-1">{event.title}</h3>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile Timeline - Vertical list */}
      <section className="py-8 md:hidden">
        <div className="section-container">
          <div className="relative max-w-sm mx-auto">
            {/* Vertical line */}
            <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border" />
            
            <div className="space-y-4">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <AnimatedSection key={event.id} delay={index * 0.05}>
                    <div className="flex gap-4 items-center">
                      {/* Node */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 z-10 ${
                        event.isBringBack 
                          ? "bg-accent text-accent-foreground" 
                          : event.isResults 
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary border border-primary/20"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      {/* Content */}
                      <div className={`glass-card p-4 flex-1 ${event.isResults ? "border-primary/50" : ""}`}>
                        <h3 className="font-display font-semibold text-sm">{event.title}</h3>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

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
