import { Mail, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  loginEmail: string;
  loginPassword: string;
  loginErrors: Record<string, string>;
  showPassword: boolean;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onForgotPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({
  loginEmail,
  loginPassword,
  loginErrors,
  showPassword,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onForgotPassword,
  onSubmit,
}: LoginFormProps) => (
  <form onSubmit={onSubmit} className="space-y-4" noValidate>
    <div className="space-y-2">
      <Label htmlFor="login-email">Email Address</Label>
      <Input
        id="login-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={loginEmail}
        onChange={(e) => onEmailChange(e.target.value)}
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
          onClick={onForgotPassword}
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
          onChange={(e) => onPasswordChange(e.target.value)}
          aria-invalid={!!loginErrors.password}
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
      {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password}</p>}
    </div>

    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
      Log In with Email
    </Button>
  </form>
);

export default LoginForm;
