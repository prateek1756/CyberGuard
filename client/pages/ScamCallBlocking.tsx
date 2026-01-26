import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneOff, Shield, AlertTriangle } from "lucide-react";

export default function ScamCallBlocking() {
  return (
    <div className="relative">
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Scam Call Blocking
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Real-time protection against spam and scam calls
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-gradient-to-b from-card/60 to-card/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PhoneOff className="h-5 w-5 text-primary" />
                Call Protection Status
              </CardTitle>
              <CardDescription>
                Mobile app required for full call blocking functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-yellow-500/20 bg-yellow-500/10 p-4">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Mobile App Required</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Scam call blocking requires native mobile app integration with CallKit (iOS) or TelecomManager (Android).
                  This feature will be available in our upcoming mobile application.
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Features Coming Soon:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time spam number database</li>
                    <li>• Community-based reporting</li>
                    <li>• Whitelist/blacklist management</li>
                    <li>• Caller ID verification</li>
                  </ul>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Current Protection:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Educational awareness</li>
                    <li>• Scam identification tips</li>
                    <li>• Reporting mechanisms</li>
                    <li>• Safety guidelines</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}