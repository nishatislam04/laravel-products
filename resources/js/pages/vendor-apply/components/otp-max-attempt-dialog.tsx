import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface OtpMaxAttemptDialogProps {
  showMaxAttemptsModal: boolean;
  setShowMaxAttemptsModal: (value: boolean) => void;
  handleResendOtp: () => void;
}

export default function OtpMaxAttemptDialog({
  showMaxAttemptsModal,
  setShowMaxAttemptsModal,
  handleResendOtp,
}: OtpMaxAttemptDialogProps) {
  return (
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
  );
}
