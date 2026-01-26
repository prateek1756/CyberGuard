import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link2, Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanResult {
  score: number;
  safetyScore: number;
  verdict: "safe" | "suspicious" | "danger";
  reasons: string[];
  details: {
    virusTotal: { score: number; reasons: string[] };
    urlVoid: { score: number; reasons: string[] };
    safeBrowsing: { score: number; reasons: string[] };
    heuristic: { score: number; reasons: string[] };
  };
}

function RiskPill({ level, score }: { level: "safe" | "suspicious" | "danger"; score: number }) {
  const styles = {
    safe: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    suspicious: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
    danger: "bg-red-500/15 text-red-300 ring-red-500/30",
  } as const;

  const icons = {
    safe: CheckCircle,
    suspicious: AlertTriangle,
    danger: Shield,
  };

  const Icon = icons[level];
  const label = level === "safe" ? "Safe" : level === "suspicious" ? "Suspicious" : "Dangerous";

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1", styles[level])}>
      <Icon className="h-3 w-3" />
      <span className="font-semibold tracking-wide">{label}</span>
      <span className="text-foreground/60">{score}%</span>
    </span>
  );
}

export default function EnhancedScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scanUrl = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/scanner/scan-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || "Scan failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      <Card className="bg-gradient-to-b from-card/60 to-card/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Enhanced Phishing Link Scanner
          </CardTitle>
          <CardDescription>
            Advanced multi-engine scanning with 60%+ accuracy using VirusTotal, URLVoid, and Google Safe Browsing APIs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://suspicious-site.com/login"
              className="h-11 flex-1 rounded-md border bg-background/60 px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onKeyDown={(e) => e.key === "Enter" && scanUrl()}
            />
            <Button 
              onClick={scanUrl} 
              disabled={loading || !url.trim()}
              className="h-11 min-w-[100px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Scan URL"
              )}
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-red-400">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="space-y-4">
              {/* Main Result */}
              <div className="flex items-start justify-between rounded-md border p-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Overall Risk Assessment</p>
                  <RiskPill level={result.verdict} score={result.score} />
                  
                  {/* Show appropriate percentage based on verdict */}
                  <div className="mt-2">
                    {result.verdict === 'safe' ? (
                      <p className="text-sm text-emerald-400">
                        ✓ {result.safetyScore}% Safe
                      </p>
                    ) : (
                      <p className="text-sm text-red-400">
                        ⚠ {result.score}% Suspicious
                      </p>
                    )}
                  </div>
                  
                  {result.reasons.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Risk Factors:</p>
                      <ul className="list-inside list-disc text-xs text-muted-foreground space-y-1">
                        {result.reasons.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Risk Score Bar */}
                <div className="ml-4">
                  <div className="relative h-2 w-32 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full transition-all duration-500",
                        result.verdict === "danger"
                          ? "bg-red-500"
                          : result.verdict === "suspicious"
                          ? "bg-yellow-500"
                          : "bg-emerald-500"
                      )}
                      style={{ 
                        width: result.verdict === 'safe' 
                          ? `${result.safetyScore}%` 
                          : `${result.score}%` 
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-center text-muted-foreground">
                    {result.verdict === 'safe' 
                      ? `${result.safetyScore}% Safe` 
                      : `${result.score}% Risk`
                    }
                  </p>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="grid gap-3 md:grid-cols-2">
                <DetailCard
                  title="VirusTotal"
                  description="Antivirus engine analysis"
                  result={result.details.virusTotal}
                />
                <DetailCard
                  title="URLVoid"
                  description="Domain reputation check"
                  result={result.details.urlVoid}
                />
                <DetailCard
                  title="Google Safe Browsing"
                  description="Google's threat database"
                  result={result.details.safeBrowsing}
                />
                <DetailCard
                  title="Heuristic Analysis"
                  description="Pattern-based detection"
                  result={result.details.heuristic}
                />
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground">
              <Shield className="inline h-3 w-3 mr-1" />
              This scanner uses multiple security engines for enhanced accuracy. Always verify suspicious links with additional tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailCard({ 
  title, 
  description, 
  result 
}: { 
  title: string; 
  description: string; 
  result: { score: number; reasons: string[] }; 
}) {
  const getColor = (score: number) => {
    if (score >= 70) return "text-red-400";
    if (score >= 40) return "text-yellow-400";
    return "text-emerald-400";
  };

  return (
    <div className="rounded-md border bg-card/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <span className={cn("text-sm font-bold", getColor(result.score))}>
          {result.score}%
        </span>
      </div>
      
      {result.reasons.length > 0 && (
        <ul className="list-inside list-disc text-xs text-muted-foreground">
          {result.reasons.slice(0, 2).map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}