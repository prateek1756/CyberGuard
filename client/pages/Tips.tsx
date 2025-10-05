import { Sun } from "lucide-react";

export default function Tips() {
  const tips = [
    "Never share OTPs or recovery codes with anyone.",
    "Manually type banking URLs; avoid clicking links from messages.",
    "Verify social profiles via reverse image search and mutuals.",
    "Use unique passwords and a trusted password manager.",
    "Enable multi‑factor authentication for all critical accounts.",
    "Be cautious of urgent payment requests and unknown attachments.",
  ];
  return (
    <div className="container py-12">
      <div className="mb-6 flex items-center gap-2">
        <Sun className="h-5 w-5 text-primary" />
        <h1 className="text-3xl font-bold">Daily cyber safety tips</h1>
      </div>
      <ul className="space-y-3">
        {tips.map((t, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary/70" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
