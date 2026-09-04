import { AboutParallax } from "@/components/sections/AboutParallax";
import { ClientGrid3D } from "@/components/sections/ClientGrid3D";
import { FinalCTA3D } from "@/components/sections/FinalCTA3D";
import { Hero3D } from "@/components/sections/Hero3D";
import { Intro3D } from "@/components/sections/Intro3D";
import { ProjectGallery3D } from "@/components/sections/ProjectGallery3D";
import { Services3D } from "@/components/sections/Services3D";
import { WhyASA } from "@/components/sections/WhyASA";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <div>
      <Hero3D />
      <Intro3D />
      <Services3D />
      <ProjectGallery3D items={projects} />
      <WhyASA />
      <AboutParallax />
      <ClientGrid3D />
      <FinalCTA3D />
    </div>
  );
}
