import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

const phases = [
  {
    number: "01",
    title: "Application",
    duration: "2 weeks",
    description: "Submit your idea through our streamlined application portal. Tell us about your vision, your team, and why your concept has the potential to change the world.",
    details: [
      "Complete online application form",
      "Upload pitch deck (optional)",
      "Provide team information",
      "Initial screening by our review committee"
    ]
  },
  {
    number: "02",
    title: "Selection",
    duration: "3 weeks",
    description: "Our panel of industry experts, investors, and past winners carefully evaluates each submission. We look for innovation, feasibility, and transformative potential.",
    details: [
      "Expert panel review",
      "Technical feasibility assessment",
      "Market potential analysis",
      "Top 50 teams advance"
    ]
  },
  {
    number: "03",
    title: "Mentorship",
    duration: "6 weeks",
    description: "Selected teams are paired with world-class mentors who provide guidance, resources, and connections. This is where ideas become execution-ready ventures.",
    details: [
      "1-on-1 mentor matching",
      "Weekly workshop sessions",
      "Access to expert network",
      "Prototype development support"
    ]
  },
  {
    number: "04",
    title: "Finals",
    duration: "1 week",
    description: "The top 10 teams present their refined concepts to our grand jury. Winners receive funding, continued support, and access to our global network.",
    details: [
      "Live pitch presentations",
      "Q&A with jury panel",
      "Public showcase event",
      "Awards ceremony"
    ]
  }
];

const Structure = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Competition Structure</p>
              <h1 className="section-headline mb-8">
                Your path from
                <br />
                idea to impact
              </h1>
              <p className="body-large">
                Our four-phase process is designed to challenge, refine, and accelerate 
                the most promising innovations. Here's what to expect.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="section-container">
          <div className="space-y-12">
            {phases.map((phase, index) => (
              <AnimatedSection key={phase.number} delay={index * 0.1}>
                <div className="glass-card p-8 md:p-12 grid lg:grid-cols-[200px_1fr] gap-8">
                  <div>
                    <span className="text-6xl font-display font-bold gradient-text">{phase.number}</span>
                    <p className="text-muted-foreground mt-2">{phase.duration}</p>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-bold mb-4">{phase.title}</h2>
                    <p className="body-large mb-6">{phase.description}</p>
                    <ul className="space-y-2">
                      {phase.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold mb-6">Ready to begin?</h2>
              <p className="body-large max-w-xl mx-auto mb-8">
                The first step is simple. Submit your application and let us discover your potential.
              </p>
              <Link to="/apply">
                <Button variant="hero" size="xl" className="group">
                  Apply Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Structure;
