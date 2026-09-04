import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/data/images";
import { services } from "@/data/services";

export function AboutSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="site-shell">
        <div className="site-grid items-start gap-y-10">
          <p className="meta col-span-4 md:col-span-2">About ASA</p>
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <Reveal>
              <h2 className="display text-[11vw] leading-[0.9] md:text-[5.6vw] lg:text-[4.4vw]">
                An agency for brands that want to be seen.
              </h2>
            </Reveal>
            <p className="mt-8 max-w-[46ch] text-sm leading-relaxed text-muted md:text-[15px]">
              We believe advertising should feel inevitable. That means fewer
              words, stronger type, and campaigns that behave like they belong
              on the street. Our team works as a single unit — strategy,
              creative, and media — so the idea survives production.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-4 gap-4 md:mt-24 md:grid-cols-12 md:gap-6">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <ImageReveal
              src={images.about.src}
              alt={images.about.alt}
              className="aspect-[16/10]"
              cursorLabel="AGENCY"
            />
          </div>
          <div className="col-span-4 flex flex-col justify-between md:col-span-4 lg:col-span-4">
            <div>
              <p className="meta mb-4">Philosophy</p>
              <p className="text-sm leading-relaxed text-muted">
                Craft over volume. We take on fewer partnerships so the work can
                stay close, slow where it needs to, and sharp everywhere else.
              </p>
            </div>
            <ul className="mt-10 space-y-3 border-t border-line pt-6">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <span>{service.title}</span>
                  <span className="meta">{service.number}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
