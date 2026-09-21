"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TalkButton } from "@/components/ui/TalkButton";
import { gsap } from "@/lib/gsap";
import { useExperienceLevel, usePrefersReducedMotion } from "@/lib/hooks";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false },
);

function captionFor(p: number) {
  if (p < 0.2) return "";
  if (p < 0.4) return "01  —  THE BRIDGE";
  if (p < 0.54) return "02  —  THE BILLBOARD";
  if (p < 0.68) return "03  —  UNMISSABLE SCALE";
  if (p < 0.84) return "04  —  OUTDOOR TO DIGITAL";
  return "05  —  DIGITAL";
}

export function Hero3D() {
  const section = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const caption = useRef<HTMLParagraphElement>(null);
  const level = useExperienceLevel();
  const reduced = usePrefersReducedMotion();
  const webgl = !reduced && level !== "css";

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        opacity: 0,
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from("[data-hero-ui]", {
        y: 18,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.55,
      });
    },
    { scope: section, dependencies: [reduced] },
  );

  useGSAP(
    () => {
      if (!section.current) return;
      const trigger = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          onUpdate: (self) => {
            progress.current = self.progress;
            if (copy.current) {
              copy.current.style.opacity = String(1 - Math.min(1, self.progress * 1.35));
            }
            if (caption.current) {
              caption.current.textContent = captionFor(self.progress);
              caption.current.style.opacity = String(
                self.progress > 0.12 && self.progress < 0.94 ? 1 : 0,
              );
            }
          },
        },
      });
      return () => trigger.kill();
    },
    { dependencies: [reduced] },
  );

  return (
    <section ref={section} className="relative h-[280vh] sm:h-[320vh] md:h-[400vh] lg:h-[440vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#071018]">
        <div className="absolute inset-0" data-cursor={webgl ? "drag" : undefined}>
          {webgl ? (
            <Suspense fallback={null}>
              <HeroCanvas progress={progress} reduced={level === "reduced"} />
            </Suspense>
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #071018 0%, #1a2a3c 55%, #6b3d22 140%)",
              }}
            />
          )}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-[min(32rem,55%)] bg-gradient-to-r from-[#071018] via-[#071018]/70 to-transparent sm:w-[min(32rem,42%)] lg:w-[min(32rem,36%)]" />

        <div className="site-shell relative z-10 flex h-full items-end pt-[88px] pb-8 sm:pb-10 md:items-end lg:items-center lg:pb-8">
          <div ref={copy} className="w-full max-w-[20rem] sm:max-w-[26rem] md:max-w-[30rem]">
            <p data-hero-ui className="meta mb-3 text-white/70 sm:mb-4">
              We don&apos;t just advertise.
            </p>
            <h1 className="font-display text-[clamp(2.6rem,11vw,3.75rem)] leading-[0.86] font-extrabold tracking-[-0.055em] text-paper sm:text-[clamp(3.2rem,8vw,4.5rem)] lg:text-[clamp(3.8rem,4.6vw,5.2rem)]">
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  We Make
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  Brands
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="text-accent block">
                  Unmissable.
                </span>
              </span>
            </h1>
            <p data-hero-ui className="mt-5 max-w-[26rem] text-[14px] leading-relaxed text-white/70 sm:mt-6 sm:text-[15px]">
              From billboards to digital, we create powerful connections between
              brands and people.
            </p>
            <div data-hero-ui className="pointer-events-auto mt-6 sm:mt-8">
              <TalkButton href="/#work" className="bg-paper text-ink hover:bg-accent hover:text-paper">
                Explore Our Work
              </TalkButton>
            </div>
          </div>
        </div>

        <p
          ref={caption}
          className="pointer-events-none absolute bottom-6 left-4 z-10 hidden font-display text-[10px] tracking-[0.2em] text-white/55 uppercase opacity-0 sm:bottom-7 sm:left-5 sm:block sm:text-[11px] lg:left-16"
        />
      </div>
    </section>
  );
}
