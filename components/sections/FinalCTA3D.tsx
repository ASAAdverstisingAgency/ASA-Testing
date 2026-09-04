"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { TalkButton } from "@/components/ui/TalkButton";
import { site } from "@/data/site";
import { useExperienceLevel, usePrefersReducedMotion } from "@/lib/hooks";

const CtaCanvas = dynamic(
  () => import("@/components/three/CtaCanvas").then((mod) => mod.CtaCanvas),
  { ssr: false },
);

export function FinalCTA3D() {
  const level = useExperienceLevel();
  const reduced = usePrefersReducedMotion();
  const webgl = level !== "css" && !reduced;

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div
        className="absolute inset-y-0 right-[-8%] hidden w-[48%] lg:block"
        data-cursor={webgl ? "drag" : undefined}
      >
          {webgl && (
            <Suspense fallback={null}>
              <CtaCanvas reduced={level === "reduced"} />
            </Suspense>
          )}
      </div>
      <div className="site-shell relative">
        <h2 className="display max-w-[11ch] text-[16vw] leading-[0.82] md:text-[9vw] lg:text-[7.2vw]">
          Ready to make
          <br />
          your brand
          <br />
          <span className="text-accent">unmissable?</span>
        </h2>
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <TalkButton href="/contact">Start a Project</TalkButton>
          <div>
            <a href={`mailto:${site.email}`} className="block text-lg">
              {site.email}
            </a>
            <ul className="mt-4 flex gap-6">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="meta hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
