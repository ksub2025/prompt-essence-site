import { Link } from "react-router-dom";
import { DollarSign, Rocket, Users, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const Apply = () => {
  return (
    <>
      <section className="pt-8 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Apply</p>
              <h1 className="section-headline mb-8">Apply Now</h1>
              <p className="body-large">Join VentureCapsule and start your journey in business, finance, and economics. Explore the <Link to="/subsections" className="text-primary hover:underline">competition pathways</Link> and <Link to="/benefits" className="text-primary hover:underline">benefits</Link>.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6 text-center">What You'll Get</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3"><DollarSign className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-muted-foreground">Cash prize</span></div>
                <div className="flex items-center gap-3"><Rocket className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-muted-foreground">Opportunity to expand your projects</span></div>
                <div className="flex items-center gap-3"><Users className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-muted-foreground">Guidance under professionals</span></div>
                <div className="flex items-center gap-3"><Award className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-muted-foreground">Certificate from global competition</span></div>
                <div className="flex items-center gap-3 md:col-span-2 justify-center"><Globe className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-muted-foreground">World-class extracurricular for your profile</span></div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 md:p-20 text-center max-w-2xl mx-auto">
              <p className="text-6xl mb-6">📝</p>
              <h2 className="font-display text-3xl font-bold mb-4">Applications Opening Soon</h2>
              <p className="text-muted-foreground text-lg mb-8">The application form will be available shortly. In the meantime, <Link to="/register" className="text-primary hover:underline">register</Link> to secure early access.</p>
              <Link to="/contact"><Button variant="outline" size="lg">Contact Us for Updates</Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Apply;
