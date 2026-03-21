import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { RefreshCw, Trophy, Calendar } from "lucide-react";

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
  return (
    <>
      <section className="pt-8 pb-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Timeline</p>
              <h1 className="section-headline mb-8">Competition Timeline</h1>
              <p className="body-large">
                Key dates and milestones for VentureCapsule 2026. Learn about the <Link to="/structure" className="text-primary hover:underline">round-based competition structure</Link> and choose your <Link to="/subsections" className="text-primary hover:underline">pathway</Link>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isEven = index % 2 === 0;
                return (
                  <AnimatedSection key={event.id} delay={index * 0.08}>
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
                      <div className={`absolute left-6 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-3 z-10 ${event.isResults ? "bg-primary border-primary" : event.isBringBack ? "bg-accent border-accent" : "bg-background border-primary"}`} style={{ borderWidth: '3px' }} />
                      <div className="hidden md:block flex-1" />
                    </div>
                  </AnimatedSection>
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
    </>
  );
};

export default Timeline;
