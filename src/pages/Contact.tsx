import { useState } from "react";
import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll respond within 48 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Contact Us</p>
              <h1 className="section-headline mb-8">
                Let's connect
              </h1>
              <p className="body-large">
                Have questions about the competition? Want to partner with us? 
                We'd love to hear from you.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 pb-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info */}
            <AnimatedSection>
              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">hello@ignite.co</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Headquarters</p>
                      <p className="font-medium">San Francisco, CA</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h3 className="font-display text-xl font-semibold mb-4">Response Time</h3>
                  <p className="text-muted-foreground">
                    We typically respond within 48 hours during business days. 
                    For urgent inquiries, please indicate so in your message.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.2}>
              {submitted ? (
                <div className="glass-card p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2 className="font-display text-3xl font-bold mb-4">Message Sent</h2>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. A member of our team will 
                    get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name *</label>
                    <Input 
                      required 
                      placeholder="Your name"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input 
                      required 
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject *</label>
                    <Input 
                      required 
                      placeholder="What is this about?"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <Textarea 
                      required 
                      placeholder="Your message..."
                      className="bg-background/50 border-border focus:border-primary min-h-[150px]"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full group">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
