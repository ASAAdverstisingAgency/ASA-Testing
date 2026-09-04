import type { Metadata } from "next";
import { FinalCTA3D } from "@/components/sections/FinalCTA3D";
import { ProjectGallery3D } from "@/components/sections/ProjectGallery3D";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected billboard, OOH, and digital campaigns by ASA.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that holds the street."
        description="A selection of campaigns across billboards, out-of-home, and digital advertising."
      />
      <ProjectGallery3D items={projects} heading={false} />
      <FinalCTA3D />
    </>
  );
}
