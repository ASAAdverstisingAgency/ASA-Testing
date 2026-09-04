"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ImageReveal } from "@/components/ui/ImageReveal";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);
  const x = useSpring(labelX, { stiffness: 180, damping: 20 });
  const y = useSpring(labelY, { stiffness: 180, damping: 20 });
  const ref = useRef<HTMLAnchorElement>(null);

  const layouts: Record<Project["layout"], string> = {
    full: "col-span-4 md:col-span-8 lg:col-span-12",
    split: "col-span-4 md:col-span-8 lg:col-span-7",
    "split-reverse": "col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6",
    "image-meta": "col-span-4 md:col-span-8 lg:col-span-8",
    "type-image": "col-span-4 md:col-span-8 lg:col-span-12",
  };

  const imageAspect =
    project.layout === "full"
      ? "aspect-[16/9] md:aspect-[21/9]"
      : project.layout === "type-image"
        ? "aspect-[4/5] md:aspect-[16/11]"
        : "aspect-[4/5] md:aspect-[16/11]";

  return (
    <article className={cn(layouts[project.layout], "group")}>
      <Link
        ref={ref}
        href={`/work/${project.slug}`}
        data-cursor="view"
        data-cursor-label="VIEW"
        className="block"
        onMouseMove={(event) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          labelX.set(event.clientX - rect.left);
          labelY.set(event.clientY - rect.top);
        }}
      >
        {project.layout === "type-image" ? (
          <div className="site-grid items-end gap-y-6">
            <div className="col-span-4 md:col-span-4 lg:col-span-5">
              <p className="meta mb-4">
                {String(index + 1).padStart(2, "0")} / {project.year}
              </p>
              <h3 className="display text-[14vw] leading-[0.85] transition-transform duration-500 group-hover:translate-x-2 md:text-[7vw] lg:text-[5.6vw]">
                {project.title}
              </h3>
              <p className="mt-6 max-w-[32ch] text-sm text-muted">
                {project.excerpt}
              </p>
            </div>
            <div className="relative col-span-4 overflow-hidden md:col-span-4 lg:col-span-7">
              <ImageReveal
                src={project.cover.src}
                alt={project.cover.alt}
                className={cn(imageAspect, "transition-transform duration-700 group-hover:scale-[1.02]")}
                imageClassName="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="relative overflow-hidden">
              <ImageReveal
                src={project.cover.src}
                alt={project.cover.alt}
                className={imageAspect}
                imageClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <motion.span
                style={{ x, y }}
                className="pointer-events-none absolute top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/40 px-3 py-1 text-[10px] tracking-[0.2em] text-paper uppercase mix-blend-difference lg:block"
              >
                {project.category}
              </motion.span>
            </div>
            <div
              className={cn(
                "mt-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
                project.layout === "image-meta" && "md:max-w-[70%]",
              )}
            >
              <div>
                <p className="meta mb-2">
                  {String(index + 1).padStart(2, "0")} — {project.client}
                </p>
                <h3 className="display text-[9vw] leading-[0.9] transition-transform duration-500 group-hover:translate-x-2 md:text-[3.4vw]">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-end justify-between gap-6 md:block md:text-right">
                <p className="text-sm text-muted">{project.category}</p>
                <p className="meta">{project.year}</p>
              </div>
            </div>
            {project.layout === "image-meta" && (
              <p className="mt-4 max-w-[42ch] text-sm text-muted">
                {project.excerpt}
              </p>
            )}
          </>
        )}
      </Link>
    </article>
  );
}
