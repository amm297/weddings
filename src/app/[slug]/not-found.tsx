import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1 className="text-4xl font-headline font-bold mb-4">
        Wedding Not Found
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        The wedding you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
