import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

export default function PageIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("cg_intro_seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("cg_intro_seen", "1");
      const t = setTimeout(() => setShow(false), 1700);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[1000] grid place-items-center bg-[radial-gradient(ellipse_at_center,_hsl(var(--background))_0%,_hsl(var(--background))_40%,_rgba(0,0,0,0.6)_100%)]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }}
            className="relative"
          >
            <span className="absolute -inset-10 rounded-full bg-primary/25 blur-3xl" />
            <Shield className="relative h-16 w-16 text-primary" />
          </motion.div>
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.2, duration: 0.5 },
            }}
            className="mt-6 bg-gradient-to-r from-primary via-accent to-white bg-clip-text text-2xl font-bold text-transparent"
          >
            CyberGuard
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
