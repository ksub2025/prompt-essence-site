import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Loader2, Eye, EyeOff, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ReCaptcha from "@/components/ReCaptcha";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
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

  // OTP verification state
  const [otpCode, setOtpCode] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [otpError, setOtpError] = useState("");

  // Listen for auth changes (handles Google OAuth redirect)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event === "SIGNED_IN") {
        setGoogleLoading(false);
        toast({ title: "Welcome!", description: "You've been signed in successfully." });
        navigate("/dashboard/supporting-docs", { replace: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateLogin = useCallback(() => {
    const errors: Record<string, string> = {};
    const trimmedEmail = loginEmail.trim();
    if (!trimmedEmail) {
      errors.email = "Email address is required";
    } else if (!validateEmail(trimmedEmail)) {
      errors.email = "Please enter a valid email address (e.g. you@example.com)";
    }
    if (!loginPassword) {
      errors.password = "Password is required";
    } else if (loginPassword.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  }, [loginEmail, loginPassword]);

  const validateSignup = useCallback(() => {
    const errors: Record<string, string> = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = signupEmail.trim();

    if (!trimmedName) {
      errors.fullName = "Full name is required";
    } else if (trimmedName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    } else if (trimmedName.length > 100) {
      errors.fullName = "Full name must be less than 100 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      errors.fullName = "Full name can only contain letters, spaces, hyphens, and apostrophes";
    }

    if (!trimmedEmail) {
      errors.email = "Email address is required";
    } else if (!validateEmail(trimmedEmail)) {
      errors.email = "Please enter a valid email address (e.g. you@example.com)";
    } else if (trimmedEmail.length > 255) {
      errors.email = "Email must be less than 255 characters";
    }

    if (!signupPassword) {
      errors.password = "Password is required";
    } else if (signupPassword.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (signupPassword.length > 72) {
      errors.password = "Password must be less than 72 characters";
    } else if (!/[A-Z]/.test(signupPassword)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(signupPassword)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(signupPassword)) {
      errors.password = "Password must contain at least one number";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (signupPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!captchaToken) {
      errors.captcha = "Please complete the CAPTCHA verification";
    }

    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  }, [fullName, signupEmail, signupPassword, confirmPassword, captchaToken]);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    toast({ title: "Connecting to Google...", description: "Please wait while we redirect you." });
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast({
          title: "Google sign-in failed",
          description: "Could not connect to Google. Please try again.",
          variant: "destructive",
        });
        setGoogleLoading(false);
      }
    } catch {
      toast({
        title: "Google sign-in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setGoogleLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      if (error) {
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Email not verified",
            description: "Please check your inbox and verify your email before logging in.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password. If you signed up with Google, please use the 'Log in with Google' button instead.",
            variant: "destructive",
          });
        }
      }
    } catch {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const verifyCaptcha = async (token: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke("verify-recaptcha", {
        body: { token },
      });
      if (error) {
        console.error("CAPTCHA verification error:", error);
        return false;
      }
      return data?.success === true;
    } catch {
      console.error("CAPTCHA verification failed");
      return false;
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsLoading(true);
    try {
      // Verify CAPTCHA server-side
      if (captchaToken) {
        const captchaValid = await verifyCaptcha(captchaToken);
        if (!captchaValid) {
          toast({
            title: "CAPTCHA verification failed",
            description: "Please refresh and try again.",
            variant: "destructive",
          });
          setCaptchaToken(null);
          setIsLoading(false);
          return;
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: signupEmail.trim(),
        password: signupPassword,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast({
          title: "Account already exists",
          description: "An account with this email already exists. Please use your original sign-in method (email & password or Google) to log in.",
          variant: "destructive",
        });
      } else {
        // Switch to OTP verification mode
        setVerifyEmail(signupEmail.trim());
        setOtpCode("");
        setOtpError("");
        setMode("verify");
        toast({
          title: "Verification code sent ✉️",
          description: "We sent a 6-digit code to " + signupEmail.trim() + ". Check your spam/junk folder if you don't see it.",
        });
      }
    } catch {
      toast({ title: "Sign up failed", description: "An unexpected error occurred.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setOtpError("Please enter the full 6-digit code");
      return;
    }

    setIsLoading(true);
    setOtpError("");
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: verifyEmail,
        token: otpCode,
        type: "signup",
      });
      if (error) {
        setOtpError("Invalid or expired code. Please check and try again.");
        toast({
          title: "Verification failed",
          description: error.message,
          variant: "destructive",
        });
      }
      // Success is handled by onAuthStateChange
    } catch {
      setOtpError("An unexpected error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: verifyEmail,
      });
      if (error) {
        toast({ title: "Resend failed", description: error.message, variant: "destructive" });
      } else {
        toast({
          title: "Code resent ✉️",
          description: "A new verification code has been sent to " + verifyEmail,
        });
        setOtpCode("");
        setOtpError("");
      }
    } catch {
      toast({ title: "Resend failed", description: "An unexpected error occurred.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const trimmed = forgotEmail.trim();
    if (!trimmed) {
      errs.email = "Email address is required";
    } else if (!validateEmail(trimmed)) {
      errs.email = "Please enter a valid email address";
    }
    setForgotErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast({ title: "Request failed", description: error.message, variant: "destructive" });
      } else {
        setForgotSent(true);
        toast({
          title: "Reset link sent ✉️",
          description: "Check your inbox (and spam folder) for the password reset link.",
        });
      }
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
                <>
                  <Button
                    variant="outline"
                    className="w-full mb-4"
                    onClick={handleGoogleLogin}
                    disabled={isLoading || googleLoading}
                  >
                    {googleLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    )}
                    {googleLoading
                      ? "Connecting to Google..."
                      : mode === "login"
                        ? "Log in with Google"
                        : "Sign up with Google"}
                  </Button>
                  <div className="flex items-center gap-3 my-6">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-muted-foreground text-sm">or</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                </>
              )}

              {/* Login Form */}
              {mode === "login" && (
                <form onSubmit={handleEmailLogin} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input
                      id="login-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (loginErrors.email) setLoginErrors((p) => ({ ...p, email: "" }));
                      }}
                      aria-invalid={!!loginErrors.email}
                    />
                    {loginErrors.email && <p className="text-sm text-destructive">{loginErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline"
                        onClick={() => switchMode("forgot")}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          if (loginErrors.password) setLoginErrors((p) => ({ ...p, password: "" }));
                        }}
                        aria-invalid={!!loginErrors.password}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                    Log In with Email
                  </Button>
                </form>
              )}

              {/* Signup Form */}
              {mode === "signup" && (
                <form onSubmit={handleEmailSignup} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      autoComplete="name"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (signupErrors.fullName) setSignupErrors((p) => ({ ...p, fullName: "" }));
                      }}
                      aria-invalid={!!signupErrors.fullName}
                    />
                    {signupErrors.fullName && <p className="text-sm text-destructive">{signupErrors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={(e) => {
                        setSignupEmail(e.target.value);
                        if (signupErrors.email) setSignupErrors((p) => ({ ...p, email: "" }));
                      }}
                      aria-invalid={!!signupErrors.email}
                    />
                    {signupErrors.email && <p className="text-sm text-destructive">{signupErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Min 8 chars, uppercase, lowercase & number"
                        value={signupPassword}
                        onChange={(e) => {
                          setSignupPassword(e.target.value);
                          if (signupErrors.password) setSignupErrors((p) => ({ ...p, password: "" }));
                        }}
                        aria-invalid={!!signupErrors.password}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signupErrors.password && <p className="text-sm text-destructive">{signupErrors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-confirm"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (signupErrors.confirmPassword) setSignupErrors((p) => ({ ...p, confirmPassword: "" }));
                        }}
                        aria-invalid={!!signupErrors.confirmPassword}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowConfirm(!showConfirm)}
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {signupErrors.confirmPassword && <p className="text-sm text-destructive">{signupErrors.confirmPassword}</p>}
                  </div>

                  {/* reCAPTCHA */}
                  <div className="space-y-2">
                    <ReCaptcha
                      onVerify={(token) => {
                        setCaptchaToken(token);
                        if (signupErrors.captcha) setSignupErrors((p) => ({ ...p, captcha: "" }));
                      }}
                      onExpire={() => setCaptchaToken(null)}
                    />
                    {signupErrors.captcha && <p className="text-sm text-destructive text-center">{signupErrors.captcha}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                    Sign Up with Email
                  </Button>
                </form>
              )}

              {/* OTP Verification */}
              {mode === "verify" && (
                <form onSubmit={handleVerifyOTP} className="space-y-6" noValidate>
                  <div className="flex justify-center">
                    <ShieldCheck className="w-16 h-16 text-primary opacity-80" />
                  </div>
                  <p className="text-muted-foreground text-sm text-center">
                    Enter the 6-digit verification code we sent to your email. Check your spam/junk folder if you don't see it.
                  </p>

                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {otpError && <p className="text-sm text-destructive text-center">{otpError}</p>}

                  <Button type="submit" className="w-full" disabled={isLoading || otpCode.length !== 6}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    Verify & Continue
                  </Button>

                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={handleResendCode}
                      disabled={isLoading}
                    >
                      Didn't receive the code? Resend
                    </button>
                    <br />
                    <button
                      type="button"
                      className="text-sm text-muted-foreground hover:underline"
                      onClick={() => switchMode("signup")}
                    >
                      ← Back to Sign Up
                    </button>
                  </div>
                </form>
              )}

              {/* Forgot Password Form */}
              {mode === "forgot" && (
                forgotSent ? (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    <p className="text-foreground font-medium">Reset link sent!</p>
                    <p className="text-muted-foreground text-sm">
                      Check your inbox at <strong>{forgotEmail}</strong> for a password reset link. Don't forget to check your spam/junk folder.
                    </p>
                    <Button variant="outline" onClick={() => switchMode("login")} className="mt-4">
                      Back to Login
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4" noValidate>
                    <p className="text-muted-foreground text-sm">
                      Enter the email address associated with your account and we'll send you a link to reset your password.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">Email Address</Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value);
                          if (forgotErrors.email) setForgotErrors((p) => ({ ...p, email: "" }));
                        }}
                        aria-invalid={!!forgotErrors.email}
                      />
                      {forgotErrors.email && <p className="text-sm text-destructive">{forgotErrors.email}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                      Send Reset Link
                    </Button>

                    <button
                      type="button"
                      className="text-sm text-primary hover:underline w-full text-center mt-2"
                      onClick={() => switchMode("login")}
                    >
                      ← Back to Login
                    </button>
                  </form>
                )
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
