"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ProjectCard3D } from "@/components/sections/ProjectCard3D";
import { projects } from "@/data/projects";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

function applyCardTransforms(
  track: HTMLDivElement,
  progress: number,
  count: number,
) {
  const cards = track.querySelectorAll<HTMLElement>("[data-work-card]");
  cards.forEach((card, index) => {
    const offset = index - progress * Math.max(1, count - 1);
    const rotate = offset * 16;
    const z = (1 - Math.min(1, Math.abs(offset))) * 140 - Math.abs(offset) * 90;
    const scale = 0.82 + (1 - Math.min(1, Math.abs(offset))) * 0.18;
    card.style.transform = `translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`;
  });
}

export function ProjectGallery3D({
  items = projects,
  heading = true,
}: {
  items?: typeof projects;
  heading?: boolean;
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!section.current || !track.current) return;
      if (reduced || window.innerWidth < 768) return;

      gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth * 0.22),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${track.current!.scrollWidth}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (track.current) applyCardTransforms(track.current, self.progress, items.length);
          },
        },
      });
    },
    { dependencies: [reduced, items.length] },
  );

  useEffect(() => {
    if (!reduced && window.innerWidth >= 768) return;
    const onScroll = () => {
      if (!section.current || !track.current) return;
      const rect = section.current.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)),
      );
      applyCardTransforms(track.current, Number.isFinite(p) ? p : 0, items.length);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced, items.length]);

  return (
    <section ref={section} className="overflow-hidden bg-paper-2">
      <div className="flex min-h-screen flex-col justify-center py-20">
        {heading && (
          <div className="site-shell mb-10 flex items-end justify-between">
            <div>
              <p className="meta mb-4">Portfolio</p>
              <h2 className="display text-[12vw] md:text-[7vw] lg:text-[5.4vw]">
                Selected work
              </h2>
            </div>
            <Link href="/work" className="meta hidden pb-2 md:inline">
              All campaigns
            </Link>
          </div>
        )}
        <div className="perspective">
          <div
            ref={track}
            className="preserve-3d flex items-center gap-8 px-[8vw] will-change-transform md:gap-12"
          >
            {items.map((project, index) => (
              <ProjectCard3D
                key={project.slug}
                project={project}
                index={index}
                offset={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
