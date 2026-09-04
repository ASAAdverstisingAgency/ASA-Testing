"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ href, children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const springY = useSpring(y, { stiffness: 240, damping: 18 });

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onMouseMove={(event) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          x.set((event.clientX - rect.left - rect.width / 2) * 0.35);
          y.set((event.clientY - rect.top - rect.height / 2) * 0.35);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className={cn(
          "group inline-flex items-center gap-4 border border-ink px-7 py-4 text-[12px] tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-ink hover:text-paper",
          className,
        )}
      >
        {children}
        <span className="block h-px w-8 bg-current transition-transform duration-300 group-hover:translate-x-1.5" />
      </Link>
    </motion.div>
  );
}
