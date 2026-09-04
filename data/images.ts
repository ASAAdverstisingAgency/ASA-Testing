const u = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: {
    src: u("photo-1477959858617-67f85cf4f1df"),
    alt: "City skyline at dusk — the scale our outdoor work is built for",
    video: null as string | null,
  },
  intro: {
    src: u("photo-1518005020951-eccb494ad742"),
    alt: "Monumental concrete architecture against a pale sky",
  },
  about: {
    src: u("photo-1497366216548-37526070297c"),
    alt: "Agency workspace with long desks and natural light",
  },
  aboutWide: {
    src: u("photo-1487958449943-2429e8be8625"),
    alt: "Urban facade — the kind of surface our campaigns occupy",
  },
  cta: {
    src: u("photo-1449824913935-59a10b8d2000"),
    alt: "Night city grid seen from above",
  },
  contact: {
    src: u("photo-1449824913935-59a10b8d2000"),
    alt: "Night streets and light — where outdoor advertising lives",
  },
  texture: {
    src: u("photo-1558591710-4b4a1ae0f04d"),
    alt: "Soft abstract light and shadow on a textured surface",
  },
} as const;

export const projectImages = {
  meridian: {
    cover: {
      src: u("photo-1486406146926-c627a92ad1ab"),
      alt: "Glass tower rising through low cloud",
    },
    gallery: [
      {
        src: u("photo-1545324418-cc1a3fa10c00"),
        alt: "Contemporary residential tower with a precise facade",
      },
      {
        src: u("photo-1497366811353-6870744d04b2"),
        alt: "Open office interior with linear lighting",
      },
      {
        src: u("photo-1618221195710-dd6b41faaea6"),
        alt: "Refined interior with sculptural furniture",
      },
    ],
  },
  northline: {
    cover: {
      src: u("photo-1477959858617-67f85cf4f1df"),
      alt: "City skyline at dusk with layered infrastructure",
    },
    gallery: [
      {
        src: u("photo-1449824913935-59a10b8d2000"),
        alt: "Aerial night view of intersecting streets",
      },
      {
        src: u("photo-1486325212027-8081e485255e"),
        alt: "Concrete overpass with strong geometric lines",
      },
      {
        src: u("photo-1477959858617-67f85cf4f1df", 1800),
        alt: "City skyline with dense vertical structure",
      },
    ],
  },
  atelier: {
    cover: {
      src: u("photo-1441986300917-64674bd600d8"),
      alt: "Retail interior with dark millwork and precise lighting",
    },
    gallery: [
      {
        src: u("photo-1469334031218-e382a71b716b"),
        alt: "Editorial fashion still with architectural backdrop",
      },
      {
        src: u("photo-1558171813-4c088753af8f"),
        alt: "Clothing rails in a restrained boutique interior",
      },
      {
        src: u("photo-1600566753086-00f18fb6b3ea"),
        alt: "Interior volume with timber, stone, and glass",
      },
    ],
  },
  helix: {
    cover: {
      src: u("photo-1512917774080-9991f1c4c750"),
      alt: "Contemporary house with deep eaves and a still courtyard",
    },
    gallery: [
      {
        src: u("photo-1581091226825-a6a2a5aee158"),
        alt: "Laboratory glassware in a controlled environment",
      },
      {
        src: u("photo-1502672260266-1c1ef2d93688"),
        alt: "Calm interior with a long view through aligned rooms",
      },
      {
        src: u("photo-1600596542815-ffad4c1539a9"),
        alt: "Modern house volume with a dark roof and pale walls",
      },
    ],
  },
  vesper: {
    cover: {
      src: u("photo-1613490493576-7fde63acd811"),
      alt: "Night-lit residence overlooking a dark landscape",
    },
    gallery: [
      {
        src: u("photo-1560448204-e02f11c3d0e2"),
        alt: "Hotel suite with layered textiles and warm light",
      },
      {
        src: u("photo-1600607687920-4e2a09cf159d"),
        alt: "Double-height living space with a monumental window",
      },
      {
        src: u("photo-1600566752355-35792bedcfea"),
        alt: "Courtyard pool reflecting a modern facade",
      },
    ],
  },
  lumen: {
    cover: {
      src: u("photo-1503387762-592deb58ef4e"),
      alt: "Architectural structure under construction with strong geometry",
    },
    gallery: [
      {
        src: u("photo-1457369804613-52c61a468e7d"),
        alt: "Stacks of printed campaign matter on a work table",
      },
      {
        src: u("photo-1479839672679-a46483c0e7c8"),
        alt: "White architectural colonnade in raking light",
      },
      {
        src: u("photo-1511818966892-d7d671e672a2"),
        alt: "Looking up through a faceted glass atrium",
      },
    ],
  },
} as const;

export const postImages = {
  restraint: {
    src: u("photo-1518005020951-eccb494ad742"),
    alt: "Massive concrete wall with a single aperture",
  },
  motion: {
    src: u("photo-1550684376-efcbd6e3f031"),
    alt: "Long-exposure light trails through a dark interior",
  },
  memory: {
    src: u("photo-1519681393784-d120267933ba"),
    alt: "Night mountain under a dense field of stars",
  },
  attention: {
    src: u("photo-1479839672679-a46483c0e7c8"),
    alt: "Repeating white architectural columns",
  },
} as const;
