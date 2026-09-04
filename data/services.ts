import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "billboards",
    number: "01",
    title: "Billboards & Hoardings",
    description:
      "Large-format work built for highways, junctions, and city gates. Designed for distance, speed, weather, and the two seconds a person actually has.",
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
      "Transit, street furniture, and unmissable OOH that treats the city as media. One idea, many surfaces, one voice.",
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
      "Social, display, DOOH, and paid media. The board recut for the feed, the loop, and the click — so the brand is everywhere that matters.",
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
      "From the first line to the last site. Strategy, art direction, and production so outdoor and digital feel like one campaign.",
    capabilities: [
      "Campaign ideas",
      "Art direction",
      "Photography & film",
      "Launch systems",
    ],
  },
];
