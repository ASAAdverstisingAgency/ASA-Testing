import type { NavItem } from "@/types";

export const site = {
  name: "ASA",
  legalName: "ASA Advertising",
  tagline: "We make brands unmissable.",
  description:
    "ASA Advertising is a premium agency specialising in billboards, hoardings, outdoor advertising, and digital marketing.",
  email: "hello@asa.studio",
  phone: "+1 212 555 0148",
  locations: [
    { city: "New York", address: "14 Mercer Street, NY 10013" },
    { city: "London", address: "21 Rivington Street, EC2A 3DU" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Clients", href: "/#clients" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Billboards", href: "/services" },
  { label: "Hoardings", href: "/services" },
  { label: "Digital Marketing", href: "/services" },
  { label: "Outdoor Advertising", href: "/services" },
];
