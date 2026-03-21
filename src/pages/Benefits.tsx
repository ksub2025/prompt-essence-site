import { Link } from "react-router-dom";
import { ArrowRight, DollarSign, Rocket, Users, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const benefits = [
  { icon: DollarSign, title: "Cash Prize", description: "Win ₹10,000 for each subsection winner and ₹6,500 for second place. Compete for real monetary rewards for your innovative solutions." },
  { icon: Rocket, title: "Project Expansion", description: "Opportunity to expand your projects beyond the competition with incubation support." },
  { icon: Users, title: "Professional Guidance", description: "Receive mentorship and guidance from experienced professionals in business and finance." },
  { icon: Award, title: "Global Certificate", description: "Earn a certificate that shows you participated within a global scale competition." },
  { icon: Globe, title: "World-Class Extracurricular", description: "Add a prestigious extracurricular activity to your profile that stands out." },
];

const Benefits = () => {
  return (
    <>
      <section className="pt-8 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Benefits</p>
              <h1 className="section-headline mb-8">Your Benefit From This</h1>
              <p className="body-large">VentureCapsule offers more than just a competition experience. Explore our <Link to="/subsections" className="text-primary hover:underline">four unique pathways</Link> and see what sets us apart.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <div className="glass-card p-8 h-full hover:border-primary/30 transition-colors group">
                  <benefit.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-2xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 text-center">
              <h2 className="font-display text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="body-large max-w-2xl mx-auto mb-8">Don't miss out on this opportunity. Check the <Link to="/timeline" className="text-primary hover:underline">competition timeline</Link> and <Link to="/waitlist" className="text-primary hover:underline">join the waitlist</Link> today.</p>
              <Link to="/waitlist"><Button size="lg" className="group">Join Waitlist<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Benefits;
