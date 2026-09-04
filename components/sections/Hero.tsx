"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { images } from "@/data/images";
import { usePrefersReducedMotion } from "@/lib/hooks";

const lines = ["We build ads", "that stop people", "in the street."];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const delay = 0.2;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), {
    stiffness: 80,
    damping: 20,
  });
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), {
    stiffness: 80,
    damping: 20,
  });

  let wordIndex = 0;

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[88px] pb-8 md:pb-10"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(243,240,232,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(243,240,232,0.07) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage: "linear-gradient(to bottom, black, transparent 80%)",
        }}
      />

      <div className="site-shell relative z-10">
        <motion.div
          className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="meta">Est. 2014 — Advertising agency</p>
          <p className="meta">New York / London</p>
        </motion.div>

        <div className="site-grid items-end gap-y-8">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <h1 className="display text-[11.5vw] md:text-[9.4vw] lg:text-[7.1vw]">
              {lines.map((line) => (
                <span key={line} className="block overflow-x-visible overflow-y-hidden">
                  {line.split(" ").map((word) => {
                    const index = wordIndex++;
                    return (
                      <span
                        key={`${line}-${word}`}
                        className="mr-[0.16em] inline-block overflow-x-visible overflow-y-hidden"
                      >
                        <motion.span
                          className="inline-block"
                          initial={reduced ? false : { y: "110%" }}
                          animate={{ y: "0%" }}
                          transition={{
                            duration: 1.05,
                            delay: delay + index * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>

          <motion.div
            style={{ x, y }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: delay + 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-span-4 h-[58vw] min-h-[240px] md:col-span-5 md:col-start-8 md:h-[38vw] lg:col-span-4 lg:col-start-9 lg:h-[30vw] lg:min-h-[340px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              {images.hero.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={images.hero.src}
                  className="h-full w-full object-cover"
                >
                  <source src={images.hero.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={images.hero.src}
                  alt={images.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="object-cover"
                />
              )}
            </div>
            <p className="meta absolute -bottom-7 left-0 hidden lg:block">
              001 — Campaign, 2026
            </p>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-line pt-6 md:mt-16 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-[28rem] text-sm leading-relaxed text-muted md:text-[15px]"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            ASA is an advertising agency. We design billboards, out-of-home, and
            digital campaigns with editorial precision and cinematic motion.
          </motion.p>
          <motion.div
            className="flex items-center justify-between gap-6 md:justify-end"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton href="/contact">Start a campaign</MagneticButton>
            <a
              href="#intro"
              className="meta inline-flex items-center gap-3 text-muted"
            >
              Scroll
              <ArrowDown size={14} className="animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
