import EnhancedScanner from "@/components/EnhancedScanner";

export default function PhishingScanner() {
  return (
    <div className="relative">
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Phishing Link Scanner
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Advanced multi-engine scanning with real-time threat detection
          </p>
        </div>
        <EnhancedScanner />
      </div>
    </div>
  );
}