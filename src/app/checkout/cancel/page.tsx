import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center">
        <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-3xl font-bold tracking-tight">
          Checkout Canceled
        </h1>
        <p className="mt-4 text-muted-foreground">
          Your payment was not completed. No charges were made. If you have any
          questions or want to arrange a different payment method, feel free to
          reach out.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/resources">
            <Button variant="outline">Back to Resources</Button>
          </Link>
          <Link href="/contact">
            <Button>Contact Me</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
