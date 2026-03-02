import AnimatedSection from "@/components/AnimatedSection";
import { Target, Lightbulb, Presentation, TrendingUp, Users } from "lucide-react";

const criteria = [
  { icon: Lightbulb, title: "Innovation & Creativity", weight: "25%", description: "Originality of the idea, creative problem-solving, and unique approach to challenges." },
  { icon: Target, title: "Feasibility & Execution", weight: "25%", description: "Practicality of the proposal, realistic timelines, resource planning, and execution strategy." },
  { icon: Presentation, title: "Presentation & Communication", weight: "20%", description: "Clarity of the pitch, quality of documentation, and ability to convey ideas effectively." },
  { icon: TrendingUp, title: "Impact & Scalability", weight: "15%", description: "Potential real-world impact, growth opportunities, and long-term viability of the project." },
  { icon: Users, title: "Teamwork & Collaboration", weight: "15%", description: "Evidence of effective team dynamics, role distribution, and collaborative effort." },
];

const JudgingCriteria = () => (
  <div className="max-w-3xl mx-auto">
    <AnimatedSection>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Judging Criteria</h1>
      <p className="text-muted-foreground mb-8">Understand how your submissions are evaluated across all rounds.</p>
    </AnimatedSection>

    <div className="space-y-4">
      {criteria.map((c, i) => (
        <AnimatedSection key={c.title} delay={i * 0.06}>
          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-semibold">{c.title}</h3>
                <span className="text-primary font-bold text-sm">{c.weight}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.description}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>

    <AnimatedSection delay={0.4}>
      <div className="glass-card p-6 mt-8 bg-primary/5 border-primary/20">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Note:</span> Specific criteria may vary slightly by subsection. Detailed rubrics are shared before each round begins.
        </p>
      </div>
    </AnimatedSection>
  </div>
);

export default JudgingCriteria;
