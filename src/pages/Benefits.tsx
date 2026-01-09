import { ArrowRight, Award, Users, DollarSign, Sparkles, Mic, Network } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: DollarSign,
    title: "Beneficium I",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit tempor."
  },
  {
    icon: Users,
    title: "Beneficium II",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna."
  },
  {
    icon: Network,
    title: "Beneficium III",
    description: "Ut enim ad minim veniam quis nostrud exercitation ullamco."
  },
  {
    icon: Mic,
    title: "Beneficium IV",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit."
  },
  {
    icon: Sparkles,
    title: "Beneficium V",
    description: "Excepteur sint occaecat cupidatat non proident sunt in culpa."
  },
  {
    icon: Award,
    title: "Beneficium VI",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut."
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
                Plus quam certamen.
                <br />
                Catalyst futuri tui.
              </h1>
              <p className="body-large">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
                accusantium doloremque laudantium totam rem aperiam.
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
                { value: "$2M+", label: "Datum" },
                { value: "3,000+", label: "Alumni" },
                { value: "85%", label: "Ratio" },
                { value: "50+", label: "Regiones" }
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
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua enim 
                ad minim veniam quis nostrud."
              </blockquote>
              <div className="text-center">
                <p className="text-foreground font-medium">Nomen Cognomen</p>
                <p className="text-muted-foreground text-sm">Titulus, Societas • Annus MMXXIV</p>
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
              <h2 className="font-display text-3xl font-bold mb-6">Momentum tuum nunc est</h2>
              <p className="body-large max-w-xl mx-auto mb-8">
                Iunge innovatoribus qui cras formant. Applicationem tuam hodie incipe.
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
