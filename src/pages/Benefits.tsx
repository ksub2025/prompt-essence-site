import { ArrowRight, Award, Users, DollarSign, Sparkles, Mic, Network } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: DollarSign,
    title: "Funding",
    description: "Winners receive up to $100,000 in seed funding to accelerate their ventures."
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Access to industry leaders, successful founders, and domain experts."
  },
  {
    icon: Network,
    title: "Global Network",
    description: "Join a community of 3,000+ alumni across six continents."
  },
  {
    icon: Mic,
    title: "Exposure",
    description: "Present to investors, press, and potential partners at our global showcase."
  },
  {
    icon: Sparkles,
    title: "Resources",
    description: "Cloud credits, legal support, and tools worth over $50,000."
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Earn the credibility that comes with the IGNITE seal of excellence."
  }
];

const Benefits = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Why Participate</p>
              <h1 className="section-headline mb-8">
                More than a competition.
                <br />
                A catalyst for your future.
              </h1>
              <p className="body-large">
                Whether you win or not, every participant gains invaluable experience, 
                connections, and skills that will serve them for a lifetime.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.08}>
                <div className="glass-card p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "$2M+", label: "Awarded" },
                { value: "3,000+", label: "Alumni" },
                { value: "85%", label: "Launch Rate" },
                { value: "50+", label: "Countries" }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial style section */}
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 md:p-16">
              <blockquote className="text-2xl md:text-3xl font-display leading-relaxed mb-8 text-center">
                "IGNITE didn't just give us funding—it gave us the confidence, connections, 
                and clarity we needed to turn our idea into a company that now serves 
                millions of users."
              </blockquote>
              <div className="text-center">
                <p className="text-foreground font-medium">Sarah Chen</p>
                <p className="text-muted-foreground text-sm">Founder, NexGen Solutions • IGNITE 2024 Winner</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold mb-6">Your moment is now</h2>
              <p className="body-large max-w-xl mx-auto mb-8">
                Join the innovators who are shaping tomorrow. Start your application today.
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

export default Benefits;
