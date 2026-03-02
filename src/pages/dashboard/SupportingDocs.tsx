import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { FileText, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SupportingDocs = () => {
  const [hasWaitlistEntry, setHasWaitlistEntry] = useState<boolean | null>(null);
  const [subsection, setSubsection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWaitlistStatus = async () => {
      const { data } = await supabase
        .from("waitlist")
        .select("subsection")
        .maybeSingle();

      if (data) {
        setHasWaitlistEntry(true);
        setSubsection(data.subsection);
      } else {
        setHasWaitlistEntry(false);
      }
      setLoading(false);
    };
    fetchWaitlistStatus();
  }, []);

  const documents = [
    {
      name: "Team Registration Form",
      status: hasWaitlistEntry ? "submitted" : "pending",
      description: "Your initial team registration and member details.",
    },
    {
      name: "Subsection Selection",
      status: hasWaitlistEntry && subsection ? "submitted" : "pending",
      description: hasWaitlistEntry && subsection
        ? `Confirmed: ${subsection}`
        : "Confirmation of your chosen competition pathway.",
    },
    {
      name: "Round 1 Submission",
      status: "pending",
      description: "Your opening round proposal document.",
    },
    {
      name: "Mentor Feedback Form",
      status: "pending",
      description: "Feedback received from your assigned mentor.",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatedSection>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Supporting Documents</h1>
        <p className="text-muted-foreground mb-8">
          Track and manage all documents related to your competition journey. Check the{" "}
          <Link to="/dashboard/guide" className="text-primary hover:underline">guide</Link> for submission requirements.
        </p>
      </AnimatedSection>

      <div className="space-y-4">
        {documents.map((doc, i) => (
          <AnimatedSection key={doc.name} delay={i * 0.05}>
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.description}</p>
              </div>
              {doc.status === "submitted" ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-500/10 px-3 py-1 rounded-full shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" /> Submitted
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" /> Pending
                </span>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3}>
        <div className="glass-card p-6 mt-8 text-center">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Document uploads will be enabled when the competition begins.</p>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default SupportingDocs;
