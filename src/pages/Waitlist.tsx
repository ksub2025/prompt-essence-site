import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  team_name: z.string().trim().min(2, "Team name must be at least 2 characters").max(100, "Team name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(5, "Phone number must be at least 5 digits").max(20, "Phone number must be less than 20 characters"),
  country: z.string().min(1, "Please select your country"),
  subsection: z.string().min(1, "Please select a subsection"),
  how_heard: z.string().max(500, "Must be less than 500 characters").optional().or(z.literal("")),
  improvement_suggestion: z.string().max(1000, "Must be less than 1000 characters").optional().or(z.literal("")),
  faqs: z.string().max(1000, "Must be less than 1000 characters").optional().or(z.literal("")),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada",
  "Chile", "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece",
  "Hong Kong", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia",
  "Mexico", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
  "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan",
  "Thailand", "Turkey", "UAE", "Ukraine", "United Kingdom", "United States", "Vietnam", "Other"
];

const subsections = ["Initiation", "Path Drawer", "Operator", "Planned Chaos"];

const Waitlist = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      team_name: "",
      email: "",
      phone: "",
      country: "",
      subsection: "",
      how_heard: "",
      improvement_suggestion: "",
      faqs: "",
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist").insert({
        name: data.name,
        team_name: data.team_name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        subsection: data.subsection,
        how_heard: data.how_heard || null,
        improvement_suggestion: data.improvement_suggestion || null,
        faqs: data.faqs || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll keep you updated on VentureCapsule.",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Join Us</p>
              <h1 className="section-headline mb-8">Join the Waitlist</h1>
              <p className="body-large">Be the first to know when VentureCapsule opens applications. Get exclusive updates and early access.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-12 max-w-xl mx-auto">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2 className="font-display text-2xl font-bold mb-4">You're on the list!</h2>
                  <p className="text-muted-foreground">Thank you for joining the VentureCapsule waitlist. We'll send updates to your email.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="team_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your team name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subsection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subsection</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subsection" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subsections.map((sub) => (
                                <SelectItem key={sub} value={sub}>
                                  {sub}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="how_heard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How did you hear about us? (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Social media, friend, event..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="improvement_suggestion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Any suggestions for improvement? (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Share your thoughts..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="faqs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Any questions for us? (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Ask us anything..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Join Waitlist
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Waitlist;
