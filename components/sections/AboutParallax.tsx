"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { images } from "@/data/images";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const highlights = [
  {
    number: "01",
    title: "Billboards & Hoardings",
    tag: "Bigger Reach",
  },
  {
    number: "02",
    title: "Outdoor Advertising",
    tag: "Stronger Presence",
  },
  {
    number: "03",
    title: "Digital Marketing",
    tag: "Measurable Growth",
  },
  {
    number: "04",
    title: "Brand Campaigns",
    tag: "Lasting Impact",
  },
];

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export function AboutParallax() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [start, setStart] = useState(0);
  const visibleCount = useVisibleCount();

  const visible = Array.from({ length: visibleCount }, (_, i) => {
    return highlights[(start + i) % highlights.length];
  });

  useGSAP(
    () => {
      if (reduced || !section.current) return;
      gsap.from("[data-about-reveal]", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
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
    <section
      ref={section}
      className="relative overflow-hidden bg-[#f3f2ef] pt-14 pb-0 sm:pt-16 md:pt-20"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 z-20 hidden -translate-y-1/2 text-[10px] tracking-[0.28em] text-ink/35 uppercase [writing-mode:vertical-rl] rotate-180 md:right-5 xl:block"
      >
        Ideas for a brighter tomorrow
      </p>

      <div className="site-shell relative">
        <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-6 xl:gap-10">
          <div className="relative z-10 max-w-xl pt-2 lg:pt-6">
            <div data-about-reveal className="mb-6 space-y-2 sm:mb-8">
              <p className="text-[10px] font-medium tracking-[0.22em] text-ink/55 uppercase sm:text-[11px]">
                Creative Spaces
              </p>
              <span className="block h-px w-14 bg-accent" />
              <p className="text-[10px] font-medium tracking-[0.22em] text-ink/55 uppercase sm:text-[11px]">
                Stronger Brands
              </p>
            </div>

            <h2
              data-about-reveal
              className="font-display text-[clamp(2.4rem,11vw,3.5rem)] leading-[0.92] font-extrabold tracking-[-0.05em] text-ink uppercase sm:text-[clamp(2.8rem,8vw,4rem)] md:text-[clamp(3.2rem,5.5vw,4.5rem)] xl:text-[5rem]"
            >
              We turn{" "}
              <span className="text-accent">space into</span>
              <br />
              attention.
            </h2>

            <p
              data-about-reveal
              className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-ink/60 sm:mt-6 sm:text-[15px] md:text-[16px]"
            >
              ASA Advertising makes brands unmissable — on the highway, in the
              city, and on every screen that matters.
            </p>

            <div
              data-about-reveal
              className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9 sm:gap-5"
            >
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[11px] font-semibold tracking-[0.16em] text-paper uppercase transition-colors hover:bg-accent hover:text-paper sm:px-6 sm:py-3.5 sm:text-[12px]"
              >
                Let&apos;s Create
                <ArrowRight
                  size={15}
                  strokeWidth={2.2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/#work"
                className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase sm:text-[12px]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink shadow-[0_4px_16px_rgba(17,17,17,0.06)] transition-colors group-hover:border-accent group-hover:text-accent sm:h-11 sm:w-11">
                  <Play size={14} fill="currentColor" className="ml-0.5" />
                </span>
                See Our Work
              </Link>
            </div>
          </div>

          <div
            data-about-reveal
            className="relative -mx-4 aspect-[4/3] min-h-[220px] sm:mx-0 sm:aspect-[16/11] sm:min-h-[320px] md:min-h-[380px] lg:aspect-auto lg:min-h-[480px] xl:min-h-[560px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-y-[8%] left-[6%] right-0 hidden bg-[#ebe9e4] sm:block"
              style={{
                clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />
            <div
              className="absolute inset-0 overflow-hidden shadow-[0_24px_60px_rgba(17,17,17,0.12)] sm:[clip-path:polygon(12%_0%,100%_0%,100%_100%,0%_100%)]"
            >
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
                className="object-cover object-[center_40%]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 border-t border-ink/8 bg-paper sm:mt-12 md:mt-16">
        <div className="site-shell">
          <div className="flex flex-col gap-4 py-5 md:flex-row md:items-stretch md:gap-0 md:py-0">
            <ul
              className={cn(
                "grid flex-1 gap-0",
                visibleCount === 1 && "grid-cols-1",
                visibleCount === 2 && "grid-cols-2",
                visibleCount === 3 && "grid-cols-3",
              )}
            >
              {visible.map((item, index) => (
                <li
                  key={`${item.number}-${start}-${visibleCount}`}
                  className={cn(
                    "flex flex-col justify-between gap-2 px-0 py-4 sm:gap-3 sm:px-4 sm:py-6 md:px-5 md:py-7 lg:px-7",
                    index > 0 && "border-l border-ink/10",
                  )}
                >
                  <span className="text-[11px] tracking-[0.14em] text-ink/40">
                    {item.number}
                  </span>
                  <p className="font-display text-[0.95rem] leading-tight font-bold tracking-[-0.02em] text-ink sm:text-[1.05rem] md:text-[1.15rem]">
                    {item.title}
                  </p>
                  <span className="text-[10px] font-medium tracking-[0.16em] text-accent uppercase sm:text-[11px] sm:tracking-[0.18em]">
                    {item.tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-end gap-2 border-t border-ink/8 pt-4 sm:border-t-0 sm:border-l sm:border-ink/10 sm:pt-0 sm:pl-5 md:pl-7">
              <button
                type="button"
                aria-label="Previous services"
                onClick={() =>
                  setStart((s) => (s - 1 + highlights.length) % highlights.length)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next services"
                onClick={() => setStart((s) => (s + 1) % highlights.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
