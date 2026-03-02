import { useState } from "react";
import { Send, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DashboardContact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("contact_messages").insert({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    });

    setIsSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Message Sent", description: "We'll get back to you within 48 hours." });
  };

  return (
    <div className="max-w-xl mx-auto">
      <AnimatedSection>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Contact Us</h1>
        <div className="flex items-center gap-2 mb-8">
          <Mail className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">venturecapsuletm@gmail.com</span>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        {submitted ? (
          <div className="glass-card p-10 text-center">
            <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Message Sent</h2>
            <p className="text-muted-foreground">We'll respond within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name *</label>
              <Input name="name" required placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email *</label>
              <Input name="email" required type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Subject *</label>
              <Input name="subject" required placeholder="What is this about?" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Message *</label>
              <Textarea name="message" required placeholder="Your message..." className="min-h-[120px]" />
            </div>
            <Button type="submit" className="w-full group" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        )}
      </AnimatedSection>
    </div>
  );
};

export default DashboardContact;
