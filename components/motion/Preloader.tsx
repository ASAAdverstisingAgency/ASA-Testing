"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/layout/Logo";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => {
      sessionStorage.setItem("asa-loaded", "1");
      setVisible(false);
    };

    if (reduced || sessionStorage.getItem("asa-loaded")) {
      const timer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(hide, 1600);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end bg-paper px-5 pb-10 md:px-12 md:pb-14"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex w-full items-end justify-between gap-6">
            <Logo
              priority
              className="h-14 w-[7.5rem] md:h-16 md:w-[8.5rem]"
            />
            <p className="meta mb-3 max-w-[10rem] text-right">
              Advertising agency
              <br />
              New York / London
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
