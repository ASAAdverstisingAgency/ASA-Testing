"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { stats } from "@/data/stats";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Stats3D() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !section.current) return;
      gsap.fromTo(
        "[data-stat]",
        { z: -180, rotateX: 70, y: 60, opacity: 0.2 },
        {
          z: 40,
          rotateX: 0,
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top 78%",
            end: "center center",
            scrub: 0.65,
          },
        },
      );
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section ref={section} className="border-y border-line py-20 md:py-28">
      <div className="site-shell perspective">
        <div className="site-grid preserve-3d gap-y-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="col-span-2 origin-bottom md:col-span-4 lg:col-span-3"
            >
              <p className="display text-[18vw] leading-none md:text-[9vw] lg:text-[6.6vw]">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="meta mt-4">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
