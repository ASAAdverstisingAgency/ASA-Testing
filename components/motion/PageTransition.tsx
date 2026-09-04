"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const cover = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!cover.current || reduced) return;
      if (first.current) {
        first.current = false;
        gsap.set(cover.current, { scaleY: 0 });
        return;
      }
      gsap.fromTo(
        cover.current,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 0.8,
          ease: "power4.inOut",
          transformOrigin: "top",
        },
      );
    },
    { dependencies: [pathname, reduced] },
  );

  return (
    <div className="relative">
      <div
        ref={cover}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-paper"
        style={{ transform: "scaleY(0)", display: reduced ? "none" : undefined }}
      />
      {children}
    </div>
  );
}
