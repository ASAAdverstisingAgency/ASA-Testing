import type { Metadata } from "next";
import { FinalCTA3D } from "@/components/sections/FinalCTA3D";
import { Process3D } from "@/components/sections/Process3D";
import { Services3D } from "@/components/sections/Services3D";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description: "Billboard, OOH, and digital advertising from ASA.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="What we do, and how far we take it."
        description="Four practices, one agency. Billboards, outdoor, digital, and campaigns — from first brief to the board going live."
      />
      <Services3D heading={false} />
      <Process3D />
      <FinalCTA3D />
    </>
  );
}
