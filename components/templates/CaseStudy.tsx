import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getNextProject, getProject, projects } from "@/data/projects";

interface CaseStudyProps {
  slug: string;
}

export function CaseStudy({ slug }: CaseStudyProps) {
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <article className="pt-[88px]">
      <section className="relative min-h-[70vh]">
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
        </div>
        <div className="site-shell relative -mt-24 pb-16">
          <p className="meta mb-4">
            {project.client} — {project.year}
          </p>
          <h1 className="display text-[18vw] leading-[0.82] md:text-[10vw] lg:text-[8vw]">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="border-t border-line py-12 md:py-16">
        <div className="site-shell site-grid gap-y-8">
          <div className="col-span-2 md:col-span-2">
            <p className="meta mb-2">Client</p>
            <p>{project.client}</p>
          </div>
          <div className="col-span-2 md:col-span-2">
            <p className="meta mb-2">Year</p>
            <p>{project.year}</p>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-8">
            <p className="meta mb-2">Services</p>
            <p>{project.services.join(" / ")}</p>
          </div>
        </div>
      </section>

      <section className="site-shell pb-16">
        <ImageReveal
          src={project.gallery[0]?.src || project.cover.src}
          alt={project.gallery[0]?.alt || project.cover.alt}
          className="aspect-[16/9]"
        />
      </section>

      <section className="site-shell grid gap-12 pb-20 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <p className="meta mb-4">Overview</p>
          <h2 className="display text-[9vw] leading-[0.9] md:text-[3.4vw]">
            {project.excerpt}
          </h2>
        </div>
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted md:col-span-6 md:col-start-7 md:text-[15px]">
          {project.overview}
        </p>
      </section>

      <section className="grid gap-px bg-line md:grid-cols-2">
        <div className="bg-paper-2 px-5 py-14 md:px-12">
          <p className="meta mb-5">Challenge</p>
          <p className="max-w-[42ch] text-sm leading-relaxed text-muted md:text-[15px]">
            {project.challenge}
          </p>
        </div>
        <div className="bg-paper-2 px-5 py-14 md:px-12">
          <p className="meta mb-5">Solution</p>
          <p className="max-w-[42ch] text-sm leading-relaxed text-muted md:text-[15px]">
            {project.solution}
          </p>
        </div>
      </section>

      <section className="site-shell grid gap-4 py-16 md:grid-cols-12 md:gap-6">
        {project.gallery.map((image, index) => (
          <ImageReveal
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={
              index === 0
                ? "aspect-[16/10] md:col-span-12"
                : "aspect-[4/5] md:col-span-6 md:aspect-[4/5]"
            }
          />
        ))}
      </section>

      <section className="border-y border-line py-16 md:py-24">
        <div className="site-shell site-grid gap-y-10">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="col-span-4 md:col-span-4 lg:col-span-4">
              <p className="display text-[16vw] leading-none md:text-[7vw]">
                {metric.value}
              </p>
              <p className="meta mt-3">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {next && (
        <section className="py-20">
          <div className="site-shell">
            <p className="meta mb-6">Next campaign</p>
            <Link href={`/work/${next.slug}`} className="group block" data-cursor="view">
              <div className="relative mb-6 aspect-[16/8] overflow-hidden">
                <Image
                  src={next.cover.src}
                  alt={next.cover.alt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h2 className="display text-[12vw] leading-[0.86] transition-transform duration-500 group-hover:translate-x-2 md:text-[6vw]">
                {next.title}
              </h2>
            </Link>
            <div className="mt-10">
              <MagneticButton href="/work">All work</MagneticButton>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

export const projectSlugs = projects.map((project) => project.slug);
