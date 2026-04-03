import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { BookOpen, Users, FileText, Trophy, RefreshCw } from "lucide-react";

const steps = [
  { icon: Users, title: "1. Form Your Team", description: "Register a team of 2–6 members through the waitlist. Each team selects one subsection (Idea Lab, Portfolio Pathways, Intrapreneurship, or Case of Crisis)." },
  { icon: BookOpen, title: "2. Choose a Pathway", description: "Pick the subsection that best matches your team's strengths — business building, financial literacy, operations analysis, or crisis management." },
  { icon: FileText, title: "3. Compete in Rounds", description: "The competition has 4 main rounds. Submit proposals, receive mentor feedback, and refine your work between each round." },
  { icon: RefreshCw, title: "4. Bring-Back Rounds", description: "Eliminated? Don't worry. Two bring-back rounds let you re-enter after improving your submission — just like real startups iterate." },
  { icon: Trophy, title: "5. Finals & Results", description: "Top teams present in the final round. Winners earn cash prizes (₹10,000 for 1st, ₹6,500 for 2nd per subsection) plus certificates and mentorship." },
];

const Guide = () => (
  <div className="max-w-3xl mx-auto">
    <AnimatedSection>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Competition Guide</h1>
      <p className="text-muted-foreground mb-8">
        Step-by-step guide to navigating VentureCapsule. See the{" "}
        <Link to="/dashboard/timeline" className="text-primary hover:underline">timeline</Link> for exact dates.
      </p>
    </AnimatedSection>

    <div className="space-y-5">
      {steps.map((step, i) => (
        <AnimatedSection key={step.title} delay={i * 0.07}>
          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <step.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold mb-1">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
);

export default Guide;
