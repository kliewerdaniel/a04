import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
      <span className="text-8xl sm:text-9xl font-bold text-muted/30 tracking-tight select-none">404</span>
      <h1 className="mt-[-1.5rem] text-2xl sm:text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground max-w-md leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-8">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Home
        </Button>
      </Link>
    </div>
  );
}
