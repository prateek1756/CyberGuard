import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function Alerts() {
  const [locEnabled, setLocEnabled] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [locError, setLocError] = useState<string | null>(null);

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported in this browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLocEnabled(true);
        setLocError(null);
      },
      (err) => setLocError(err.message),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  return (
    <div className="container py-12">
      <Card className="bg-gradient-to-b from-card/60 to-card/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" /> Location-based scam
            alerts
          </CardTitle>
          <CardDescription>See active scam patterns near you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!locEnabled ? (
            <Button onClick={requestLocation} className="w-full">
              Enable Location
            </Button>
          ) : (
            <div className="space-y-2 text-sm">
              {coords && (
                <p className="text-muted-foreground">
                  Approximate location: {coords.lat.toFixed(3)},{" "}
                  {coords.lon.toFixed(3)}
                </p>
              )}
              <ul className="list-inside list-disc">
                <li>Spike in parcel delivery phishing SMS this week.</li>
                <li>Reports of fake customer support calls in nearby area.</li>
                <li>Beware of QR code parking scams around public lots.</li>
              </ul>
            </div>
          )}
          {locError && <p className="text-xs text-red-400">{locError}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
