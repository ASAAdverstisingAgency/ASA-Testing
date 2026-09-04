import Link from "next/link";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  items?: typeof projects;
  heading?: boolean;
  className?: string;
}

export function ProjectGrid({
  items = projects,
  heading = true,
  className,
}: ProjectGridProps) {
  return (
    <section id="work" className={cn("py-20 md:py-32", className)}>
      <div className="site-shell">
        {heading && (
          <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
            <SectionHeading eyebrow="Portfolio" title="Selected work" className="mb-0" />
            <Link
              href="/work"
              className="meta hidden pb-3 transition-colors hover:text-paper md:inline-flex"
            >
              All campaigns
            </Link>
          </div>
        )}
        <div className="site-grid gap-y-16 md:gap-y-24 lg:gap-y-32">
          {items.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
