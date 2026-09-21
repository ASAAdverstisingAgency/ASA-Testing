import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const themes = {
  dark: {
    card: "bg-ink text-paper",
    muted: "text-white/65",
    tag: "text-white/45",
    number: "text-white/45",
    arrow: "border-white/25 text-paper hover:border-accent hover:bg-accent hover:text-ink",
  },
  light: {
    card: "bg-[#eceae6] text-ink",
    muted: "text-ink/60",
    tag: "text-ink/40",
    number: "text-ink/35",
    arrow: "border-ink/20 text-ink hover:border-accent hover:bg-accent",
  },
  muted: {
    card: "bg-[#ddd9d2] text-ink",
    muted: "text-ink/60",
    tag: "text-ink/40",
    number: "text-ink/35",
    arrow: "border-ink/20 text-ink hover:border-accent hover:bg-accent",
  },
} as const;

export function Services3D({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-paper py-20 md:py-28">
      {heading && (
        <div className="site-shell mb-10 md:mb-14">
          <p className="meta mb-4">Capabilities</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[12vw] leading-[0.88] md:text-[7vw] lg:text-[5.2vw]">
              What we do
            </h2>
            <p className="max-w-[22rem] text-[15px] leading-relaxed text-muted md:pb-2 md:text-right">
              Outdoor, digital, and brand campaigns.
            </p>
          </div>
        </div>
      )}

      <div className="site-shell grid gap-4 md:grid-cols-2 md:gap-5">
        {services.map((service) => {
          const theme = themes[service.theme];
          const fullBleed =
            service.id === "billboards" ||
            service.id === "digital" ||
            service.id === "campaigns";
          const lightBleed =
            service.id === "digital" || service.id === "campaigns";

          return (
            <article
              key={service.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-0.5",
                theme.card,
                service.id === "billboards"
                  ? "md:min-h-[320px] lg:min-h-[360px]"
                  : service.id === "outdoor"
                    ? "md:min-h-[220px] lg:min-h-[236px]"
                    : "md:min-h-[280px] lg:min-h-[300px]",
                fullBleed ? "p-0" : "p-6 md:p-7 lg:p-8",
                service.id === "outdoor" && "md:p-5 lg:p-6",
              )}
            >
              {fullBleed ? (
                <>
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={cn(
                      "object-cover",
                      lightBleed
                        ? service.id === "campaigns"
                          ? "object-[78%_center]"
                          : "object-[70%_center]"
                        : "object-cover object-center",
                    )}
                    priority={service.id === "billboards"}
                  />
                  <div
                    className={cn(
                      "relative z-10 flex h-full flex-col p-6 md:p-7 lg:p-8",
                      service.id === "billboards"
                        ? "min-h-[280px] md:min-h-[320px] lg:min-h-[360px]"
                        : "min-h-[280px] md:min-h-[300px]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-start justify-between gap-4",
                        service.id === "billboards" ? "mb-5" : "mb-8",
                      )}
                    >
                      <p className={cn("meta", theme.number)}>{service.number}</p>
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300",
                          theme.arrow,
                        )}
                        aria-hidden="true"
                      >
                        <ArrowUpRight size={16} strokeWidth={1.75} />
                      </span>
                    </div>
                    <div className="mt-auto max-w-[22rem]">
                      <h3 className="font-display text-[8vw] leading-[0.92] font-extrabold tracking-[-0.045em] uppercase sm:text-[3.4vw] lg:text-[2.15vw]">
                        {service.title}
                      </h3>
                      <p className={cn("mt-4 text-[14px] leading-relaxed", theme.muted)}>
                        {service.description}
                      </p>
                      <p
                        className={cn(
                          "meta",
                          theme.tag,
                          service.id === "billboards" ? "mt-5" : "mt-8",
                        )}
                      >
                        {service.tag}
                      </p>
                    </div>
                  </div>
                </>
              ) : service.id === "outdoor" ? (
                <>
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[48%] overflow-hidden rounded-r-2xl max-sm:relative max-sm:inset-auto max-sm:mt-6 max-sm:h-48 max-sm:w-full max-sm:rounded-xl">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 48vw"
                      className="object-cover object-[75%_center]"
                    />
                  </div>

                  <div className="relative z-10 flex h-full min-h-[220px] flex-col md:min-h-[236px] lg:max-w-[52%]">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <p className={cn("meta", theme.number)}>{service.number}</p>
                      <span
                        className={cn(
                          "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 md:absolute md:top-5 md:right-5",
                          theme.arrow,
                        )}
                        aria-hidden="true"
                      >
                        <ArrowUpRight size={16} strokeWidth={1.75} />
                      </span>
                    </div>
                    <div className="mt-auto max-w-[22rem] pr-2">
                      <h3 className="font-display text-[8vw] leading-[0.92] font-extrabold tracking-[-0.045em] uppercase sm:text-[3.4vw] lg:text-[2.15vw]">
                        {service.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-4 max-w-[28ch] text-[14px] leading-relaxed",
                          theme.muted,
                        )}
                      >
                        {service.description}
                      </p>
                      <p className={cn("meta mt-5", theme.tag)}>{service.tag}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative z-10 mb-8 flex items-start justify-between gap-4">
                    <p className={cn("meta", theme.number)}>{service.number}</p>
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300",
                        theme.arrow,
                      )}
                      aria-hidden="true"
                    >
                      <ArrowUpRight size={16} strokeWidth={1.75} />
                    </span>
                  </div>

                  <div className="relative z-10 grid h-[calc(100%-2.5rem)] gap-6 sm:grid-cols-[1.15fr_0.85fr] sm:items-end">
                    <div className="flex min-h-0 flex-col">
                      <h3 className="font-display text-[8vw] leading-[0.92] font-extrabold tracking-[-0.045em] uppercase sm:text-[3.4vw] lg:text-[2.15vw]">
                        {service.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-4 max-w-[28ch] text-[14px] leading-relaxed",
                          theme.muted,
                        )}
                      >
                        {service.description}
                      </p>
                      <p className={cn("meta mt-auto pt-10", theme.tag)}>
                        {service.tag}
                      </p>
                    </div>

                    <div className="relative ml-auto aspect-[3/4] w-full max-w-[12rem] overflow-hidden rounded-xl sm:max-w-none lg:max-w-[14rem]">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        sizes="(max-width: 768px) 192px, 240px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </>
              )}

              <Link
                href="/services"
                className="absolute inset-0 z-20"
                aria-label={service.title}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
