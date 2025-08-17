import { Clock } from "lucide-react";

interface OtpTimerProps {
  timeLeft: number;
}

export default function OtpTimer({ timeLeft }: OtpTimerProps) {
  const formatTime = (seconds: number) => {
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <Clock className="h-4 w-4" />
      <span
        className={`font-mono ${timeLeft <= 60 ? "text-destructive" : "text-muted-foreground"}`}>
        Expires at: <span className="font-semibold">{formatTime(timeLeft)}</span>
      </span>
    </div>
  );
}
