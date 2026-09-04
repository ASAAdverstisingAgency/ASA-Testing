"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/data/process";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Process3D() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !section.current) return;
      const stages = section.current.querySelectorAll("[data-stage]");
      stages.forEach((stage, index) => {
        gsap.fromTo(
          stage,
          { z: -520 - index * 160, rotateY: 18, opacity: 0.15, filter: "blur(8px)" },
          {
            z: 80,
            rotateY: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: `top+=${index * 18}% center`,
              end: `top+=${index * 18 + 28}% center`,
              scrub: 0.7,
            },
          },
        );
      });
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section ref={section} className="bg-paper-2 py-24 md:py-36">
      <div className="site-shell">
        <p className="meta mb-4">Method</p>
        <h2 className="display mb-16 text-[12vw] md:text-[7vw] lg:text-[5.4vw]">
          How we work
        </h2>
        <div className="perspective relative hidden h-[min(78vh,720px)] md:block">
          <div className="preserve-3d relative h-full">
            {processSteps.map((step, index) => (
              <article
                key={step.number}
                data-stage
                className="absolute inset-x-0 top-1/2 max-w-3xl -translate-y-1/2 border border-line bg-paper/90 p-8 backdrop-blur-sm md:p-12"
                style={{
                  transform: `translateZ(${-index * 180}px)`,
                  zIndex: processSteps.length - index,
                }}
              >
                <p className="display text-[16vw] leading-none text-ink/10 md:text-[7vw]">
                  {step.number}
                </p>
                <h3 className="display mt-2 text-[12vw] md:text-[5vw]">{step.title}</h3>
                <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="space-y-8 md:hidden">
          {processSteps.map((step) => (
            <article key={step.number} className="border-t border-line pt-6">
              <p className="meta">{step.number}</p>
              <h3 className="display mt-2 text-[14vw]">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
