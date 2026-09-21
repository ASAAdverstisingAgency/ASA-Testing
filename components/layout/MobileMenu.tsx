"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/data/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: ReadonlyArray<{ label: string; href: string }>;
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.div
      className="perspective fixed inset-0 z-[60] flex flex-col bg-paper px-5 pt-24 pb-10 sm:px-8 sm:pt-28 md:px-10 md:hidden"
      id="mobile-nav"
      initial={false}
      animate={open ? "open" : "closed"}
      variants={{
        open: {
          clipPath: "inset(0% 0% 0% 0%)",
          pointerEvents: "auto" as const,
        },
        closed: {
          clipPath: "inset(0% 0% 100% 0%)",
          pointerEvents: "none" as const,
        },
      }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden={!open}
    >
      <nav className="preserve-3d flex flex-1 flex-col justify-center gap-1">
        {links.map((item, index) => (
          <motion.div
            key={item.href}
            variants={{
              open: { z: 0, rotateX: 0, y: 0, opacity: 1 },
              closed: { z: -160, rotateX: 18, y: 40, opacity: 0 },
            }}
            transition={{ delay: open ? 0.16 + index * 0.07 : 0, duration: 0.55 }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="display block text-[clamp(2.5rem,10vw,4rem)] leading-[0.95]"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>
      <div className="flex items-end justify-between border-t border-line pt-6">
        <p className="meta">
          {site.locations[0].city} / {site.locations[1].city}
        </p>
        <Link
          href="/#contact"
          onClick={onClose}
          className="bg-ink px-5 py-3 text-[12px] tracking-[0.16em] text-paper uppercase"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </motion.div>
  );
}
