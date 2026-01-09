import { Cpu, Leaf, Heart, Banknote, GraduationCap, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const subsections = [
  {
    icon: Cpu,
    title: "Categoria Prima",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
  },
  {
    icon: Leaf,
    title: "Categoria Secunda",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."
  },
  {
    icon: Heart,
    title: "Categoria Tertia",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
  },
  {
    icon: Banknote,
    title: "Categoria Quarta",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
  },
  {
    icon: GraduationCap,
    title: "Categoria Quinta",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur."
  },
  {
    icon: Globe,
    title: "Categoria Sexta",
    description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit."
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
                Sex tractus,
                <br />
                infinitae possibilitates
              </h1>
              <p className="body-large">
                Ut enim ad minima veniam, quis nostrum exercitationem ullam 
                corporis suscipit laboriosam nisi ut aliquid commodi consequatur.
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
              <h2 className="font-display text-3xl font-bold mb-6">Innovationes Trans-Disciplinares</h2>
              <p className="body-large max-w-2xl mx-auto">
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse 
                quam nihil molestiae consequatur vel illum qui dolorem eum fugiat.
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
