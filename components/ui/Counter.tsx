"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface CounterProps {
  value: number;
  suffix?: string;
}

export function Counter({ value, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reduced) {
        ref.current.textContent = `${value}${suffix}`;
        return;
      }

      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${Math.round(state.n)}${suffix}`;
          }
        },
      });
    },
    { dependencies: [value, suffix, reduced] },
  );

  return <span ref={ref}>{reduced ? `${value}${suffix}` : `0${suffix}`}</span>;
}
