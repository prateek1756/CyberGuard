import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link2, MessageSquareWarning } from "lucide-react";
import { cn } from "@/lib/utils";

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function scoreUrl(input: string) {
  let score = 0;
  let reasons: string[] = [];
  try {
    const url = new URL(input.trim());
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:") {
      score += 15;
      reasons.push("Uses non-HTTPS protocol");
    }
    if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) {
      score += 40;
      reasons.push("IP address used as domain");
    }
    if (host.includes("xn--")) {
      score += 30;
      reasons.push("Punycode domain detected");
    }
    const parts = host.split(".");
    if (parts.length > 3) {
      score += 15;
      reasons.push("Excessive subdomains");
    }
    const tld = parts.at(-1) || "";
    const suspiciousTLDs = new Set([
      "zip",
      "mov",
      "work",
      "gq",
      "loan",
      "click",
      "country",
      "tk",
      "ml",
    ]);
    if (suspiciousTLDs.has(tld)) {
      score += 15;
      reasons.push(`Suspicious TLD .${tld}`);
    }
    const path = `${url.pathname}${url.search}`.toLowerCase();
    if (path.includes("@") || path.includes("%00") || path.includes("//")) {
      score += 10;
      reasons.push("Obfuscated path characters");
    }
    if (input.length > 100) {
      score += 10;
      reasons.push("Unusually long URL");
    }
  } catch {
    score += 50;
    reasons.push("Malformed URL");
  }
  score = clamp(score, 0, 100);
  let verdict: "safe" | "suspicious" | "danger" = "safe";
  if (score >= 75) verdict = "danger";
  else if (score >= 50) verdict = "suspicious";
  return { score, verdict, reasons } as const;
}

function analyzeMessage(text: string) {
  let score = 0;
  const reasons: string[] = [];
  const t = text.toLowerCase();
  const patterns: Array<[RegExp, number, string]> = [
    [/otp|one[-\s]?time|verification\s?code/, 20, "Asks for OTP/verification"],
    [/urgent|immediately|act\s?now|final\s?notice/, 15, "Artificial urgency"],
    [
      /(crypto|bitcoin|usdt|wallet|seed\s?phrase)/,
      15,
      "Crypto payment/seed phrase",
    ],
    [/(gift\s?card|itunes|steam)\s?code/, 15, "Gift card payment"],
    [/(wire|bank\s?transfer)/, 10, "Wire transfer request"],
    [
      /click\s?link|login\s?to\s?confirm|reset\s?password/,
      15,
      "Suspicious link/credential theft",
    ],
    [/(social\s?security|aadhar|pan|ssn)/, 15, "Sensitive ID request"],
  ];
  for (const [rx, inc, why] of patterns) {
    if (rx.test(t)) {
      score += inc;
      reasons.push(why);
    }
  }
  if (text.length < 8) {
    score += 10;
    reasons.push("Very short message");
  }
  score = clamp(score, 0, 100);
  let verdict: "safe" | "suspicious" | "danger" = "safe";
  if (score >= 75) verdict = "danger";
  else if (score >= 45) verdict = "suspicious";
  return { score, verdict, reasons } as const;
}

function RiskPill({
  level,
  score,
}: {
  level: "safe" | "suspicious" | "danger";
  score: number;
}) {
  const styles = {
    safe: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    suspicious: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
    danger: "bg-red-500/15 text-red-300 ring-red-500/30",
  } as const;
  const label =
    level === "safe"
      ? "Likely Safe"
      : level === "suspicious"
        ? "Suspicious"
        : "Dangerous";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1",
        styles[level],
      )}
    >
      <span className="font-semibold tracking-wide">{label}</span>
      <span className="text-foreground/60">{score}</span>
    </span>
  );
}

export default function Scanner() {
  const [url, setUrl] = useState(
    "https://signin-appleid.com-reset-password.security-help.center/login",
  );
  const [msg, setMsg] = useState("");
  const urlResult = useMemo(() => (url ? scoreUrl(url) : null), [url]);
  const msgResult = useMemo(() => (msg ? analyzeMessage(msg) : null), [msg]);

  return (
    <div className="container grid gap-6 py-12 lg:grid-cols-2">
      <div>
        <Card className="bg-gradient-to-b from-card/60 to-card/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" /> Phishing link scanner
            </CardTitle>
            <CardDescription>
              Paste a link to evaluate risk. This is a basic heuristic and not a
              guarantee.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/login?token=..."
                className="h-11 flex-1 rounded-md border bg-background/60 px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button className="h-11">Scan</Button>
            </div>
            {urlResult && (
              <div className="flex items-start justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm text-muted-foreground">Risk score</p>
                  <div className="mt-1 flex items-center gap-2">
                    <RiskPill
                      level={urlResult.verdict}
                      score={urlResult.score}
                    />
                  </div>
                  {urlResult.reasons.length > 0 && (
                    <ul className="mt-3 list-inside list-disc text-xs text-muted-foreground">
                      {urlResult.reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="relative mt-1 h-2 w-32 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full",
                      urlResult.verdict === "danger"
                        ? "bg-red-500"
                        : urlResult.verdict === "suspicious"
                          ? "bg-yellow-500"
                          : "bg-emerald-500",
                    )}
                    style={{ width: `${urlResult.score}%` }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-gradient-to-b from-card/60 to-card/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareWarning className="h-5 w-5 text-primary" /> Fraud
              message detector
            </CardTitle>
            <CardDescription>
              Paste a message or email text to analyze risk signals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={8}
              placeholder="Hey, urgent! Your account will be suspended. Click this link to verify and send the OTP you receive..."
              className="w-full rounded-md border bg-background/60 p-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {msgResult && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3">
                <RiskPill level={msgResult.verdict} score={msgResult.score} />
                {msgResult.reasons.length > 0 && (
                  <ul className="list-inside list-disc text-xs text-muted-foreground">
                    {msgResult.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
