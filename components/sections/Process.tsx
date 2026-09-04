"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Process() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !pin.current || !track.current) return;
      if (window.innerWidth < 1024) return;

      const distance = () =>
        Math.max(0, track.current!.scrollWidth - window.innerWidth);

      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { dependencies: [reduced] },
  );

  return (
    <section className="overflow-x-hidden bg-paper text-ink">
      <div ref={pin} className="lg:h-screen lg:overflow-hidden">
        <div className="site-shell pt-20 lg:pt-24">
          <SectionHeading
            eyebrow="Method"
            title="How we work"
            inverted
            className="mb-8 lg:mb-10"
          />
        </div>
        <div
          ref={track}
          className="flex flex-col gap-8 px-5 pb-20 md:px-10 lg:flex-row lg:h-[calc(100vh-220px)] lg:w-max lg:items-stretch lg:gap-0 lg:px-16 lg:pb-0"
        >
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="flex min-h-[280px] w-full flex-col justify-between border-t border-line-dark py-8 lg:h-full lg:w-[70vw] lg:border-t-0 lg:border-l lg:px-14 lg:py-6"
            >
              <p className="display text-[18vw] leading-none text-ink/10 lg:text-[9vw]">
                {step.number}
              </p>
              <div>
                <h3 className="display text-[12vw] leading-[0.9] lg:text-[5vw]">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ink/65">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
