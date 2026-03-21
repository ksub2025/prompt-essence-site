import { Mail, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordFormProps {
  forgotEmail: string;
  forgotErrors: Record<string, string>;
  forgotSent: boolean;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const ForgotPasswordForm = ({
  forgotEmail,
  forgotErrors,
  forgotSent,
  isLoading,
  onEmailChange,
  onSubmit,
  onBack,
}: ForgotPasswordFormProps) => {
  if (forgotSent) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
        <p className="text-foreground font-medium">Reset link sent!</p>
        <p className="text-muted-foreground text-sm">
          Check your inbox at <strong>{forgotEmail}</strong> for a password reset link. Don't forget to check your spam/junk folder.
        </p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
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
          onChange={(e) => onEmailChange(e.target.value)}
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
        onClick={onBack}
      >
        ← Back to Login
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
