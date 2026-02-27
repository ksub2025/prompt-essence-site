import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FloatingDecorations from "@/components/FloatingDecorations";

const Subsections = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingDecorations variant="full" />
      <Navigation />
      <Breadcrumbs />

      <section className="pt-8 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Pathways</p>
              <h1 className="section-headline mb-8">Four Unique Challenges</h1>
              <p className="body-large">
                From building businesses to managing crises, each pathway tests different aspects of entrepreneurship, finance, and strategic thinking. Learn more about our <Link to="/structure" className="text-primary hover:underline">competition structure</Link>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid gap-8 md:gap-12">
            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-3xl">💡</span></div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Initiation</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">A platform where you get to build business ideas and initiate them based on the location you are at. You have to make a business that would thrive well within your location and present how you accounted for all of the challenges presented to you successfully.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-3xl">📊</span></div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Path Drawer</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">A platform where you get to explore different regions of <Link to="/benefits" className="text-primary hover:underline">financial literacy</Link>, accountability for your own finance and growth factors into your portfolio based on the base resources provided to you, using our very own investing tool called FinLit.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-3xl">⚙️</span></div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Operator</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">A platform where you get to handle the decisions and operations of a business as an intrapreneur and analyse the business while providing the best course of action. Get <Link to="/about" className="text-primary hover:underline">professional guidance</Link> along the way.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-3xl">🌀</span></div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Planned Chaos</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">A platform based upon being put in different situations that link together at the end with multiple separate scenarios occurring in each round. Check the <Link to="/timeline" className="text-primary hover:underline">competition timeline</Link> for round dates.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 text-center">
              <h2 className="font-display text-3xl font-bold mb-6">Choose Your Pathway</h2>
              <p className="body-large max-w-2xl mx-auto mb-8">Ready to compete? Explore the <Link to="/benefits" className="text-primary hover:underline">benefits</Link> and secure your spot today.</p>
              <Link to="/waitlist">
                <Button size="lg" className="group">
                  Join Waitlist
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

export default Subsections;
