import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCTA3D } from "@/components/sections/FinalCTA3D";
import { PageHero } from "@/components/ui/PageHero";
import { posts } from "@/data/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes on outdoor, digital advertising, and attention from ASA.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the agency."
        description="Writing on restraint, motion, memory, and the architecture of attention."
      />
      <section className="site-shell pb-24">
        <div className="grid gap-12 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/insights/${post.slug}`} className="group block" data-cursor="view">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.cover.src}
                    alt={post.cover.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="meta mb-3">
                  {post.category} — {formatDate(post.date)} — {post.readingTime}
                </p>
                <h2 className="display text-[9vw] leading-[0.95] md:text-[3vw]">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-[40ch] text-sm text-muted">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA3D />
    </>
  );
}
