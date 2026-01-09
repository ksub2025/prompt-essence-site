import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Target, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(75_25%_40%_/_0.06)_0%,_transparent_70%)]" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
            >
              <span className="text-primary text-sm font-medium">Lorem Ipsum Dolor 2026</span>
            </motion.div>
            
            <h1 className="hero-headline mb-8">
              Consectetur Adipiscing
              <br />
              <span className="gradient-text">Elit Sed Do</span>
            </h1>
            
            <p className="body-large max-w-2xl mx-auto mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/apply">
                <Button variant="hero" size="xl" className="group">
                  Apply Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/structure">
                <Button variant="heroOutline" size="xl">
                  How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Section */}
      <section className="py-32">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">The Program</p>
              <h2 className="section-headline mb-8">
                Ut enim ad minim veniam quis nostrud
              </h2>
              <p className="body-large">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Lorem Ipsum",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque."
              },
              {
                icon: Target,
                title: "Dolor Sit Amet",
                description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
              },
              {
                icon: Rocket,
                title: "Consectetur Elit",
                description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur."
              },
              {
                icon: Zap,
                title: "Adipiscing Sed",
                description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit."
              }
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <div className="glass-card p-8 h-full hover:border-primary/30 transition-colors">
                  <feature.icon className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-display text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(75_25%_40%_/_0.06)_0%,_transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="section-headline mb-6">
                  Quis autem vel eum iure?
                </h2>
                <p className="body-large max-w-xl mx-auto mb-10">
                  Temporibus autem quibusdam et aut officiis debitis aut rerum 
                  necessitatibus saepe eveniet ut et voluptates.
                </p>
                <Link to="/apply">
                  <Button variant="hero" size="xl" className="group">
                    Get Started
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
