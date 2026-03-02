import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Rocket, Target, Users, RefreshCw } from "lucide-react";

const highlights = [
  { icon: Rocket, title: "Beyond Competition", description: "Opportunity to not only compete but also incubate your ideas once the competition is done." },
  { icon: Target, title: "Multiple Pathways", description: "Four unique competition tracks beyond traditional business pitching — finance, operations, crisis management and more." },
  { icon: Users, title: "Professional Guidance", description: "Mentorship from experienced professionals who provide real-world insights throughout the journey." },
  { icon: RefreshCw, title: "Bring Back Rounds", description: "Failed ideas get a second chance — just like real startups iterate and succeed after initial setbacks." },
];

const DashboardAbout = () => (
  <div className="max-w-3xl mx-auto">
    <AnimatedSection>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">About VentureCapsule</h1>
      <p className="text-muted-foreground mb-8">What makes us special.</p>
    </AnimatedSection>

    <div className="space-y-5">
      {highlights.map((h, i) => (
        <AnimatedSection key={h.title} delay={i * 0.07}>
          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <h.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold mb-1">{h.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{h.description}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
);

export default DashboardAbout;
