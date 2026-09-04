import Link from "next/link";
import { services } from "@/data/services";

export function Services3D({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-24 md:py-36">
      {heading && (
        <div className="site-shell mb-12 md:mb-16">
          <p className="meta mb-4">Capabilities</p>
          <h2 className="display text-[12vw] md:text-[7vw] lg:text-[5.4vw]">
            What we do
          </h2>
        </div>
      )}
      <div className="site-shell grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.id}
            className="group relative border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-paper-2 md:p-10"
          >
            <p className="meta text-accent">{service.number}</p>
            <h3 className="display mt-6 text-[9vw] leading-[0.9] md:text-[3.2vw]">
              {service.title}
            </h3>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-muted">
              {service.description}
            </p>
            <p className="meta mt-8 text-ink/40 transition-colors duration-300 group-hover:text-accent">
              {service.capabilities[0]}
            </p>
            <Link
              href="/services"
              className="absolute inset-0"
              aria-label={service.title}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
