import AnimatedSection from "@/components/AnimatedSection";
import { DollarSign, Rocket, Users, Award, Globe } from "lucide-react";

const benefits = [
  { icon: DollarSign, title: "Cash Prize", description: "₹10,000 for each subsection winner and ₹6,500 for second place." },
  { icon: Rocket, title: "Project Expansion", description: "Opportunity to expand your projects beyond the competition with incubation support." },
  { icon: Users, title: "Professional Guidance", description: "Mentorship from experienced professionals in business and finance." },
  { icon: Award, title: "Global Certificate", description: "Earn a certificate from a global-scale competition." },
  { icon: Globe, title: "World-Class Extracurricular", description: "Add a prestigious activity to your profile that stands out." },
];

const DashboardBenefits = () => (
  <div className="max-w-3xl mx-auto">
    <AnimatedSection>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Benefits</h1>
      <p className="text-muted-foreground mb-8">What you gain from participating in VentureCapsule.</p>
    </AnimatedSection>

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {benefits.map((b, i) => (
        <AnimatedSection key={b.title} delay={i * 0.06}>
          <div className="glass-card p-6 h-full hover:border-primary/30 transition-colors group">
            <b.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-semibold mb-2">{b.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
);

export default DashboardBenefits;
