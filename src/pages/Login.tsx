import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import GoogleButton from "@/components/auth/GoogleButton";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import OTPVerification from "@/components/auth/OTPVerification";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import vcLogo from "@/assets/vc-logo.png";

type Mode = "login" | "signup" | "forgot" | "verify";

const Login = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Forgot state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotErrors, setForgotErrors] = useState<Record<string, string>>({});

  // OTP state
  const [otpCode, setOtpCode] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        toast({ title: "Welcome!", description: "You've been signed in successfully." });
        navigate("/dashboard/supporting-docs", { replace: true });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        setGoogleLoading(false);
        toast({ title: "Welcome!", description: "You've been signed in successfully." });
        navigate("/dashboard/supporting-docs", { replace: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateLogin = useCallback(() => {
    const errors: Record<string, string> = {};
    const trimmedEmail = loginEmail.trim();
    if (!trimmedEmail) errors.email = "Email address is required";
    else if (!validateEmail(trimmedEmail)) errors.email = "Please enter a valid email address (e.g. you@example.com)";
    if (!loginPassword) errors.password = "Password is required";
    else if (loginPassword.length < 8) errors.password = "Password must be at least 8 characters long";
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  }, [loginEmail, loginPassword]);

  const validateSignup = useCallback(() => {
    const errors: Record<string, string> = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = signupEmail.trim();

    if (!trimmedName) errors.fullName = "Full name is required";
    else if (trimmedName.length < 2) errors.fullName = "Full name must be at least 2 characters";
    else if (trimmedName.length > 100) errors.fullName = "Full name must be less than 100 characters";
    else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) errors.fullName = "Full name can only contain letters, spaces, hyphens, and apostrophes";

    if (!trimmedEmail) errors.email = "Email address is required";
    else if (!validateEmail(trimmedEmail)) errors.email = "Please enter a valid email address (e.g. you@example.com)";
    else if (trimmedEmail.length > 255) errors.email = "Email must be less than 255 characters";

    if (!signupPassword) errors.password = "Password is required";
    else if (signupPassword.length < 8) errors.password = "Password must be at least 8 characters long";
    else if (signupPassword.length > 72) errors.password = "Password must be less than 72 characters";
    else if (!/[A-Z]/.test(signupPassword)) errors.password = "Password must contain at least one uppercase letter";
    else if (!/[a-z]/.test(signupPassword)) errors.password = "Password must contain at least one lowercase letter";
    else if (!/[0-9]/.test(signupPassword)) errors.password = "Password must contain at least one number";

    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (signupPassword !== confirmPassword) errors.confirmPassword = "Passwords do not match";

    if (!captchaToken) errors.captcha = "Please complete the CAPTCHA verification";

    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  }, [fullName, signupEmail, signupPassword, confirmPassword, captchaToken]);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    toast({ title: "Connecting to Google...", description: "Please wait while we redirect you." });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/login",
        },
      });
      if (error) {
        toast({ title: "Google sign-in failed", description: "Could not connect to Google. Please try again.", variant: "destructive" });
        setGoogleLoading(false);
      }
    } catch {
      toast({ title: "Google sign-in failed", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
      setGoogleLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail.trim(), password: loginPassword });
      if (error) {
        if (error.message.includes("Email not confirmed")) {
          toast({ title: "Email not verified", description: "Please check your inbox and verify your email before logging in.", variant: "destructive" });
        } else {
          toast({ title: "Login failed", description: "Invalid email or password. If you signed up with Google, please use the 'Log in with Google' button instead.", variant: "destructive" });
        }
      }
    } catch {
      toast({ title: "Login failed", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const verifyCaptcha = async (token: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke("verify-recaptcha", { body: { token } });
      if (error) return false;
      return data?.success === true;
    } catch {
      return false;
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setIsLoading(true);
    try {
      if (captchaToken) {
        const captchaValid = await verifyCaptcha(captchaToken);
        if (!captchaValid) {
          toast({ title: "CAPTCHA verification failed", description: "Please refresh and try again.", variant: "destructive" });
          setCaptchaToken(null);
          setIsLoading(false);
          return;
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: signupEmail.trim(),
        password: signupPassword,
        options: { data: { full_name: fullName.trim() }, emailRedirectTo: window.location.origin },
      });

      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast({ title: "Account already exists", description: "An account with this email already exists. Please use your original sign-in method.", variant: "destructive" });
      } else {
        setVerifyEmail(signupEmail.trim());
        setOtpCode("");
        setOtpError("");
        setMode("verify");
        toast({ title: "Verification code sent ✉️", description: "We sent a 6-digit code to " + signupEmail.trim() + ". Check your spam/junk folder if you don't see it." });
      }
    } catch {
      toast({ title: "Sign up failed", description: "An unexpected error occurred.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) { setOtpError("Please enter the full 6-digit code"); return; }
    setIsLoading(true);
    setOtpError("");
    try {
      const { error } = await supabase.auth.verifyOtp({ email: verifyEmail, token: otpCode, type: "signup" });
      if (error) {
        setOtpError("Invalid or expired code. Please check and try again.");
        toast({ title: "Verification failed", description: error.message, variant: "destructive" });
      }
    } catch {
      setOtpError("An unexpected error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({ type: "signup", email: verifyEmail });
      if (error) toast({ title: "Resend failed", description: error.message, variant: "destructive" });
      else { toast({ title: "Code resent ✉️", description: "A new verification code has been sent to " + verifyEmail }); setOtpCode(""); setOtpError(""); }
    } catch {
      toast({ title: "Resend failed", description: "An unexpected error occurred.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const trimmed = forgotEmail.trim();
    if (!trimmed) errs.email = "Email address is required";
    else if (!validateEmail(trimmed)) errs.email = "Please enter a valid email address";
    setForgotErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo: `${window.location.origin}/reset-password` });
      if (error) toast({ title: "Request failed", description: error.message, variant: "destructive" });
      else { setForgotSent(true); toast({ title: "Reset link sent ✉️", description: "Check your inbox (and spam folder) for the password reset link." }); }
    } catch {
      toast({ title: "Request failed", description: "An unexpected error occurred.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setLoginErrors({});
    setSignupErrors({});
    setForgotErrors({});
    setShowPassword(false);
    setShowConfirm(false);
    setForgotSent(false);
    setCaptchaToken(null);
    setOtpCode("");
    setOtpError("");
  };

  const titles: Record<Mode, string> = { login: "Log In", signup: "Create Account", forgot: "Forgot Password", verify: "Verify Email" };
  const subtitles: Record<Mode, string> = {
    login: "Welcome back to",
    signup: "Sign up for",
    forgot: "Reset your password for",
    verify: "Enter the code sent to",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-12 max-w-md mx-auto">
              {/* Header */}
              <div className="flex flex-col items-center mb-8">
                <img src={vcLogo} alt="Venture Capsule logo" className="w-16 h-16 mb-4 object-contain" />
                <h1 className="font-display text-2xl font-bold text-center">{titles[mode]}</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {mode === "verify" ? (
                    <>Enter the code sent to <span className="text-primary font-medium">{verifyEmail}</span></>
                  ) : (
                    <>{subtitles[mode]}{" "}<span className="text-primary font-medium">Venture Capsule</span></>
                  )}
                </p>
              </div>

              {/* Google Button (login/signup only) */}
              {(mode === "login" || mode === "signup") && (
                <GoogleButton
                  mode={mode}
                  isLoading={isLoading}
                  googleLoading={googleLoading}
                  onClick={handleGoogleLogin}
                />
              )}

              {/* Forms */}
              {mode === "login" && (
                <LoginForm
                  loginEmail={loginEmail}
                  loginPassword={loginPassword}
                  loginErrors={loginErrors}
                  showPassword={showPassword}
                  isLoading={isLoading}
                  onEmailChange={(v) => { setLoginEmail(v); if (loginErrors.email) setLoginErrors(p => ({ ...p, email: "" })); }}
                  onPasswordChange={(v) => { setLoginPassword(v); if (loginErrors.password) setLoginErrors(p => ({ ...p, password: "" })); }}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onForgotPassword={() => switchMode("forgot")}
                  onSubmit={handleEmailLogin}
                />
              )}

              {mode === "signup" && (
                <SignupForm
                  fullName={fullName}
                  signupEmail={signupEmail}
                  signupPassword={signupPassword}
                  confirmPassword={confirmPassword}
                  signupErrors={signupErrors}
                  showPassword={showPassword}
                  showConfirm={showConfirm}
                  isLoading={isLoading}
                  onFullNameChange={(v) => { setFullName(v); if (signupErrors.fullName) setSignupErrors(p => ({ ...p, fullName: "" })); }}
                  onEmailChange={(v) => { setSignupEmail(v); if (signupErrors.email) setSignupErrors(p => ({ ...p, email: "" })); }}
                  onPasswordChange={(v) => { setSignupPassword(v); if (signupErrors.password) setSignupErrors(p => ({ ...p, password: "" })); }}
                  onConfirmChange={(v) => { setConfirmPassword(v); if (signupErrors.confirmPassword) setSignupErrors(p => ({ ...p, confirmPassword: "" })); }}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onToggleConfirm={() => setShowConfirm(!showConfirm)}
                  onCaptchaVerify={(token) => { setCaptchaToken(token); if (signupErrors.captcha) setSignupErrors(p => ({ ...p, captcha: "" })); }}
                  onCaptchaExpire={() => setCaptchaToken(null)}
                  onSubmit={handleEmailSignup}
                />
              )}

              {mode === "verify" && (
                <OTPVerification
                  otpCode={otpCode}
                  otpError={otpError}
                  isLoading={isLoading}
                  onOtpChange={setOtpCode}
                  onSubmit={handleVerifyOTP}
                  onResend={handleResendCode}
                  onBack={() => switchMode("signup")}
                />
              )}

              {mode === "forgot" && (
                <ForgotPasswordForm
                  forgotEmail={forgotEmail}
                  forgotErrors={forgotErrors}
                  forgotSent={forgotSent}
                  isLoading={isLoading}
                  onEmailChange={(v) => { setForgotEmail(v); if (forgotErrors.email) setForgotErrors(p => ({ ...p, email: "" })); }}
                  onSubmit={handleForgotPassword}
                  onBack={() => switchMode("login")}
                />
              )}

              {/* Toggle login/signup */}
              {(mode === "login" || mode === "signup") && (
                <p className="text-center text-sm text-muted-foreground mt-6">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    className="text-primary font-medium hover:underline"
                    onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                  >
                    {mode === "login" ? "Sign Up" : "Log In"}
                  </button>
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
