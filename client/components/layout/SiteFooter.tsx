import { Shield } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background/60">
      <div className="container grid gap-6 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">CyberGuard</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Real-time protection from scams, phishing, and deepfakes. Built for
            everyday safety.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Product</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <a href="/features" className="hover:text-foreground">
                Features
              </a>
            </li>
            <li>
              <a href="/scanner" className="hover:text-foreground">
                Web Tools
              </a>
            </li>
            <li>
              <a href="/tips" className="hover:text-foreground">
                Daily Tips
              </a>
            </li>
            <li>
              <a href="/alerts" className="hover:text-foreground">
                Location Alerts
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-2" id="download">
          <p className="text-sm font-semibold">Get the app</p>
          <div className="text-sm text-muted-foreground">
            Available soon on iOS and Android. Join the waitlist from the
            homepage.
          </div>
        </div>
      </div>
      <div className="border-t py-4">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CyberGuard. All rights reserved.</p>
          <p>Security first. Privacy by design.</p>
        </div>
      </div>
    </footer>
  );
}
