import { Cpu, Leaf, Heart, Banknote, GraduationCap, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const subsections = [
  {
    icon: Cpu,
    title: "Technology & AI",
    description: "Innovations in artificial intelligence, machine learning, robotics, and emerging technologies that push the boundaries of what's possible."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Solutions addressing climate change, renewable energy, circular economy, and environmental conservation for a greener future."
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Breakthroughs in healthcare, mental health, biotech, and wellness that improve quality of life and extend human potential."
  },
  {
    icon: Banknote,
    title: "Fintech & Economy",
    description: "Revolutionary approaches to financial services, economic inclusion, blockchain, and the future of money and commerce."
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Transformative ideas in learning, skill development, accessibility, and the democratization of knowledge across all ages."
  },
  {
    icon: Globe,
    title: "Social Impact",
    description: "Initiatives focused on community development, social justice, humanitarian aid, and creating equitable opportunities for all."
  }
];

const Subsections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Categories</p>
              <h1 className="section-headline mb-8">
                Six tracks,
                <br />
                infinite possibilities
              </h1>
              <p className="body-large">
                Choose the category that best aligns with your innovation. Each track 
                features specialized mentors and tailored resources to maximize your impact.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsections.map((section, index) => (
              <AnimatedSection key={section.title} delay={index * 0.08}>
                <div className="glass-card p-8 h-full hover:border-primary/30 transition-colors group">
                  <section.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-2xl font-semibold mb-4">{section.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{section.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-disciplinary */}
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-12 md:p-16 text-center">
              <h2 className="font-display text-3xl font-bold mb-6">Cross-Disciplinary Innovations</h2>
              <p className="body-large max-w-2xl mx-auto">
                Don't fit neatly into one category? Many of the most impactful ideas span 
                multiple domains. Apply under the track most central to your solution—our 
                judges understand complexity.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Subsections;
