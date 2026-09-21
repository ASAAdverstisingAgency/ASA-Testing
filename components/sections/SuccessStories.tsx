"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { successStories, type SuccessStory } from "@/data/stories";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const toneOverlay: Record<SuccessStory["tone"], string> = {
  amber: "from-black/75 via-[#3a2208]/55 to-[#c47a3a]/35",
  blue: "from-black/80 via-[#0c1e2e]/60 to-[#1a4a66]/40",
  night: "from-black/85 via-black/50 to-[#2a1810]/45",
  crimson: "from-black/80 via-[#2a0a12]/55 to-[#7a1028]/40",
  red: "from-black/75 via-[#3a0c0c]/50 to-[#9a1c1c]/45",
};

export function SuccessStories({
  items = successStories,
}: {
  items?: SuccessStory[];
}) {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !section.current) return;
      gsap.from("[data-story-card]", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 72%",
        },
      });
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section id="work" ref={section} className="scroll-mt-[72px] overflow-hidden bg-ink py-16 text-paper sm:py-20 md:scroll-mt-[88px] md:py-28">
      <div className="site-shell">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <p className="meta mb-3 text-white/50 sm:mb-4">Results</p>
          <h2 className="font-display text-[clamp(2.5rem,11vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.05em] md:text-[clamp(3.5rem,6vw,5.5rem)]">
            Success Stories
          </h2>
        </div>

        <ul className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {items.map((story) => (
            <li key={story.slug} data-story-card>
              <Link
                href={`/work/${story.slug}`}
                className="group relative block min-h-[240px] overflow-hidden sm:min-h-[280px] md:min-h-[340px] lg:min-h-[380px]"
              >
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(max-width: 1440px) 100vw, 1600px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    toneOverlay[story.tone],
                  )}
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/10" />

                <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-end p-5 sm:min-h-[280px] sm:p-6 md:min-h-[340px] md:p-10 lg:min-h-[380px] lg:p-12">
                  <p className="meta mb-2 text-white/65 sm:mb-3">{story.label}</p>
                  <h3 className="font-display max-w-[18ch] text-[clamp(1.6rem,7vw,2.8rem)] leading-[0.92] font-extrabold tracking-[-0.045em] md:text-[clamp(2rem,4vw,3.2rem)]">
                    {story.headline}
                  </h3>
                  <p className="mt-3 max-w-[36rem] text-[13px] leading-relaxed text-white/75 sm:mt-4 sm:text-[14px] md:text-[15px]">
                    {story.copy}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-start md:mt-12">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[13px] tracking-[0.08em] text-paper uppercase transition-colors hover:text-accent"
          >
            View more
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
