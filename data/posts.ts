import type { Post } from "@/types";
import { postImages } from "@/data/images";

export const posts: Post[] = [
  {
    slug: "restraint-is-a-design-material",
    title: "Restraint is a campaign material",
    excerpt:
      "What we choose not to put on a board is often the work. A case for editing as a primary craft.",
    category: "Craft",
    date: "2026-03-12",
    readingTime: "6 min",
    cover: postImages.restraint,
    content: [
      "Most outdoor fails by addition. A new line, a new badge, a new offer — each one reasonable, all of them together fatal at 60 kilometres an hour. Restraint is not a style. It is a material, as real as type or vinyl, and it has to be specified.",
      "When we begin a campaign, we ask what the board is allowed to say. Not what it could say. The distinction sounds semantic until you watch a 48-sheet accumulate seven ways of confirming the same product. Drivers do not experience features. They experience density.",
      "Editorial design has always understood this. A magazine does not put every story on the cover. Hierarchy is a promise: this matters now, the rest can wait. Outdoor forgets the promise because the format looks large. It is not. Attention is the finite material.",
      "The work is to decide what is structural and what is noise, then to defend that decision in every review. Clients can feel the difference even when they cannot name it. A campaign that knows when to be quiet reads as confident. A campaign that explains everything reads as unsure.",
    ],
  },
  {
    slug: "motion-as-a-brand-language",
    title: "Motion as a brand language",
    excerpt:
      "If a brand has a voice, it also has a gait. How movement becomes identity on digital boards.",
    category: "Motion",
    date: "2026-01-28",
    readingTime: "5 min",
    cover: postImages.motion,
    content: [
      "Static campaigns are incomplete the moment the unit can move. People do not only meet a brand as a poster. They meet it as a loop: a hold, a cut, a frame that arrives. Those seconds are as branded as a logotype, and usually less considered.",
      "We treat motion as vocabulary. Ease, duration, and delay are not preferences — they are tone. A 200ms snap says one thing. A 900ms ease says another. Neither is better. Both should be intentional, documented, and reused until they become familiar.",
      "The mistake is decoration. Movement that does not change meaning is cost. Movement that confirms a line, reveals an image, or carries a person from one idea to the next is language. The test is simple: if you froze it, would the board still work?",
      "When motion is doing its job, nobody compliments the animation. They say the campaign feels considered. That is the only review that matters.",
    ],
  },
  {
    slug: "designing-for-memory",
    title: "Designing for memory, not metrics",
    excerpt:
      "Impressions are a lagging indicator. The work that lasts is the work people can recall on the way home.",
    category: "Strategy",
    date: "2025-11-04",
    readingTime: "7 min",
    cover: postImages.memory,
    content: [
      "Dashboards are good at counting what happened. They are poor at explaining why someone remembered a board. Memory is a different kind of data — qualitative, stubborn, and more predictive of brand value than a week of impressions.",
      "We design for a moment that can be described later. A staircase of type. A photograph that refuses to explain itself. A line short enough to repeat. These are not flourishes. They are mnemonic devices.",
      "This is not an argument against measurement. It is an argument against letting the measurable colonize the memorable. If every decision is made in the name of a rate, the campaign will converge on every other campaign optimized for the same rate.",
      "The brands we remember did not win by being easier to scan. They won by being particular. Particularity is a strategy. It should be in the brief, not rescued in the art direction.",
    ],
  },
  {
    slug: "the-architecture-of-attention",
    title: "The architecture of attention",
    excerpt:
      "A city is a sequence of rooms. Outdoor should be planned like a route, not a slide deck.",
    category: "Media",
    date: "2025-08-19",
    readingTime: "8 min",
    cover: postImages.attention,
    content: [
      "We talk about layouts. We should talk about sequences. A person does not see a campaign. They move through a series of spatial conditions: the highway, the platform, the feed, the night-lit square. Media planning has language for this. Creative often has components.",
      "A strong flight has a plan. The spectacular is an entry sequence, not a bigger poster. The street furniture is a gallery with changing scale. Digital is the close. When those surfaces are distinct, the campaign has a shape. When they are not, the campaign is a list of sizes.",
      "Oversized type, full-bleed images, and held frames are not trends. They are spatial tools. Used with discipline they create rhythm. Used as decoration they become a template with better fonts.",
      "The job is to decide how a person should feel at each site, then to build the structure that makes that feeling unavoidable. Everything else is furniture.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
