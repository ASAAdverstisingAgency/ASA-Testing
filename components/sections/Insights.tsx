"use client";

import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";
import { formatDate } from "@/lib/utils";

export function Insights({ limit = 3 }: { limit?: number }) {
  const items = posts.slice(0, limit);

  return (
    <section className="py-24 md:py-32">
      <div className="site-shell">
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <div>
            <p className="meta mb-4">Journal</p>
            <h2 className="display text-[12vw] md:text-[7vw] lg:text-[5.4vw]">
              Insights
            </h2>
          </div>
          <Link href="/insights" className="meta pb-2">
            All articles
          </Link>
        </div>
        <div className="perspective grid gap-12 md:grid-cols-12">
          {items.map((post, index) => (
            <article
              key={post.slug}
              className={index === 0 ? "md:col-span-12 lg:col-span-7" : "md:col-span-6 lg:col-span-5"}
            >
              <Link
                href={`/insights/${post.slug}`}
                className="group preserve-3d block"
                data-cursor="view"
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = (event.clientX - rect.left) / rect.width - 0.5;
                  const y = (event.clientY - rect.top) / rect.height - 0.5;
                  event.currentTarget.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 10}deg)`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "";
                }}
              >
                <div
                  className={`relative mb-5 overflow-hidden ${index === 0 ? "aspect-[16/10]" : "aspect-[16/11]"}`}
                  style={{ transform: "translateZ(36px)" }}
                >
                  <Image
                    src={post.cover.src}
                    alt={post.cover.alt}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="meta mb-3">
                  {post.category} — {formatDate(post.date)} — {post.readingTime}
                </p>
                <h3
                  className="display text-[8vw] leading-[0.95] md:text-[2.4vw]"
                  style={{ transform: "translateZ(-20px)" }}
                >
                  {post.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
