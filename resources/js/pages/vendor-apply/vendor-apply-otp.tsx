import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { router, useForm } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import OtpMaxAttemptDialog from "./components/otp-max-attempt-dialog";
import OtpResendButton from "./components/otp-resend-button";
import OtpSuccessDialog from "./components/otp-success-dialog";
import OtpTimer from "./components/otp-timer";

type VendorOtpFormType = {
  otp_code: string;
  vendor_id: number;
};

type OtpMetaData = {
  attempts: number | null;
  maxAttempts: number | null;
  expiresAt: number | null;
  canResend: boolean;
  resendCooldown: number;
};

export default function VendorOTPPage({ vendor_id, otp_metaData }: { vendor_id: number; otp_metaData: OtpMetaData }) {
  const [otp, setOtp] = useState("");
  const [attempts, setAttempts] = useState(otp_metaData.attempts || 0);
  const [timeLeft, setTimeLeft] = useState(otp_metaData.expiresAt || 0);
  const [error, setError] = useState("");
  const [maxAttempts, setMaxAttempts] = useState(otp_metaData.maxAttempts || 0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMaxAttemptsModal, setShowMaxAttemptsModal] = useState(false);

  const { setData, post, processing, errors } = useForm<VendorOtpFormType>({
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

  // Submit OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    if (attempts >= maxAttempts) {
      setShowMaxAttemptsModal(true);
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setError("");

    try {
      post(route("vendor.apply.otp.store"), {
        onSuccess: (success) => {
          setShowSuccessModal(true);
          console.log("onSuccess block", success);
        },
        onError: (error) => {
          console.log("onError block", error);

          setAttempts(+error?.otp_attempts);
          setMaxAttempts(+error?.otp_maxAttempts);

          if (+error?.otp_attempts >= +error?.otp_maxAttempts) {
            setShowMaxAttemptsModal(true);
          } else {
            setError(`Invalid OTP. ${+error?.otp_maxAttempts - +error?.otp_attempts} attempts remaining.`);
          }

          setOtp("");
        },
      });
    } catch (_) {
      setError("Network error. Please try again.");
    }
  };

  function handleResendOtp() {
    // REFRESH THE CURRENT PAGE
    router.visit(route("vendor.apply.otp.page"), { preserveState: false });
  }

  function handleClickResendButton() {
    // RESEND OTP CONTROLLER
    router.visit(route("vendor.apply.otp.resend"), { method: "post", data: { vendor_id: vendor_id } });
  }

  const isExpired = timeLeft <= 0;
  const isMaxAttempts = attempts >= maxAttempts;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your registered email</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <OtpTimer timeLeft={timeLeft} />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center gap-2">
              <InputOTP
                name="otp_code"
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  setData("otp_code", value);
                }}
              >
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
            {errors.otp_code && <p className="m-2 block text-sm text-destructive">{errors.otp_code}</p>}
            {errors.vendor_id && <p className="m-2 block text-sm text-destructive">{errors.vendor_id}</p>}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {attempts > 0 && (
              <div className="text-center text-sm font-semibold text-muted-foreground">
                Attempts: {attempts}/{maxAttempts}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isExpired || isMaxAttempts || processing}>
              verify otp
            </Button>
          </form>

          <OtpResendButton
            processing={processing}
            canResend={otp_metaData.canResend}
            resendCooldown={otp_metaData.resendCooldown}
            handleClickResendButton={handleClickResendButton}
          />
        </CardContent>
      </Card>

      {/* Success Modal */}
      <OtpSuccessDialog showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />

      {/* Max Attempts Modal */}
      <OtpMaxAttemptDialog
        showMaxAttemptsModal={showMaxAttemptsModal}
        setShowMaxAttemptsModal={setShowMaxAttemptsModal}
        handleResendOtp={handleResendOtp}
      />
    </div>
  );
}
