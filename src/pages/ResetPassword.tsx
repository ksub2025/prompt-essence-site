import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import vcLogo from "@/assets/vc-logo.png";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidSession, setIsValidSession] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");

    if (type === "recovery") {
      setIsValidSession(true);
      setChecking(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setIsValidSession(true);
      setChecking(false);
    });

    const timeout = setTimeout(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) setIsValidSession(true);
        setChecking(false);
      });
    }, 2000);

    return () => { subscription.unsubscribe(); clearTimeout(timeout); };
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!newPassword) errs.password = "Password is required";
    else if (newPassword.length < 8) errs.password = "Password must be at least 8 characters long";
    else if (newPassword.length > 72) errs.password = "Password must be less than 72 characters";
    else if (!/[A-Z]/.test(newPassword)) errs.password = "Password must contain at least one uppercase letter";
    else if (!/[a-z]/.test(newPassword)) errs.password = "Password must contain at least one lowercase letter";
    else if (!/[0-9]/.test(newPassword)) errs.password = "Password must contain at least one number";
    if (!confirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) toast({ title: "Password reset failed", description: error.message, variant: "destructive" });
      else { setIsSuccess(true); toast({ title: "Password updated successfully!" }); setTimeout(() => navigate("/login"), 3000); }
    } catch {
      toast({ title: "Password reset failed", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-12 max-w-md mx-auto">
              <div className="flex flex-col items-center mb-8">
                <img src={vcLogo} alt="Venture Capsule logo" className="w-16 h-16 mb-4 object-contain" />
                <h1 className="font-display text-2xl font-bold text-center">Reset Password</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Set a new password for your <span className="text-primary font-medium">Venture Capsule</span> account
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                  <p className="text-foreground font-medium">Password updated successfully!</p>
                  <p className="text-muted-foreground text-sm">Redirecting you to login...</p>
                </div>
              ) : !isValidSession ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">This link is invalid or has expired.</p>
                  <Button variant="outline" onClick={() => navigate("/login")}>Back to Login</Button>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Min 8 chars, uppercase, lowercase & number"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); if (errors.password) setErrors(p => ({ ...p, password: "" })); }}
                        aria-invalid={!!errors.password}
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-new-password"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Re-enter your new password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors(p => ({ ...p, confirmPassword: "" })); }}
                        aria-invalid={!!errors.confirmPassword}
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    Update Password
                  </Button>
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

export default ResetPassword;
