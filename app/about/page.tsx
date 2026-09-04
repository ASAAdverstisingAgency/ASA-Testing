import type { Metadata } from "next";
import { AboutParallax } from "@/components/sections/AboutParallax";
import { ClientGrid3D } from "@/components/sections/ClientGrid3D";
import { FinalCTA3D } from "@/components/sections/FinalCTA3D";
import { Stats3D } from "@/components/sections/Stats3D";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "About",
  description: "ASA is an advertising agency in New York and London.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The agency"
        title="Built for work that has to be seen."
        description="ASA is an independent advertising agency. We partner with brands who want their billboards and digital campaigns to feel considered, not produced."
        image={images.aboutWide}
      />
      <AboutParallax />
      <Stats3D />
      <section className="site-shell py-16 md:py-24">
        <div className="site-grid gap-y-10">
          <p className="meta col-span-4 md:col-span-3">Approach</p>
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <p className="display text-[8vw] leading-[0.95] md:text-[3.4vw]">
              Fewer clients. Longer campaigns. Creative and media in the same conversation.
            </p>
            <p className="mt-8 max-w-[48ch] text-sm leading-relaxed text-muted">
              We do not run a production line. Teams stay small, senior, and
              present. The work is directed, not delegated through layers.
            </p>
          </div>
        </div>
        <ImageReveal
          src={images.about.src}
          alt={images.about.alt}
          className="mt-16 aspect-[16/8]"
        />
      </section>
      <ClientGrid3D />
      <FinalCTA3D />
    </>
  );
}
