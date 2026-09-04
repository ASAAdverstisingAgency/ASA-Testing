"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { navItems, site } from "@/data/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.div
      className="perspective fixed inset-0 z-[60] flex flex-col bg-paper px-5 pt-28 pb-10 md:px-10 lg:hidden"
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
        {navItems.map((item, index) => (
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
              className="display block text-[8.5vw] leading-[0.95]"
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
        <Link href="/contact" onClick={onClose} className="text-sm tracking-tight">
          Let&apos;s Talk
        </Link>
      </div>
    </motion.div>
  );
}
