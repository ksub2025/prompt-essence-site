import { Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OTPVerificationProps {
  otpCode: string;
  otpError: string;
  isLoading: boolean;
  onOtpChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onBack: () => void;
}

const OTPVerification = ({
  otpCode,
  otpError,
  isLoading,
  onOtpChange,
  onSubmit,
  onResend,
  onBack,
}: OTPVerificationProps) => (
  <form onSubmit={onSubmit} className="space-y-6" noValidate>
    <div className="flex justify-center">
      <ShieldCheck className="w-16 h-16 text-primary opacity-80" />
    </div>
    <p className="text-muted-foreground text-sm text-center">
      Enter the 6-digit verification code we sent to your email. Check your spam/junk folder if you don't see it.
    </p>

    <div className="flex justify-center">
      <InputOTP maxLength={6} value={otpCode} onChange={onOtpChange}>
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
        onClick={onResend}
        disabled={isLoading}
      >
        Didn't receive the code? Resend
      </button>
      <br />
      <button
        type="button"
        className="text-sm text-muted-foreground hover:underline"
        onClick={onBack}
      >
        ← Back to Sign Up
      </button>
    </div>
  </form>
);

export default OTPVerification;
