"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useIsTouch() {
  const [touch, setTouch] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setTouch(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return touch;
}

export type ExperienceLevel = "full" | "reduced" | "css";

export function useExperienceLevel(): ExperienceLevel {
  const reduced = usePrefersReducedMotion();
  const [level, setLevel] = useState<ExperienceLevel>("full");

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (reduced) setLevel("css");
      else if (width >= 1024 && fine) setLevel("full");
      else setLevel("reduced");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [reduced]);

  return reduced ? "css" : level;
}
