import { Link } from "react-router-dom";
import { Shield, PhoneOff, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute inset-0 rounded-xl bg-primary/30 blur-md" />
            <Shield className="relative h-7 w-7 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-primary via-accent to-white bg-clip-text text-lg font-bold text-transparent">
            CyberShakti
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/features"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Features
          </Link>
          <Link
            to="/phishing-scanner"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Scanner
          </Link>
          <Link
            to="/tips"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Tips
          </Link>
          <Link
            to="/alerts"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <MapPin className="h-4 w-4" /> Alerts
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="hidden sm:inline-flex"
          >
            <Link to="/phishing-scanner" className="flex items-center">
              <PhoneOff className="mr-2 h-4 w-4" /> Try Web Tools
            </Link>
          </Button>
          <Button asChild size="sm">
            <a href="#download">Get the App</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
