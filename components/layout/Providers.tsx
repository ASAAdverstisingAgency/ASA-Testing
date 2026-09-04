"use client";

import { CustomCursor } from "@/components/motion/CustomCursor";
import { PointerTracker } from "@/components/motion/PointerTracker";
import { Preloader } from "@/components/motion/Preloader";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PointerTracker>
      <SmoothScroll>
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </SmoothScroll>
    </PointerTracker>
  );
}
