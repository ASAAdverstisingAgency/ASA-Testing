"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Project } from "@/types";

interface ProjectCard3DProps {
  project: Project;
  index: number;
  offset: number;
}

export function ProjectCard3D({ project, index, offset }: ProjectCard3DProps) {
  const router = useRouter();
  const card = useRef<HTMLButtonElement>(null);
  const rotate = offset * 16;
  const z = (1 - Math.min(1, Math.abs(offset))) * 140 - Math.abs(offset) * 90;
  const scale = 0.82 + (1 - Math.min(1, Math.abs(offset))) * 0.18;

  return (
    <button
      ref={card}
      type="button"
      data-cursor="view"
      onClick={() => router.push(`/work/${project.slug}`)}
      className="group relative w-[78vw] shrink-0 touch-pan-y text-left max-lg:!transform-none md:w-[58vw] lg:w-[46vw]"
      data-work-card
      style={{
        transform: `translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="60vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="meta mb-2">
            {String(index + 1).padStart(2, "0")} — {project.category}
          </p>
          <h3
            className="display text-[9vw] leading-[0.9] md:text-[3.6vw]"
            style={{ transform: "translateZ(48px)" }}
          >
            {project.title}
          </h3>
        </div>
        <p className="meta pb-2">{project.year}</p>
      </div>
    </button>
  );
}
