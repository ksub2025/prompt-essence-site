import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, RefreshCw, Trophy } from "lucide-react";

const events = [
  { title: "Round 1", date: "May 28th – 30th", icon: Calendar, isBringBack: false, isResults: false },
  { title: "Round 2", date: "May 28th – June 4th", icon: Calendar, isBringBack: false, isResults: false },
  { title: "Bring-Back Round 1", date: "June 6th – 13th", icon: RefreshCw, isBringBack: true, isResults: false },
  { title: "Round 3", date: "June 15th", icon: Calendar, isBringBack: false, isResults: false },
  { title: "Bring-Back Round 2", date: "June 17th – 24th", icon: RefreshCw, isBringBack: true, isResults: false },
  { title: "Final Round", date: "June 30th", icon: Trophy, isBringBack: false, isResults: false },
  { title: "Results Day", date: "July 10th", icon: Trophy, isBringBack: false, isResults: true },
];

const DashboardTimeline = () => (
  <div className="max-w-2xl mx-auto">
    <AnimatedSection>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Competition Timeline</h1>
      <p className="text-muted-foreground mb-8">Key dates and milestones for VentureCapsule 2026.</p>
    </AnimatedSection>

    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-6">
        {events.map((e, i) => {
          const Icon = e.icon;
          return (
            <AnimatedSection key={e.title} delay={i * 0.06}>
              <div className="flex items-start gap-5 relative">
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  e.isResults ? "bg-primary text-primary-foreground" :
                  e.isBringBack ? "bg-accent text-accent-foreground" :
                  "bg-primary/10 text-primary"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`glass-card p-5 flex-1 ${e.isResults ? "border-primary/40 ring-1 ring-primary/20" : ""}`}>
                  <h3 className="font-display font-semibold">{e.title}</h3>
                  <p className="text-muted-foreground text-sm">{e.date}</p>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>

    <AnimatedSection delay={0.5}>
      <div className="flex flex-wrap justify-center gap-5 mt-8 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary/20 border-2 border-primary" /> Main Rounds</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Bring-Back</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Results</span>
      </div>
    </AnimatedSection>
  </div>
);

export default DashboardTimeline;
