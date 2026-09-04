"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/data/site";

export function CTA() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-40, 40]), {
    stiffness: 50,
    damping: 20,
  });
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-24, 24]), {
    stiffness: 50,
    damping: 20,
  });

  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-line py-28 md:py-40"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[90px]"
      />
      <div className="site-shell relative">
        <h2 className="display max-w-[12ch] text-[16vw] leading-[0.82] md:text-[9vw] lg:text-[7.4vw]">
          Let&apos;s create something memorable.
        </h2>
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <MagneticButton href="/contact">Let&apos;s Talk</MagneticButton>
          <div>
            <a href={`mailto:${site.email}`} className="block text-lg md:text-xl">
              {site.email}
            </a>
            <ul className="mt-4 flex gap-6">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="meta hover:text-paper"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
