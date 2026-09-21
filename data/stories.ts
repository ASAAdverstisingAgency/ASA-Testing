import { projectImages } from "@/data/images";

export interface SuccessStory {
  slug: string;
  label: string;
  headline: string;
  copy: string;
  image: {
    src: string;
    alt: string;
  };
  tone: "amber" | "blue" | "night" | "crimson" | "red";
}

export const successStories: SuccessStory[] = [
  {
    slug: "meridian",
    label: "Billboard Campaign",
    headline: "220 boards. One line the city remembered.",
    copy: "A finance brand that needed composure on the street — and still competed on highway inventory.",
    image: projectImages.meridian.cover,
    tone: "amber",
  },
  {
    slug: "northline",
    label: "Transit OOH",
    headline: "2.1M weekly impressions underground.",
    copy: "A transit system reintroduced to its own riders across platforms, tunnels, and digital screens.",
    image: projectImages.northline.cover,
    tone: "blue",
  },
  {
    slug: "atelier-noir",
    label: "Fashion Outdoor",
    headline: "3.4× lift in branded search.",
    copy: "Seasonal outdoor paced like a lookbook — large, slow, and built to hold at 20 metres.",
    image: projectImages.atelier.cover,
    tone: "night",
  },
  {
    slug: "helix",
    label: "Digital + DOOH",
    headline: "41% lift in qualified leads.",
    copy: "Clinical research creative that stayed ethical on social, display, and selected digital boards.",
    image: projectImages.helix.cover,
    tone: "crimson",
  },
  {
    slug: "vesper",
    label: "Hospitality Brand",
    headline: "2.8× direct bookings in flight.",
    copy: "Night-lit outdoor and digital that treat atmosphere as the product — almost no copy, exact sites.",
    image: projectImages.vesper.cover,
    tone: "red",
  },
];
