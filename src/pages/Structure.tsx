import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

const phases = [
  {
    number: "01",
    title: "Applicatio",
    duration: "2 weeks",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    details: [
      "Ut enim ad minim veniam",
      "Quis nostrud exercitation",
      "Ullamco laboris nisi",
      "Aliquip ex ea commodo"
    ]
  },
  {
    number: "02",
    title: "Selectio",
    duration: "3 weeks",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    details: [
      "Excepteur sint occaecat",
      "Cupidatat non proident",
      "Sunt in culpa qui officia",
      "Deserunt mollit anim"
    ]
  },
  {
    number: "03",
    title: "Mentoria",
    duration: "6 weeks",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    details: [
      "Totam rem aperiam",
      "Eaque ipsa quae ab illo",
      "Inventore veritatis",
      "Quasi architecto beatae"
    ]
  },
  {
    number: "04",
    title: "Finalis",
    duration: "1 week",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.",
    details: [
      "Magni dolores eos qui",
      "Ratione voluptatem sequi",
      "Nesciunt neque porro",
      "Quisquam est qui dolorem"
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
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Program Structure</p>
              <h1 className="section-headline mb-8">
                Iter vestrum ab
                <br />
                idea ad impactum
              </h1>
              <p className="body-large">
                Ut enim ad minima veniam, quis nostrum exercitationem ullam 
                corporis suscipit laboriosam nisi ut aliquid ex ea commodi.
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
              <h2 className="font-display text-3xl font-bold mb-6">Paratus es incipere?</h2>
              <p className="body-large max-w-xl mx-auto mb-8">
                Primus gradus simplex est. Applicationem tuam submitte et potentiam tuam inveniamus.
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
