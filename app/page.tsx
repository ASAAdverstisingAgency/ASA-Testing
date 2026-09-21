import { AboutParallax } from "@/components/sections/AboutParallax";
import { ClientGrid3D } from "@/components/sections/ClientGrid3D";
import { Hero3D } from "@/components/sections/Hero3D";
import { HomeContact } from "@/components/sections/HomeContact";
import { Services3D } from "@/components/sections/Services3D";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { WhyASA } from "@/components/sections/WhyASA";

export default function HomePage() {
  return (
    <div>
      <Hero3D />
      <ClientGrid3D />
      <Services3D />
      <SuccessStories />
      <WhyASA />
      <AboutParallax />
      <HomeContact />
    </div>
  );
}
