import type { Client } from "@/types";

export const clients: Client[] = [
  { name: "Meridian", sector: "Finance" },
  { name: "Northline", sector: "Transit" },
  { name: "Atelier Noir", sector: "Fashion" },
  { name: "Helix", sector: "Health" },
  { name: "Vesper", sector: "Hospitality" },
  { name: "Lumen Press", sector: "Media" },
  { name: "Fieldwork", sector: "Architecture" },
  { name: "Arcade", sector: "Culture" },
  { name: "Solace", sector: "Wellness" },
  { name: "Monolith", sector: "Industrial" },
  { name: "Kin & Co.", sector: "Retail" },
  { name: "Aurora", sector: "Energy" },
  { name: "Cobalt", sector: "Tech" },
  { name: "Riviera", sector: "Travel" },
  { name: "Beacon", sector: "Education" },
  { name: "Forge", sector: "Manufacturing" },
];

export const clientStats = [
  { value: "350\u00A0+", label: "Clients" },
  { value: "1.2\u00A0billion", label: "Media impressions" },
  { value: "5*\u00A0rated", label: "Based on 40+ reviews" },
] as const;
