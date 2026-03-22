import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Subsections = () => {
  return (
    <>
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
                    <p className="text-muted-foreground text-lg leading-relaxed">Business ideas are made and initiated in this subsection. In order to ensure that these ideas come to fruition, this subsection will require you to make these ideas based on your current location when attempting this competition in order to fully develop a business that can survive in your given location. Hence, you have to make a business that can survive and make profits within the location you live at.</p>
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
                    <p className="text-muted-foreground text-lg leading-relaxed">Making a portfolio is your key goal if you choose to partake in this subsection. You will be given a base set of resources before you begin, which will require you to use those resources best you can for developing your portfolio. Throughout your rounds for this subsection, you will be notified on a daily basis about different market trends or economical changes in order for you to base the making of your portfolio around them effectively.</p>
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
                    <p className="text-muted-foreground text-lg leading-relaxed">From a single business, you get to analyze, manage and develop strategies for the future operations of that business. You will be mapping out the logic behind each action, and how it can help grow the business. Your decisions and operations will be needing to be based on any problems that the business is currently facing, requiring you to analyze those problems and take action accordingly.</p>
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
                    <p className="text-muted-foreground text-lg leading-relaxed">A more case study based competition, you will be put into a particular case which will revolve around you being an intrapreneur for a company and handling a specific project for the company. You will be given documents to help base your decisions and ideas for developing your project. Throughout rounds, every two days, you will be given updates that can help you change up your approach to the project.</p>
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
    </>
  );
};

export default Subsections;
