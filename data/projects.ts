import type { Project } from "@/types";
import { projectImages } from "@/data/images";

export const projects: Project[] = [
  {
    slug: "meridian",
    title: "Meridian",
    client: "Meridian Capital",
    category: "Billboard",
    year: "2025",
    services: ["Campaign Idea", "Billboard", "DOOH", "Print"],
    excerpt:
      "A city-wide outdoor campaign that made private wealth feel public — without saying too much.",
    overview:
      "Meridian needed a presence on the street that matched the composure of their rooms. We built a billboard and digital-out-of-home system around one line and a severe, editorial still — designed to read from a cab at 40 and from the sidewalk at two.",
    challenge:
      "Finance advertising defaults to glass towers and empty confidence. Meridian’s clients already have that. The work had to feel considered, not loud — and still compete on Times Square adjacent inventory and highway 48-sheets.",
    solution:
      "We reduced the campaign to type, space, and one photograph. Boards hold a single sentence. Digital units cycle three cuts. Nothing moves that does not need to. The city sees a brand that knows when to stop talking.",
    layout: "full",
    cover: projectImages.meridian.cover,
    gallery: projectImages.meridian.gallery,
    metrics: [
      { value: "220", label: "Boards in market" },
      { value: "14", label: "Week flight" },
      { value: "3", label: "Cities launched" },
    ],
    nextSlug: "northline",
  },
  {
    slug: "northline",
    title: "Northline",
    client: "Northline Transit",
    category: "OOH",
    year: "2025",
    services: ["OOH", "Transit", "Digital", "Creative Direction"],
    excerpt:
      "A transit campaign designed for platforms, tunnels, and the two minutes before the train arrives.",
    overview:
      "Northline asked us to reintroduce the network to its own riders. We designed a system for station posters, digital platform screens, and wrap formats that treat the commute as the media, not the inconvenience.",
    challenge:
      "Riders were already looking at the walls. The existing creative was timetable energy — dense, official, forgettable. The brand needed to feel like infrastructure you could trust, not a brochure you ignore.",
    solution:
      "Heavy type, directional lines, and copy written for the platform. Print holds at distance. Digital screens sequence journey states. The campaign lives where the service lives: underground, at street level, and on the train itself.",
    layout: "split",
    cover: projectImages.northline.cover,
    gallery: projectImages.northline.gallery,
    metrics: [
      { value: "180", label: "Station sites" },
      { value: "2.1M", label: "Weekly impressions" },
      { value: "11", label: "Languages on boards" },
    ],
    nextSlug: "atelier-noir",
  },
  {
    slug: "atelier-noir",
    title: "Atelier Noir",
    client: "Atelier Noir",
    category: "Campaign",
    year: "2024",
    services: ["Creative Direction", "Billboard", "Social", "Film"],
    excerpt:
      "Fashion outdoor paced like a lookbook — large, slow, and built for the street.",
    overview:
      "Atelier Noir needed a season that could hold on a 48-sheet and still cut for digital. We directed photography and layouts for billboards, city lights, and a social film that borrows the scale of the board.",
    challenge:
      "The house’s previous outdoor flattened garments into catalogue squares. Fabric and attitude disappeared at 20 metres. They needed commerce that could carry editorial weight on the street without becoming unreadable.",
    solution:
      "Full-bleed stills, quiet type, and a campaign colour that survives daylight. Boards do the branding. Digital cuts the same frames for stories and DOOH. The city sees a house, not a grid of SKUs.",
    layout: "image-meta",
    cover: projectImages.atelier.cover,
    gallery: projectImages.atelier.gallery,
    metrics: [
      { value: "64", label: "Premium OOH sites" },
      { value: "3.4×", label: "Lift in branded search" },
      { value: "18", label: "Markets in the flight" },
    ],
    nextSlug: "helix",
  },
  {
    slug: "helix",
    title: "Helix",
    client: "Helix Research",
    category: "Digital",
    year: "2024",
    services: ["Digital Advertising", "DOOH", "Strategy", "Motion"],
    excerpt:
      "A health campaign that made clinical research feel human on screens and in the city.",
    overview:
      "Helix needed recruitment creative that could run on digital boards, social, and display without sounding like a hospital. We built a system of stills and short motion for paid media and selected OOH.",
    challenge:
      "Medical advertising often hides behind jargon or over-promises. Helix’s studies are rigorous. The work had to be clear, ethical, and still distinctive enough to stop a scroll.",
    solution:
      "We used scientific publishing as the visual cue — grids, captions, severe hierarchy — then wrote lines a person could finish on a bus. Digital units carry the detail. Outdoor carries the invitation.",
    layout: "type-image",
    cover: projectImages.helix.cover,
    gallery: projectImages.helix.gallery,
    metrics: [
      { value: "41%", label: "Lift in qualified leads" },
      { value: "60+", label: "Digital placements" },
      { value: "9", label: "Cities in rollout" },
    ],
    nextSlug: "vesper",
  },
  {
    slug: "vesper",
    title: "Vesper",
    client: "Vesper Group",
    category: "Brand",
    year: "2024",
    services: ["Brand", "OOH", "Digital", "Identity"],
    excerpt:
      "A hospitality campaign that feels nocturnal, exact, and unhurried — on boards and on screens.",
    overview:
      "Vesper is a group of houses and dining rooms that needed one voice in the city. We built outdoor and digital that treat atmosphere as the product: slow photography, almost no copy, sites chosen for night.",
    challenge:
      "Each property had its own vernacular. In media, that read as inconsistency. Guests could not tell whether they were being invited to a hotel, a restaurant, or a private club. The campaign needed gravity without chain polish.",
    solution:
      "A mark that barely announces itself, photography that prefers rooms to people, and boards that reveal the house the way a host would — slowly, with just enough said. Digital retargeting carries the reservation.",
    layout: "full",
    cover: projectImages.vesper.cover,
    gallery: projectImages.vesper.gallery,
    metrics: [
      { value: "2.8×", label: "Direct bookings in flight" },
      { value: "28", label: "Night-lit sites" },
      { value: "6", label: "Houses in the system" },
    ],
    nextSlug: "lumen-press",
  },
  {
    slug: "lumen-press",
    title: "Lumen Press",
    client: "Lumen Press",
    category: "Digital",
    year: "2023",
    services: ["Digital Advertising", "DOOH", "Motion", "Media"],
    excerpt:
      "A publishing campaign designed for long attention in a short-attention city.",
    overview:
      "Lumen Press needed a digital home for a season of essays and films — and outdoor that could sell a long read in eight words. We designed display, social, and selected digital boards as one sequence.",
    challenge:
      "Most publishing media pushes everything into cards. Lumen’s work is long, visual, and sequenced. Banner units treated an essay and a trailer the same way. Editors wanted pacing, not just a media plan.",
    solution:
      "Full-bleed openers, measured type, and motion that turns the page rather than chasing the scroll. Digital boards run issue covers. Social carries excerpts. The campaign protects attention instead of mining it.",
    layout: "split-reverse",
    cover: projectImages.lumen.cover,
    gallery: projectImages.lumen.gallery,
    metrics: [
      { value: "6m", label: "Average content time" },
      { value: "73%", label: "Issue completion after click" },
      { value: "24", label: "Issues in market" },
    ],
    nextSlug: "meridian",
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getNextProject = (slug: string) => {
  const current = getProject(slug);
  return current ? getProject(current.nextSlug) : projects[0];
};
