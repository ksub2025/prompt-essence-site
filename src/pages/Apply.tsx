import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Application Received",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Apply Now</p>
              <h1 className="section-headline mb-8">
                Primum gradum cape
              </h1>
              <p className="body-large">
                Hic est ubi iter tuum incipit. Dic nobis de visione tua, 
                et videamus si futurum simul aedificare possumus.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 pb-32">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <div className="glass-card p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2 className="font-display text-3xl font-bold mb-4">Applicatio Submissa</h2>
                  <p className="text-muted-foreground">
                    Gratias tibi pro applicatione. Turma nostra applicationem tuam 
                    recognoscet et intra duas hebdomadas cum proximis gradibus perveniet.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name *</label>
                      <Input 
                        required 
                        placeholder="Lorem"
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name *</label>
                      <Input 
                        required 
                        placeholder="Ipsum"
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address *</label>
                    <Input 
                      required 
                      type="email"
                      placeholder="lorem@ipsum.com"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name *</label>
                    <Input 
                      required 
                      placeholder="Nomen Projecti"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category *</label>
                    <select 
                      required
                      className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a category</option>
                      <option value="cat1">Categoria Prima</option>
                      <option value="cat2">Categoria Secunda</option>
                      <option value="cat3">Categoria Tertia</option>
                      <option value="cat4">Categoria Quarta</option>
                      <option value="cat5">Categoria Quinta</option>
                      <option value="cat6">Categoria Sexta</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tell us about your idea *</label>
                    <Textarea 
                      required 
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                      className="bg-background border-border focus:border-primary min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Portfolio or Website (optional)</label>
                    <Input 
                      type="url"
                      placeholder="https://"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full group">
                    Submit Application
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Apply;
