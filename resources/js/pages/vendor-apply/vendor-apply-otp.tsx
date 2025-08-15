import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type VendorOtpFormType = {
  otp_code: string;
  vendor_id: number;
};

export default function VendorOTPPage({ vendor_id }: { vendor_id: number }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMaxAttemptsModal, setShowMaxAttemptsModal] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { data, setData, post, processing, errors } = useForm<VendorOtpFormType>({
    otp_code: "",
    vendor_id: vendor_id,
  });

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
  };

  // Submit OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    if (attempts >= 3) {
      setShowMaxAttemptsModal(true);
      return;
    }

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      console.log(data);

      // Simulate API call to Laravel backend
      post(route("vendor.apply.otp.store"), {
        onSuccess: () => {
          setShowSuccessModal(true);
        },
        onError: () => {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);

          if (newAttempts >= 3) {
            setShowMaxAttemptsModal(true);
          } else {
            setError(`Invalid OTP. ${3 - newAttempts} attempts remaining.`);
          }

          // Clear OTP inputs
          setOtp(["", "", "", "", "", ""]);
          inputRefs.current[0]?.focus();
        },
      });
    } catch (error) {
      setError("Network error. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      await fetch("/api/vendor/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTimeLeft(300);
      setAttempts(0);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
      console.log(error);
    }
  };

  const isExpired = timeLeft <= 0;
  const isMaxAttempts = attempts >= 3;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your registered email</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span className={`font-mono ${timeLeft <= 60 ? "text-destructive" : "text-muted-foreground"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  // ref={(el) => (inputRefs.current[index] = el)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  name="otp_code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    handleOtpChange(index, e.target.value);
                    setData({
                      otp_code: otp.join(""),
                      vendor_id: vendor_id,
                    });
                  }}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="h-12 w-12 text-center font-mono text-lg"
                  disabled={isExpired || isMaxAttempts || isSubmitting || processing}
                />
              ))}
            </div>
            {errors.otp_code && <p className="m-2 block text-sm text-destructive">{errors.otp_code}</p>}

            {/* Error Display */}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Attempts Counter */}
            {attempts > 0 && (
              <div className="text-center text-sm font-semibold text-muted-foreground">Attempts: {attempts}/3</div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isExpired || isMaxAttempts || isSubmitting || processing}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>

          {/* Resend Button */}
          {(isExpired || attempts > 0) && !isMaxAttempts && (
            <div className="text-center">
              <Button variant="outline" onClick={handleResendOtp} disabled={isSubmitting}>
                Resend OTP
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <DialogTitle>Verification Successful</DialogTitle>
            </div>
            <DialogDescription>
              Your OTP has been verified successfully. You can now proceed with your vendor registration.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessModal(false)} className="w-full">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Max Attempts Modal */}
      <Dialog open={showMaxAttemptsModal} onOpenChange={setShowMaxAttemptsModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <DialogTitle>Maximum Attempts Reached</DialogTitle>
            </div>
            <DialogDescription>
              You have exceeded the maximum number of verification attempts. Please request a new OTP to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowMaxAttemptsModal(false);
                handleResendOtp();
              }}
              className="w-full"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
