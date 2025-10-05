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
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Tilt from "@/components/motion/Tilt";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

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

export default function Features() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:24px_24px] animate-grid-pan-slow" />
      </div>
      <div className="container py-12">
        <div className="mb-8 text-center">
          <motion.h1
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl font-extrabold tracking-tight md:text-5xl"
          >
            All features
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto mt-2 max-w-2xl text-muted-foreground"
          >
            CyberGuard brings a full safety suite to your devices.
          </motion.p>
        </div>

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
      </div>
    </div>
  );
}
