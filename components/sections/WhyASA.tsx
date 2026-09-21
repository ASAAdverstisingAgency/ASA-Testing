"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Lightbulb,
  Pencil,
  Share2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const pillars: Array<{
  title: string;
  copy: string;
  Icon: LucideIcon;
}> = [
  {
    title: "Strategic Thinking",
    copy: "Deep insights to create meaningful and effective solutions.",
    Icon: Lightbulb,
  },
  {
    title: "Creative Execution",
    copy: "Ideas that connect, inspire and make a lasting impact.",
    Icon: Pencil,
  },
  {
    title: "High Visibility",
    copy: "Get your brand noticed across the right platforms and the right audience.",
    Icon: BarChart3,
  },
  {
    title: "Digital Reach",
    copy: "Future-ready solutions to expand your presence and engagement.",
    Icon: Share2,
  },
  {
    title: "Measurable Results",
    copy: "Track performance with clear metrics and real business growth.",
    Icon: Target,
  },
];

const labels = ["Ideas", "Strategy", "Execution", "Real Impact"];

function PillarCard({
  item,
  index,
  className,
}: {
  item: (typeof pillars)[number];
  index: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white px-5 py-9 text-center",
        className,
      )}
    >
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#c41f28] text-paper">
        <item.Icon size={18} strokeWidth={1.9} />
      </span>
      <p className="mt-4 text-[12px] font-semibold tracking-[0.14em] text-accent">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="font-display mt-2.5 text-[1.1rem] leading-[1.2] font-bold tracking-[-0.03em] text-ink">
        {item.title}
      </h3>
      <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.copy}</p>
    </div>
  );
}

export function WhyASA() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % pillars.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="relative overflow-hidden bg-[#f6f4ef] py-16 sm:py-20 md:py-28">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-36 w-36 text-accent/30 sm:h-48 sm:w-48 md:h-64 md:w-64"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M-20 140 C40 120, 60 60, 120 -10"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M-10 170 C55 145, 85 70, 150 0"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 text-accent/25 sm:h-52 sm:w-52 md:h-72 md:w-72"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M220 60 C160 80, 140 140, 80 210"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M210 30 C145 55, 115 130, 50 200"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="site-shell relative">
        <div className="mb-4 flex items-center justify-center gap-3 sm:gap-4">
          <span className="h-px w-8 bg-accent/70 sm:w-12 md:w-16" />
          <p className="text-[10px] font-semibold tracking-[0.28em] text-accent uppercase sm:text-[11px]">
            Our Approach
          </p>
          <span className="h-px w-8 bg-accent/70 sm:w-12 md:w-16" />
        </div>

        <h2 className="font-display text-center text-[clamp(2.4rem,10vw,4rem)] leading-[0.92] font-extrabold tracking-[-0.05em] text-ink uppercase md:text-[clamp(3rem,5vw,4.5rem)]">
          Built to be{" "}
          <span className="bg-gradient-to-r from-accent to-[#c41f28] bg-clip-text text-transparent">
            seen.
          </span>
        </h2>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center text-[11px] tracking-[0.16em] text-ink/50 uppercase sm:mt-5 sm:text-[12px] md:text-[13px] md:tracking-[0.2em]">
          {labels.map((label, index) => (
            <span key={label} className="inline-flex items-center">
              {index > 0 && (
                <span
                  className="mx-1.5 text-ink/20 sm:mx-2 md:mx-3"
                  aria-hidden="true"
                >
                  |
                </span>
              )}
              {label}
            </span>
          ))}
        </p>

        {/* Mobile / tablet carousel */}
        <div
          className="mt-10 lg:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {pillars.map((item, index) => (
                <div key={item.title} className="w-full shrink-0 px-1">
                  <PillarCard item={item} index={index} className="mx-auto max-w-md" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Approach slides">
            {pillars.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Show ${item.title}`}
                onClick={() => setActive(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  active === index
                    ? "w-6 bg-accent"
                    : "w-2 bg-ink/20 hover:bg-ink/35",
                )}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <ul className="mt-16 hidden gap-4 lg:grid lg:grid-cols-5 xl:gap-5">
          {pillars.map((item, index) => (
            <li key={item.title}>
              <PillarCard
                item={item}
                index={index}
                className="h-full transition-transform duration-300 hover:-translate-y-1"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
