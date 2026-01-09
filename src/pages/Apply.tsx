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
      description: "Thank you for applying to IGNITE. We'll be in touch soon.",
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
                Take the first step
              </h1>
              <p className="body-large">
                This is where your journey begins. Tell us about your vision, 
                and let's see if we can build the future together.
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
                  <h2 className="font-display text-3xl font-bold mb-4">Application Submitted</h2>
                  <p className="text-muted-foreground">
                    Thank you for applying to IGNITE 2026. Our team will review your 
                    application and reach out within 2 weeks with next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name *</label>
                      <Input 
                        required 
                        placeholder="Your first name"
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name *</label>
                      <Input 
                        required 
                        placeholder="Your last name"
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address *</label>
                    <Input 
                      required 
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name *</label>
                    <Input 
                      required 
                      placeholder="What's your project called?"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category *</label>
                    <select 
                      required
                      className="w-full h-10 px-3 rounded-md bg-background/50 border border-border text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a category</option>
                      <option value="tech">Technology & AI</option>
                      <option value="sustainability">Sustainability</option>
                      <option value="health">Health & Wellness</option>
                      <option value="fintech">Fintech & Economy</option>
                      <option value="education">Education</option>
                      <option value="social">Social Impact</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tell us about your idea *</label>
                    <Textarea 
                      required 
                      placeholder="Describe your innovation, its impact, and why it matters..."
                      className="bg-background/50 border-border focus:border-primary min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Portfolio or Website (optional)</label>
                    <Input 
                      type="url"
                      placeholder="https://"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full group">
                    Submit Application
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    By submitting, you agree to our terms and conditions.
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
