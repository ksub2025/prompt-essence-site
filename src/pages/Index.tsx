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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(180_85%_55%_/_0.08)_0%,_transparent_70%)]" />
        
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
              <span className="text-primary text-sm font-medium">Applications Open for 2026</span>
            </motion.div>
            
            <h1 className="hero-headline mb-8">
              Where Bold Ideas
              <br />
              <span className="gradient-text">Become Reality</span>
            </h1>
            
            <p className="body-large max-w-2xl mx-auto mb-12">
              Join the premier innovation competition that transforms visionary concepts 
              into world-changing ventures. Your breakthrough starts here.
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

      {/* What is IGNITE Section */}
      <section className="py-32">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">The Competition</p>
              <h2 className="section-headline mb-8">
                A launchpad for the next generation of innovators
              </h2>
              <p className="body-large">
                IGNITE is not just a competition—it's a transformative journey. We bring together 
                the brightest minds, provide world-class mentorship, and create pathways to turn 
                ambitious ideas into scalable solutions that shape the future.
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
                title: "Innovation First",
                description: "We celebrate unconventional thinking and reward those who dare to challenge the status quo."
              },
              {
                icon: Target,
                title: "Real Impact",
                description: "Every project is evaluated on its potential to create meaningful, lasting change in the world."
              },
              {
                icon: Rocket,
                title: "Launch Support",
                description: "Winners receive funding, mentorship, and resources to take their ideas from concept to market."
              },
              {
                icon: Zap,
                title: "Global Network",
                description: "Connect with industry leaders, investors, and fellow innovators from around the world."
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
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(180_85%_55%_/_0.1)_0%,_transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="section-headline mb-6">
                  Ready to ignite your potential?
                </h2>
                <p className="body-large max-w-xl mx-auto mb-10">
                  Applications close soon. Don't miss your chance to be part of something extraordinary.
                </p>
                <Link to="/apply">
                  <Button variant="hero" size="xl" className="group">
                    Start Your Application
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
