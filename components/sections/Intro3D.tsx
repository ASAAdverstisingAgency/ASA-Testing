"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

const lines = ["We turn space", "into attention."];

export function Intro3D() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !section.current) return;
      const nodes = section.current.querySelectorAll("[data-depth]");
      nodes.forEach((node, index) => {
        gsap.fromTo(
          node,
          { z: 160 - index * 90, rotateX: 14, y: 80, opacity: 0.15 },
          {
            z: 40 - index * 70,
            rotateX: 0,
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top 80%",
              end: "center center",
              scrub: 0.7,
            },
          },
        );
      });
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section ref={section} className="relative overflow-hidden py-28 md:py-40">
      <div className="site-shell">
        <p className="meta mb-8">About ASA</p>
        <div className="perspective preserve-3d origin-left">
          <h2 className="display max-w-[12ch] text-[14vw] md:text-[8vw] lg:text-[6.4vw]">
            {lines.map((line, index) => (
              <span
                key={line}
                data-depth
                className="block will-change-transform"
                style={{ transform: `translateZ(${80 - index * 70}px)` }}
              >
                {line}
              </span>
            ))}
          </h2>
        </div>
        <p className="mt-10 max-w-[38ch] text-[15px] leading-relaxed text-muted md:ml-[28%]">
          ASA Advertising specialises in billboards, hoardings, outdoor, and
          digital marketing. We turn city space into attention — and attention
          into brands people cannot miss.
        </p>
      </div>
    </section>
  );
}
