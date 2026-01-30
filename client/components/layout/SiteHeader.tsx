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
          <div
            href="https://0b0db292af8145cabf7e9eb442f42cc7-br-ac2a54703baf4714912ce1bcc.fly.dev/phishing-scanner?reload=1769792378668#download"
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(36, 222, 180, 1)",
              borderRadius: "6px",
              color: "rgb(235, 255, 248)",
              fontSize: "14px",
              fontWeight: "500",
              gap: "8px",
              height: "36px",
              justifyContent: "center",
              lineHeight: "20px",
              textWrap: "nowrap",
              transitionDuration: "0.15s",
              transitionProperty:
                "color, background-color, border-color, text-decoration-color, fill, stroke",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              whiteSpace: "nowrap",
              padding: "0 12px",
            }}
          >
            Get the App
          </div>
        </div>
      </div>
    </header>
  );
}
