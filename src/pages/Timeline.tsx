import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const Timeline = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Timeline</p>
              <h1 className="section-headline mb-8">
                Competition Timeline
              </h1>
              <p className="body-large">
                Key dates and milestones for VentureCapsule.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 md:p-20 text-center max-w-2xl mx-auto">
              <p className="text-6xl mb-6">📅</p>
              <h2 className="font-display text-3xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground text-lg">
                The competition timeline will be announced shortly. 
                Check back soon for specific dates and deadlines.
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
