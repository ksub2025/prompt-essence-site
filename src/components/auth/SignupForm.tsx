import { Mail, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReCaptcha from "@/components/ReCaptcha";

interface SignupFormProps {
  fullName: string;
  signupEmail: string;
  signupPassword: string;
  confirmPassword: string;
  signupErrors: Record<string, string>;
  showPassword: boolean;
  showConfirm: boolean;
  isLoading: boolean;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmChange: (value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirm: () => void;
  onCaptchaVerify: (token: string) => void;
  onCaptchaExpire: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignupForm = ({
  fullName,
  signupEmail,
  signupPassword,
  confirmPassword,
  signupErrors,
  showPassword,
  showConfirm,
  isLoading,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmChange,
  onTogglePassword,
  onToggleConfirm,
  onCaptchaVerify,
  onCaptchaExpire,
  onSubmit,
}: SignupFormProps) => (
  <form onSubmit={onSubmit} className="space-y-4" noValidate>
    <div className="space-y-2">
      <Label htmlFor="signup-name">Full Name</Label>
      <Input
        id="signup-name"
        type="text"
        autoComplete="name"
        placeholder="John Doe"
        value={fullName}
        onChange={(e) => onFullNameChange(e.target.value)}
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
        onChange={(e) => onEmailChange(e.target.value)}
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
          onChange={(e) => onPasswordChange(e.target.value)}
          aria-invalid={!!signupErrors.password}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onTogglePassword}
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
          onChange={(e) => onConfirmChange(e.target.value)}
          aria-invalid={!!signupErrors.confirmPassword}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onToggleConfirm}
          tabIndex={-1}
        >
          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {signupErrors.confirmPassword && <p className="text-sm text-destructive">{signupErrors.confirmPassword}</p>}
    </div>

    <div className="space-y-2">
      <ReCaptcha onVerify={onCaptchaVerify} onExpire={onCaptchaExpire} />
      {signupErrors.captcha && <p className="text-sm text-destructive text-center">{signupErrors.captcha}</p>}
    </div>

    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
      Sign Up with Email
    </Button>
  </form>
);

export default SignupForm;
