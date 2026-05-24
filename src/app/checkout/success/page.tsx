import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold tracking-tight">
          Payment Successful!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your purchase. You should receive an email from
          LemonSqueezy with your download link shortly.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/resources">
            <Button variant="outline">Back to Resources</Button>
          </Link>
          <Link href="/contact">
            <Button>Need Help?</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
