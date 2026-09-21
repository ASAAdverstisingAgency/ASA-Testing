"use client";

import { CustomCursor } from "@/components/motion/CustomCursor";
import { PointerTracker } from "@/components/motion/PointerTracker";
import { Preloader } from "@/components/motion/Preloader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PointerTracker>
      <SmoothScroll>
        <Preloader />
        <CustomCursor />
        {children}
      </SmoothScroll>
    </PointerTracker>
  );
}
