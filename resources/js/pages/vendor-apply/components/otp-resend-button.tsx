import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
  processing: boolean;
  canResend: boolean;
  resendCooldown: number;
  handleClickResendButton: () => void;
};

export default function OtpResendButton({ processing, canResend, resendCooldown, handleClickResendButton }: Props) {
  const [cooldown, setCooldown] = useState(Math.ceil(resendCooldown));

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => Math.max(prev - 1, 0)), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (canResend) {
    return (
      <div className="text-center">
        <Button variant="outline" onClick={handleClickResendButton} disabled={processing}>
          Resend OTP
        </Button>
      </div>
    );
  }

  if (cooldown > 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Resend OTP available in <span className="font-semibold">{formatTime(cooldown)}</span>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Button variant="outline" onClick={handleClickResendButton} disabled={processing}>
        Resend OTP
      </Button>
    </div>
  );
}
