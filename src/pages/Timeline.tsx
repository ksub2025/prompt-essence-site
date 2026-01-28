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
      <section className="pt-32 pb-20">
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

      {/* Desktop Timeline */}
      <section className="py-20 hidden md:block">
        <div className="section-container">
          <AnimatedSection>
            <div className="relative">
              {/* Main horizontal line */}
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />
              
              <div className="flex justify-between items-center relative">
                {timelineEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div
                      key={event.id}
                      className={`flex flex-col items-center relative ${
                        event.position === "top" ? "flex-col" : "flex-col-reverse"
                      }`}
                    >
                      {/* Content card */}
                      <div
                        className={`glass-card p-4 w-36 text-center ${
                          event.position === "top" ? "mb-6" : "mt-6"
                        } ${event.isResults ? "border-primary/50 bg-primary/5" : ""}`}
                      >
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-2 ${
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
                      
                      {/* Vertical connector line */}
                      <div className={`w-px h-8 bg-primary/40 ${
                        event.position === "top" ? "order-last" : "order-first"
                      }`} />
                      
                      {/* Node dot */}
                      <div className={`w-4 h-4 rounded-full border-4 border-primary bg-background z-10 ${
                        event.isResults ? "bg-primary" : ""
                      }`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile Timeline - Vertical */}
      <section className="py-12 md:hidden">
        <div className="section-container">
          <div className="relative max-w-sm mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/20" />
            
            <div className="space-y-6">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <AnimatedSection key={event.id} delay={index * 0.1}>
                    <div className="flex gap-6 items-start">
                      {/* Node */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 z-10 ${
                        event.isBringBack 
                          ? "bg-accent text-accent-foreground" 
                          : event.isResults 
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary border border-primary/20"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Content */}
                      <div className={`glass-card p-5 flex-1 ${event.isResults ? "border-primary/50" : ""}`}>
                        <h3 className="font-display font-semibold text-lg mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
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
      <section className="py-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary/10 border border-primary/20" />
                <span className="text-muted-foreground">Main Rounds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-accent" />
                <span className="text-muted-foreground">Bring-Back Rounds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary" />
                <span className="text-muted-foreground">Results</span>
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
