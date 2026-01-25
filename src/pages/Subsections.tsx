import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const Subsections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Subsections</p>
              <h1 className="section-headline mb-8">
                Our Subsections
              </h1>
              <p className="body-large">
                Explore the different pathways available in VentureCapsule.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Subsections Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid gap-8 md:gap-12">
            {/* Initiation */}
            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">💡</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Initiation</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A platform where you get to build business ideas and initiate them based on the location you are at. You have to make a business that would thrive well within your location and present how you accounted for all of the challenges presented to you successfully.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Path Drawer */}
            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">📊</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Path Drawer</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A platform where you get to explore the different regions of financial literacy, accountability for your own finance and growth factors into your portfolio based on the base resources provided to you. Along with that, this gives you a chance to record this down and use our very own investing tool called FinLit in order to help design your portfolio and mark down the points you go across.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Operator */}
            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">⚙️</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Operator</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A platform where you get to handle the decisions and operations of a business as an intrapreneur of the business and analyse the business while also providing the best course of action based on the requirements or wants of the business.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Planned Chaos */}
            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🌀</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Planned Chaos</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A platform based upon being put in different situations that link together at the end with multiple separate scenarios occurring in each round that you get to pick to follow. Different crises are placed on you throughout your time in each round that can impact how you plan out your course of action.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Subsections;
