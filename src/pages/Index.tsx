import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, TrendingUp, FileText, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import HeroScene from "@/components/HeroScene";

const subsectionPreviews = [
  { icon: Briefcase, title: "Business Pitching", path: "/subsections" },
  { icon: TrendingUp, title: "Financial Literacy", path: "/subsections" },
  { icon: FileText, title: "Case Studies", path: "/subsections" },
  { icon: Users, title: "Professional Mentoring", path: "/subsections" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary text-sm font-medium mb-6 uppercase tracking-widest">
              Business • Finance • Economics
            </motion.p>
            <h1 className="hero-headline mb-8">VentureCapsule</h1>
            <p className="body-large max-w-2xl mb-10">Create, nurture, and execute solutions to real-life challenges through our round-based competition system.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/waitlist"><Button size="lg" className="group">Join Waitlist<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
              <Link to="/structure"><Button variant="outline" size="lg">How It Works</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="section-headline mb-8">What is VentureCapsule?</h2>
              <p className="body-large leading-relaxed">We are a business, finance and economics based competition that allows students to create, nurture and execute solutions to real life challenges within different subsections. This considers financial literacy, business pitching, case studies and measuring those with professionals as you get to foster new ideas and grow these solutions in our round based competition system.</p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subsectionPreviews.map((section, index) => (
              <AnimatedSection key={section.title} delay={index * 0.1}>
                <Link to={section.path}>
                  <div className="glass-card p-8 text-center hover:border-primary/30 transition-all group cursor-pointer h-full">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <section.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{section.title}</h3>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 md:p-16 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Ready to Build the Future?</h2>
              <p className="body-large max-w-2xl mx-auto mb-8">Join VentureCapsule and transform your ideas into impactful solutions guided by industry professionals.</p>
              <Link to="/waitlist"><Button size="lg" className="group">Join Waitlist<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;