import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import vcLogo from "@/assets/vc-logo.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  // Signup state
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateLogin = () => {
    const errors: Record<string, string> = {};
    if (!loginEmail.trim()) errors.email = "Email is required";
    else if (!validateEmail(loginEmail)) errors.email = "Please enter a valid email";
    if (!loginPassword) errors.password = "Password is required";
    else if (loginPassword.length < 8) errors.password = "Password must be at least 8 characters";
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignup = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!signupEmail.trim()) errors.email = "Email is required";
    else if (!validateEmail(signupEmail)) errors.email = "Please enter a valid email";
    if (!signupPassword) errors.password = "Password is required";
    else if (signupPassword.length < 8) errors.password = "Password must be at least 8 characters";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (signupPassword !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: "Google sign-in failed", description: String(error), variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
      navigate("/dashboard/supporting-docs");
    }
    setIsLoading(false);
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;
    console.log("[Signup] Attempting signup for:", signupEmail);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error("[Signup] Error:", error.message);
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        // User already exists — Supabase returns empty identities for repeated signups
        console.warn("[Signup] Repeated signup detected for:", signupEmail);
        toast({
          title: "Account already exists",
          description: "An account with this email already exists. Please log in instead.",
          variant: "destructive",
        });
      } else {
        console.log("[Signup] User created, confirmation email requested:", data.user?.id);
        toast({
          title: "Check your email",
          description: "We sent a confirmation link. Check your spam/junk folder if you don't see it.",
        });
      }
    } catch (err) {
      console.error("[Signup] Unexpected error:", err);
      toast({ title: "Signup failed", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const inputClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

  const errorClass = "text-sm text-destructive mt-1";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-12 max-w-md mx-auto">
              <div className="flex flex-col items-center mb-8">
                <img src={vcLogo} alt="Venture Capsule logo" className="w-16 h-16 mb-4 object-contain" />
                <h1 className="font-display text-2xl font-bold text-center">
                  {isLogin ? "Log In" : "Sign Up"}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  to continue to <span className="text-primary font-medium">Venture Capsule</span>
                </p>
              </div>

              {/* Google Button */}
              <Button variant="outline" className="w-full mb-4" onClick={handleGoogleLogin} disabled={isLoading}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Log in using Google
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1 bg-border" />
                <span className="text-muted-foreground text-sm">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Forms */}
              {isLogin ? (
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium leading-none mb-2 block">Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    {loginErrors.email && <p className={errorClass}>{loginErrors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none mb-2 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={inputClass}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginErrors.password && <p className={errorClass}>{loginErrors.password}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                    Log in using Email
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium leading-none mb-2 block">Full Name</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {signupErrors.fullName && <p className={errorClass}>{signupErrors.fullName}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none mb-2 block">Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                    />
                    {signupErrors.email && <p className={errorClass}>{signupErrors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none mb-2 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={inputClass}
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signupErrors.password && <p className={errorClass}>{signupErrors.password}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none mb-2 block">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        className={inputClass}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signupErrors.confirmPassword && <p className={errorClass}>{signupErrors.confirmPassword}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                    Sign Up with Email
                  </Button>
                </form>
              )}

              <p className="text-center text-sm text-muted-foreground mt-6">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  className="text-primary font-medium hover:underline"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setLoginErrors({});
                    setSignupErrors({});
                  }}
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
