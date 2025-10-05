import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BadgeCheck,
  Camera,
  Link2,
  MapPin,
  MessageSquareWarning,
  PhoneOff,
  Shield,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Tilt from "@/components/motion/Tilt";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function Index() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });

  if (typeof window !== "undefined") {
    window.onmousemove = (e) => {
      mx.set((e.clientX - window.innerWidth / 2) / 40);
      my.set((e.clientY - window.innerHeight / 2) / 40);
    };
  }

  return (
    <div className="relative">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:24px_24px] animate-grid-pan-slow" />
        <motion.div
          style={{ x: sx, y: sy }}
          className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,_hsl(var(--primary))/35%,_transparent_70%)] blur-2xl"
        />
        <motion.div
          style={{ x: sy, y: sx }}
          className="absolute right-[-10%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,_hsl(var(--accent))/30%,_transparent_70%)] blur-2xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.03),transparent)]" />
      </div>

      {/* Hero */}
      <section className="container relative flex flex-col items-center gap-8 pb-16 pt-14 text-center md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-24 w-[min(900px,95%)] rounded-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 blur-xl animate-gradient-x"
        />
        <motion.span
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground backdrop-blur"
        >
          <Shield className="h-4 w-4 text-primary" /> Real‑time digital safety
        </motion.span>
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-extrabold leading-tight tracking-[-0.02em] text-transparent md:text-6xl"
        >
          <span className="block">CyberGuard</span>
          <span className="block">Always One Step Ahead</span>
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-2xl text-balance text-muted-foreground md:text-lg"
        >
          Block scam calls, scan links before you click, detect fraud messages,
          verify profiles, spot deepfakes, and get location‑based alerts—daily.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" className="group relative overflow-hidden">
            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.12),transparent)] bg-[length:200%_100%] group-hover:animate-shine" />
            Join the Waitlist
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="/scanner">Try Web Scanner</a>
          </Button>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-4 flex items-center gap-6 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <PhoneOff className="h-4 w-4 text-primary" /> Scam call blocking
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Link2 className="h-4 w-4 text-primary" /> Phishing link scanning
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <MessageSquareWarning className="h-4 w-4 text-primary" /> Fraud
            message detection
          </div>
        </motion.div>
      </section>

      {/* Features (highlights) */}
      <section className="container pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <FeatureCard
            icon={<PhoneOff className="h-5 w-5" />}
            title="Scam call blocking"
            desc="Auto-detects and blocks known scam and spam callers in real time."
          />
          <FeatureCard
            icon={<Link2 className="h-5 w-5" />}
            title="Phishing link scanning"
            desc="Instantly scans URLs and flags suspicious redirects, TLDs, and tricks."
          />
          <FeatureCard
            icon={<MessageSquareWarning className="h-5 w-5" />}
            title="Fraud message detection"
            desc="AI-assisted analysis to catch social engineering and payment traps."
          />
          <FeatureCard
            icon={<BadgeCheck className="h-5 w-5" />}
            title="Fake profile verification"
            desc="Spot catfishes with metadata checks and cross‑network signals."
          />
          <FeatureCard
            icon={<Camera className="h-5 w-5" />}
            title="Deepfake detection"
            desc="Identify manipulated media with frame‑level artifact analysis."
          />
          <FeatureCard
            icon={<Sun className="h-5 w-5" />}
            title="Daily cyber safety tips"
            desc="Bite‑sized, practical tips to stay safe every day."
          />
          <FeatureCard
            className="md:col-span-2 lg:col-span-3"
            icon={<MapPin className="h-5 w-5" />}
            title="Location‑based scam alerts"
            desc="Get notified about active scams happening near you."
          />
        </motion.div>
      </section>

      {/* Trust strip */}
      <section className="container pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" /> Privacy-first • On-device
          controls • Free basic protection
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
    >
      <Tilt className="[transform-style:preserve-3d]">
        <Card
          className={cn(
            "group relative overflow-hidden border-primary/10 bg-gradient-to-b from-card/60 to-card/30 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_0_1px_hsl(var(--ring))]",
            className,
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 blur-2xl animate-float"
          />
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                {icon}
              </span>
              <CardTitle className="text-base">{title}</CardTitle>
            </div>
            <CardDescription className="pt-1">{desc}</CardDescription>
          </CardHeader>
        </Card>
      </Tilt>
    </motion.div>
  );
}
