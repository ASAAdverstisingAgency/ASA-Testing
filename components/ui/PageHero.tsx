"use client";

import { ImageReveal } from "@/components/ui/ImageReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image?: { src: string; alt: string };
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "perspective pt-[120px] pb-16 md:pt-[140px] md:pb-24",
        compact && "pb-10 md:pb-14",
      )}
    >
      <div className="site-shell preserve-3d">
        <p className="meta mb-6" style={{ transform: "translateZ(80px)" }}>
          {eyebrow}
        </p>
        <h1
          className="display max-w-[14ch] text-[16vw] leading-[0.86] md:text-[9vw] lg:text-[7vw]"
          style={{ transform: "translateZ(40px)" }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-[38ch] text-[15px] leading-relaxed text-muted">
            {description}
          </p>
        )}
        {image && (
          <ImageReveal
            src={image.src}
            alt={image.alt}
            className="mt-12 aspect-[16/8] md:mt-16"
            priority
          />
        )}
      </div>
    </section>
  );
}

export function PageCTA() {
  return (
    <div className="site-shell py-20">
      <MagneticButton href="/contact">Start a campaign</MagneticButton>
    </div>
  );
}
