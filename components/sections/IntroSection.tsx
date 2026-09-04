"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { images } from "@/data/images";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

const statement = [
  "We turn ideas",
  "into boards and ads",
  "people remember.",
];

export function IntroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.fromTo(
        ".intro-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%" },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section id="intro" ref={ref} className="relative py-24 md:py-36 lg:py-44">
      <div className="site-shell">
        <div className="site-grid items-end gap-y-10">
          <p className="meta col-span-4 md:col-span-3 lg:col-span-3">
            The agency
          </p>
          <div className="col-span-4 md:col-span-8 md:col-start-1 lg:col-span-10 lg:col-start-1">
            <h2 className="display text-[11vw] md:text-[6.4vw] lg:text-[5vw]">
              {statement.map((line) => (
                <span key={line} className="block overflow-x-visible overflow-y-hidden pb-[0.04em]">
                  <span className="intro-line inline-block">{line}</span>
                </span>
              ))}
            </h2>
          </div>
          <p className="col-span-4 max-w-[36ch] text-sm leading-relaxed text-muted md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-9">
            We work with ambitious brands who want their outdoor and digital
            advertising to feel inevitable — considered in strategy, exact in
            form, and quietly unforgettable on the street.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-4 gap-4 md:mt-24 md:grid-cols-12 md:gap-6">
          <div className="col-span-4 md:col-span-7">
            <ImageReveal
              src={images.intro.src}
              alt={images.intro.alt}
              className="aspect-[16/11]"
              cursorLabel="AGENCY"
            />
          </div>
          <div className="col-span-4 flex flex-col justify-end md:col-span-4 md:col-start-9">
            <p className="meta mb-5">Approach</p>
            <p className="text-sm leading-relaxed text-muted">
              Strategy, creative, and media in one room. No theatre, no
              templates — just a severe attention to how something looks, lands,
              and lasts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
