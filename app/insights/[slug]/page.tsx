import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCTA3D } from "@/components/sections/FinalCTA3D";
import { getPost, posts } from "@/data/posts";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post?.title ?? "Insight",
    description: post?.excerpt,
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const next = posts[(posts.findIndex((item) => item.slug === slug) + 1) % posts.length];

  return (
    <article className="pt-[120px]">
      <header className="site-shell pb-12">
        <p className="meta mb-6">
          {post.category} — {formatDate(post.date)} — {post.readingTime}
        </p>
        <h1 className="display max-w-[16ch] text-[14vw] leading-[0.88] md:text-[7vw]">
          {post.title}
        </h1>
      </header>
      <div className="relative mb-16 h-[48vh] min-h-[320px] md:h-[62vh]">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="site-shell grid pb-24 md:grid-cols-12">
        <div className="space-y-6 text-[17px] leading-[1.75] text-ink/80 md:col-span-8 md:col-start-3">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
      <section className="site-shell border-t border-line py-16">
        <p className="meta mb-4">Next</p>
        <Link href={`/insights/${next.slug}`} className="display text-[10vw] md:text-[4vw]">
          {next.title}
        </Link>
      </section>
      <FinalCTA3D />
    </article>
  );
}
