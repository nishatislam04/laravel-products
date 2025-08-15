import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface OtpSuccessDialogProps {
  showSuccessModal: boolean;
  setShowSuccessModal: (value: boolean) => void;
}

export default function OtpSuccessDialog({ showSuccessModal, setShowSuccessModal }: OtpSuccessDialogProps) {
  return (
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
  );
}
