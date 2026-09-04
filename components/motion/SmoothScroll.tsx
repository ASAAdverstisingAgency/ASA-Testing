"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { LenisContext } from "@/lib/lenis-context";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    registerGsap();

    const touch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;

    // Native touch scrolling. Lenis + CSS 3D layers trap swipes on iOS.
    if (reduced || touch) {
      lenisRef.current = null;
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.88,
    });

    instance.on("scroll", ScrollTrigger.update);
    lenisRef.current = instance;

    const loop = (time: number) => {
      instance.raf(time);
      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return <LenisContext.Provider value={null}>{children}</LenisContext.Provider>;
}
