import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, User, Mail, Phone, Globe, Users, Tag, HelpCircle } from "lucide-react";

type WaitlistEntry = {
  name: string;
  team_name: string;
  team_members: string | null;
  email: string;
  phone: string;
  country: string;
  subsection: string;
  faqs: string | null;
  created_at: string;
};

const DetailRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | null }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-b-0">
      <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
        <p className="text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
};

const MyWaitlist = () => {
  const [entry, setEntry] = useState<WaitlistEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      const { data, error } = await supabase
        .from("waitlist")
        .select("name, team_name, team_members, email, phone, country, subsection, faqs, created_at")
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setEntry(data);
      }
      setLoading(false);
    };
    fetchEntry();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold mb-2">No Waitlist Entry Found</h2>
        <p className="text-muted-foreground">
          There's no waitlist registration associated with this email address. If you haven't joined yet, visit the{" "}
          <a href="/waitlist" className="text-primary hover:underline">waitlist page</a> to sign up.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">My Waitlist Details</h1>
      <p className="text-muted-foreground mb-8">Your registration information for VentureCapsule.</p>

      <div className="glass-card p-6 md:p-8 space-y-0">
        <DetailRow icon={User} label="Full Name" value={entry!.name} />
        <DetailRow icon={Tag} label="Team Name" value={entry!.team_name} />
        <DetailRow icon={Users} label="Team Members" value={entry!.team_members} />
        <DetailRow icon={Mail} label="Email" value={entry!.email} />
        <DetailRow icon={Phone} label="Phone" value={entry!.phone} />
        <DetailRow icon={Globe} label="Country" value={entry!.country} />
        <DetailRow icon={Tag} label="Subsection" value={entry!.subsection} />
        <DetailRow icon={HelpCircle} label="Questions" value={entry!.faqs} />
        <DetailRow
          icon={Globe}
          label="Registered On"
          value={new Date(entry!.created_at).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      </div>
    </div>
  );
};

export default MyWaitlist;
