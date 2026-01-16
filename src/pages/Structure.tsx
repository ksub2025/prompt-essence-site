import { Link } from "react-router-dom";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const rounds = [
  {
    number: "01",
    title: "Round 1",
    description: "The opening round of the competition where all participants submit their initial proposals.",
    hasBringBack: false,
  },
  {
    number: "02",
    title: "Round 2",
    description: "Second round of evaluation with refined submissions from successful Round 1 participants.",
    hasBringBack: true,
  },
  {
    number: "03",
    title: "Round 3",
    description: "Advanced round where participants further develop their projects with mentor guidance.",
    hasBringBack: true,
  },
  {
    number: "04",
    title: "Final Round",
    description: "The grand finale where top participants present their completed projects to the judging panel.",
    hasBringBack: false,
  },
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
                Round-Based Competition
              </h1>
              <p className="body-large">
                This competition is a round-based competition with 4 rounds and 2 bring back rounds. 
                The first round is normal, and then the next two rounds have bring back rounds until 
                the final round. This results in multiple chances for participants to work upon their 
                projects to the fullest.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Explanation Card */}
      <section className="py-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-4">What are Bring Back Rounds?</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Bring back rounds give eliminated participants a second chance to re-enter the competition. 
                    Just like in the real world where startups fail and iterate before succeeding, our bring 
                    back rounds allow you to refine your ideas and come back stronger.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline of Rounds */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

              <div className="space-y-8">
                {rounds.map((round, index) => (
                  <AnimatedSection key={round.number} delay={index * 0.1}>
                    <div className="flex gap-8">
                      {/* Number circle */}
                      <div className="relative z-10 flex-shrink-0 hidden md:flex">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-bold">
                          {round.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="glass-card p-8 flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="md:hidden text-primary font-display font-bold">{round.number}.</span>
                          <h3 className="font-display text-2xl font-semibold">{round.title}</h3>
                          {round.hasBringBack && (
                            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
                              <RefreshCw className="w-3 h-3" />
                              Bring Back
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{round.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 text-center">
              <h2 className="font-display text-3xl font-bold mb-6">Ready to Compete?</h2>
              <p className="body-large max-w-2xl mx-auto mb-8">
                Join VentureCapsule and take advantage of our unique competition structure 
                that gives you multiple opportunities to succeed.
              </p>
              <Link to="/apply">
                <Button size="lg" className="group">
                  Apply Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
