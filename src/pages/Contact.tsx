import { Link } from "react-router-dom";
import { useState } from "react";
import { Send, Mail, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 48 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumbs />

      <section className="pt-8 pb-12">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Contact Us</p>
              <h1 className="section-headline mb-8">Let's Connect</h1>
              <p className="body-large">
                Have questions about the program? Check our <Link to="/faqs" className="text-primary hover:underline">frequently asked questions</Link> or reach out directly.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 pb-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">venturecapsuletm@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold mb-3">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/waitlist" className="text-primary hover:underline">Join the waitlist</Link></li>
                    <li><Link to="/about" className="text-primary hover:underline">Learn about VentureCapsule</Link></li>
                    <li><Link to="/subsections" className="text-primary hover:underline">Explore competition pathways</Link></li>
                    <li><Link to="/timeline" className="text-primary hover:underline">View competition timeline</Link></li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              {submitted ? (
                <div className="glass-card p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2 className="font-display text-3xl font-bold mb-4">Message Sent</h2>
                  <p className="text-muted-foreground">Thank you for reaching out. A member of our team will respond to you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name *</label>
                    <Input name="name" required placeholder="Your name" className="bg-background border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input name="email" required type="email" placeholder="you@example.com" className="bg-background border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject *</label>
                    <Input name="subject" required placeholder="What is this about?" className="bg-background border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <Textarea name="message" required placeholder="Your message..." className="bg-background border-border focus:border-primary min-h-[150px]" />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
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
