import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-lg border border-muted-foreground/20">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="flex items-center justify-center mb-4 gap-2">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <h1 className="text-2xl font-heading font-bold text-foreground">
              404 - Page Not Found
            </h1>
          </div>

          <p className="mt-2 text-muted-foreground font-sans text-sm">
            Oops! The page you're looking for doesn't exist or was moved.
          </p>

          <div className="mt-6">
            <Link href="/">
              <Button className="inline-flex gap-2 font-sans">
                <Home className="h-4 w-4" />
                Go Back Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
