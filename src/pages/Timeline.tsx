import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const timelineRounds = [
  { id: 1, title: "Round 1", subtitle: "Applications Open", side: "left" },
  { id: 2, title: "Round 2", subtitle: "Initial Screening", side: "right" },
  { id: 3, title: "Round 3", subtitle: "Shortlist Announced", side: "left" },
  { id: 4, title: "Round 4", subtitle: "Mentorship Phase", side: "right" },
  { id: 5, title: "Round 5", subtitle: "Final Presentations", side: "left" },
  { id: 6, title: "Round 6", subtitle: "Winners Announced", side: "right" },
];

const Timeline = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Timeline</p>
              <h1 className="section-headline mb-8">
                May — June 2026
              </h1>
              <p className="body-large">
                Key dates and milestones for the program. 
                Specific dates to be announced soon.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Month markers */}
            <AnimatedSection>
              <div className="flex justify-between mb-12 px-4">
                <span className="text-2xl font-display font-bold text-foreground">May</span>
                <span className="text-2xl font-display font-bold text-foreground">June</span>
              </div>
            </AnimatedSection>

            {/* Timeline line and rounds */}
            <div className="relative">
              {/* Central vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

              {/* Rounds */}
              <div className="space-y-16">
                {timelineRounds.map((round, index) => (
                  <AnimatedSection key={round.id} delay={index * 0.1}>
                    <div className={`flex items-center gap-8 ${round.side === 'right' ? 'flex-row-reverse' : ''}`}>
                      {/* Content */}
                      <div className={`flex-1 ${round.side === 'right' ? 'text-left' : 'text-right'}`}>
                        <div className={`glass-card p-6 inline-block ${round.side === 'right' ? 'ml-0' : 'mr-0'}`}>
                          <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                            {round.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">{round.subtitle}</p>
                          <p className="text-primary text-xs mt-2 font-medium">Date TBA</p>
                        </div>
                      </div>

                      {/* Center dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      </div>

                      {/* Empty space for other side */}
                      <div className="flex-1" />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* End marker */}
            <AnimatedSection delay={0.7}>
              <div className="flex justify-center mt-16">
                <div className="w-3 h-3 rounded-full bg-primary/50" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center glass-card p-8">
              <p className="text-muted-foreground">
                Exact dates for each round will be announced shortly. 
                Follow us for updates or check back regularly.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Timeline;
