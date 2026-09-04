"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function AboutParallax() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !section.current) return;
      gsap.to("[data-about-image]", {
        z: -150,
        rotateZ: 4,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to("[data-about-copy]", {
        z: 50,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to("[data-about-meta]", {
        z: 100,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section ref={section} className="relative overflow-hidden py-24 md:py-36">
      <div className="site-shell perspective">
        <div className="preserve-3d relative min-h-[70vh]">
          <div
            data-about-image
            className="absolute inset-x-0 top-[12%] aspect-[16/9] overflow-hidden md:left-[28%] md:w-[72%]"
          >
            <Image
              src={images.about.src}
              alt={images.about.alt}
              fill
              sizes="80vw"
              className="object-cover"
            />
          </div>
          <p data-about-meta className="relative meta mb-6">
            About ASA
          </p>
          <div data-about-copy className="relative max-w-[16ch] pt-6 md:pt-16">
            <h2 className="display text-[12vw] md:text-[6.4vw] lg:text-[5vw]">
              We turn space into attention.
            </h2>
            <p className="mt-8 max-w-[36ch] text-[15px] leading-relaxed text-muted">
              ASA Advertising makes brands unmissable — on the highway, in the
              city, and on every screen that matters.
            </p>
            <ul className="mt-10 max-w-sm space-y-2 border-t border-line pt-6">
              {services.slice(0, 4).map((service) => (
                <li key={service.id} className="flex justify-between text-sm">
                  <span>{service.title}</span>
                  <span className="meta">{service.number}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
