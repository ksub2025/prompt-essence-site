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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  team_name: z.string().trim().min(2, "Team name must be at least 2 characters").max(100),
  team_members: z.string().trim().min(2, "Please list your team members").max(500),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(5, "Phone number must be at least 5 digits").max(20),
  country: z.string().min(1, "Please select your country"),
  subsection: z.string().min(1, "Please select a subsection"),
  faqs: z.string().max(1000).optional().or(z.literal("")),
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

interface WaitlistFormProps {
  onSuccess?: () => void;
}

const WaitlistForm = ({ onSuccess }: WaitlistFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<WaitlistFormData | null>(null);
  const { toast } = useToast();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "", team_name: "", team_members: "", email: "", phone: "", country: "", subsection: "", faqs: "",
    },
  });

  const handleConfirmedSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist").insert({
        name: data.name, team_name: data.team_name, team_members: data.team_members,
        email: data.email, phone: data.phone, country: data.country, subsection: data.subsection,
        faqs: data.faqs || null,
      });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Welcome to the waitlist!", description: "We'll keep you updated on VentureCapsule." });
      onSuccess?.();
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data: WaitlistFormData) => {
    setPendingData(data);
    setShowConfirm(true);
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 md:p-12 text-center py-8">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="font-display text-2xl font-bold mb-4">You're on the list!</h2>
        <p className="text-muted-foreground">Thank you for joining the VentureCapsule waitlist. We'll send updates to your email.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 md:p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Enter your full name" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="team_name" render={({ field }) => (
            <FormItem><FormLabel>Team Name</FormLabel><FormControl><Input placeholder="Enter your team name" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="team_members" render={({ field }) => (
            <FormItem><FormLabel>Team Members (2-6 members)</FormLabel><FormControl><Textarea placeholder="List your team members' names, separated by commas" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="Enter your email" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="Enter your phone number" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="country" render={({ field }) => (
            <FormItem><FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select your country" /></SelectTrigger></FormControl>
                <SelectContent>{countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select><FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="subsection" render={({ field }) => (
            <FormItem><FormLabel>Subsection</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a subsection" /></SelectTrigger></FormControl>
                <SelectContent>{subsections.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select><FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="faqs" render={({ field }) => (
            <FormItem><FormLabel>Any questions for us? (Optional)</FormLabel><FormControl><Textarea placeholder="Ask us anything..." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" />Submitting...</> : <>Join Waitlist<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
          </Button>

          <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm your details</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="space-y-2 text-sm">
                    <p>Please double-check your information before submitting:</p>
                    {pendingData && (
                      <ul className="space-y-1 mt-2 text-muted-foreground">
                        <li><strong>Name:</strong> {pendingData.name}</li>
                        <li><strong>Team:</strong> {pendingData.team_name}</li>
                        <li><strong>Members:</strong> {pendingData.team_members}</li>
                        <li><strong>Email:</strong> {pendingData.email}</li>
                        <li><strong>Phone:</strong> {pendingData.phone}</li>
                        <li><strong>Country:</strong> {pendingData.country}</li>
                        <li><strong>Subsection:</strong> {pendingData.subsection}</li>
                      </ul>
                    )}
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Go Back & Edit</AlertDialogCancel>
                <AlertDialogAction onClick={() => pendingData && handleConfirmedSubmit(pendingData)}>
                  Confirm & Join
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </div>
  );
};

export default WaitlistForm;
