import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import { Rocket, RefreshCw, Users, Target } from "lucide-react";


const About = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      <Breadcrumbs />
      <section className="pt-8 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">About Us</p>
              <h1 className="section-headline mb-8">What is special about us?</h1>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-16">
            <AnimatedSection>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"><Rocket className="w-7 h-7 text-primary" /></div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-4">Beyond Competition</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">In VentureCapsule, you have the opportunity to not only compete by making new ideas but also incubate them once the competition is done. You don't just get to compete with others around you, you also get to build new ideas. See the <Link to="/benefits" className="text-primary hover:underline">full list of benefits</Link> available to participants.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"><Target className="w-7 h-7 text-primary" /></div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-4">Multiple Pathways</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">Apart from your typical business competitions which focus solely on pitching a business and hoping it gets approval, we have other <Link to="/subsections" className="text-primary hover:underline">competition pathways</Link> related to finance and business which you can tune into to hone skills that may be more attributed to you.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"><Users className="w-7 h-7 text-primary" /></div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-4">Professional Guidance</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">You get to be guided by professionals who have experience in this type of field that allows you to build your project with real-world insights and mentorship. Ready to start? <Link to="/waitlist" className="text-primary hover:underline">Join the waitlist</Link>.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"><RefreshCw className="w-7 h-7 text-primary" /></div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-4">Bring Back Rounds</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">With VentureCapsule, we have a system called bring back rounds. In business and finance, a lot of startups are bound to fail due to ideas not being conceptualized well enough. However, those ideas are then worked upon and hence create the successful companies you see today. Learn more about the <Link to="/structure" className="text-primary hover:underline">competition structure</Link> and how bring back rounds work.</p>
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

export default About;
