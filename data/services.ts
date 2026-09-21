import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "billboards",
    number: "01",
    title: "Billboards & Hoardings",
    description:
      "Large-format displays built for highways, junctions, and city spaces.",
    tag: "Large-format advertising",
    theme: "dark",
    image: {
      src: "/Billborad.png",
      alt: "ASA billboard against a cloudy sky",
    },
    capabilities: [
      "48-sheet & spectaculars",
      "Hoarding systems",
      "Print production",
      "Site fabrication",
    ],
  },
  {
    id: "outdoor",
    number: "02",
    title: "Outdoor Advertising",
    description:
      "Transit and street furniture that connect your brand with the city.",
    tag: "Transit & shelters",
    theme: "light",
    image: {
      src: "/outdoor_adver.png",
      alt: "ASA outdoor advertising on a city bus shelter",
    },
    capabilities: [
      "Transit & shelters",
      "Street furniture",
      "Ambient OOH",
      "Media planning",
    ],
  },
  {
    id: "digital",
    number: "03",
    title: "Digital Marketing",
    description:
      "Social, display, and digital campaigns built for the moments that matter.",
    tag: "Social campaigns",
    theme: "light",
    image: {
      src: "/digital_market.png",
      alt: "ASA digital marketing on phone and screen",
    },
    capabilities: [
      "Social campaigns",
      "DOOH",
      "Performance creative",
      "Media flighting",
    ],
  },
  {
    id: "campaigns",
    number: "04",
    title: "Brand Campaigns",
    description:
      "Strategy, art direction, and production with one consistent brand voice.",
    tag: "Strategy & creative",
    theme: "muted",
    image: {
      src: "/brandcampaingn.png",
      alt: "ASA brand campaign print materials",
    },
    capabilities: [
      "Campaign ideas",
      "Art direction",
      "Photography & film",
      "Launch systems",
    ],
  },
];
