import { Alert, AlertDescription } from "@/components/ui/alert";
import SimpleLayout from "@/layouts/simple-layout";
import { User } from "@/types/user";
import { AlertCircle } from "lucide-react";
import { lazy, Suspense } from "react";
const VendorApplyFormLazy = lazy(() => import("./components/VendorApplyForm"));

export default function VendorApply({ user }: { user: User }) {
  return (
    <SimpleLayout title="Apply to Become a Vendor">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Apply to Become a Vendor</h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Join our marketplace and start selling your products to thousands of customers. Fill out the application
            form below and we'll review your submission within 2-3 business days.
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please ensure all information is accurate. Incomplete or false information may result in application
            rejection.
          </AlertDescription>
        </Alert>

        <Suspense fallback={<p>Loading...</p>}>
          <VendorApplyFormLazy user={user} />
        </Suspense>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By submitting this application, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Vendor Agreement
            </a>
            .
          </p>
        </div>
      </div>
    </SimpleLayout>
  );
}
