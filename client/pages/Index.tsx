import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Camera, Link2, MessageSquareWarning, ArrowRight, Sparkles, Zap, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const float = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Index() {
  return (
    <div className="relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:40px_40px] animate-pulse" />
        
        {/* Floating Elements */}
        <motion.div 
          variants={float}
          animate="animate"
          className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl"
        />
        <motion.div 
          variants={float}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute right-[15%] top-[60%] h-24 w-24 rounded-full bg-gradient-to-r from-accent/40 to-primary/20 blur-xl"
        />
        <motion.div 
          variants={float}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute left-[70%] top-[10%] h-20 w-20 rounded-full bg-gradient-to-r from-primary/25 to-accent/35 blur-lg"
        />
      </div>

      {/* Hero Section */}
      <section className="container relative flex flex-col items-center gap-10 pb-24 pt-24 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="group relative"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
          <div className="relative inline-flex items-center gap-3 rounded-full border border-primary/30 bg-background/80 px-6 py-3 text-sm font-medium text-primary backdrop-blur-xl">
            <Sparkles className="h-4 w-4 animate-pulse" /> 
            Next-Gen AI Protection
          </div>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-6"
        >
          <h1 className="relative max-w-5xl">
            <span className="block text-6xl font-black leading-tight md:text-8xl text-foreground">
              CyberShakti
            </span>
            <span className="mt-2 block text-2xl font-semibold md:text-3xl text-foreground">
              AI-Powered Digital Shield
            </span>
          </h1>
        </motion.div>
        
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl text-xl leading-relaxed text-muted-foreground/90"
        >
          Experience the future of cybersecurity with our advanced AI that detects deepfakes, 
          blocks phishing attempts, and protects against fraud in real-time.
        </motion.p>
        
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-6" asChild>
            <a href="/deepfake-detection">
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Eye className="mr-2 h-5 w-5" />
              Try AI Detection
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-primary/30 bg-background/50 backdrop-blur text-lg px-8 py-6 hover:bg-primary/10" asChild>
            <a href="/features">
              <Shield className="mr-2 h-5 w-5" />
              Explore Features
            </a>
          </Button>
        </motion.div>
      </section>

      {/* Enhanced Features */}
      <section className="container pb-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-3"
        >
          <FeatureCard
            icon={<Camera className="h-7 w-7" />}
            title="AI Deepfake Detection"
            description="Revolutionary machine learning algorithms that identify manipulated media with 99.2% accuracy"
            href="/deepfake-detection"
            gradient="from-blue-500/20 to-purple-500/20"
          />
          <FeatureCard
            icon={<Link2 className="h-7 w-7" />}
            title="Smart Link Scanner"
            description="Lightning-fast phishing detection that analyzes threats before they reach you"
            href="/scanner"
            gradient="from-green-500/20 to-teal-500/20"
          />
          <FeatureCard
            icon={<MessageSquareWarning className="h-7 w-7" />}
            title="Fraud Protection"
            description="Advanced NLP models that catch sophisticated scams and social engineering attacks"
            href="/scanner"
            gradient="from-orange-500/20 to-red-500/20"
          />
        </motion.div>
      </section>

      {/* Enhanced Stats */}
      <section className="container pb-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/80 to-card/40 p-12 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <div className="relative grid gap-12 md:grid-cols-3">
            <StatCard
              value="99.2%"
              label="Detection Accuracy"
              icon={<Zap className="h-6 w-6" />}
            />
            <StatCard
              value="<1ms"
              label="Response Time"
              icon={<ArrowRight className="h-6 w-6" />}
            />
            <StatCard
              value="Self-Learning"
              label="AI Evolution"
              icon={<Sparkles className="h-6 w-6" />}
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, href, gradient }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  gradient: string;
}) {
  return (
    <motion.div variants={fadeUp} className="group">
      <Card className="relative h-full cursor-pointer overflow-hidden border-primary/20 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", gradient)} />
        <a href={href} className="relative block h-full p-8">
          <CardHeader className="p-0">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary backdrop-blur group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
              {description}
            </CardDescription>
          </CardContent>
        </a>
      </Card>
    </motion.div>
  );
}

function StatCard({ value, label, icon }: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
        {icon}
      </div>
      <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}
