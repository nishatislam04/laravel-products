import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function InputOtp({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <InputOTP name="otp_code" maxLength={6} value={value} onChange={onChange}>
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
