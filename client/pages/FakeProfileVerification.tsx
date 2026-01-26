import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Upload, AlertTriangle } from "lucide-react";

export default function FakeProfileVerification() {
  return (
    <div className="relative">
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Fake Profile Verification
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Advanced verification to detect fake profiles and catfishing attempts
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-gradient-to-b from-card/60 to-card/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                Profile Analysis
              </CardTitle>
              <CardDescription>
                Upload profile images or provide social media links for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-yellow-500/20 bg-yellow-500/10 p-4">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Feature In Development</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This feature requires integration with reverse image search APIs and facial recognition services.
                  Currently in development phase.
                </p>
              </div>
              
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-2">Upload Profile Image</p>
                <p className="text-xs text-muted-foreground">
                  Drag and drop or click to upload (Coming Soon)
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Planned Features:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Reverse image search</li>
                    <li>• Facial recognition analysis</li>
                    <li>• Social media cross-verification</li>
                    <li>• Metadata extraction</li>
                    <li>• Behavioral pattern analysis</li>
                  </ul>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Current Tips:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Check for limited photos</li>
                    <li>• Verify social media presence</li>
                    <li>• Look for inconsistent details</li>
                    <li>• Request video calls</li>
                    <li>• Trust your instincts</li>
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