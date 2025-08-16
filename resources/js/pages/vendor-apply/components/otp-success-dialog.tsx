import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { router } from "@inertiajs/react";
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
            Your OTP has been verified successfully. Now your vendor need to be approved via a admin user. Once
            approved, you will be notified via email.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button onClick={() => router.visit(route("home.page"))} className="min-w-24">
            Go to shopping
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
