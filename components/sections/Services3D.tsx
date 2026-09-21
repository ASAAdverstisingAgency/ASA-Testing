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
    arrow: "border-white/25 text-paper hover:border-accent hover:bg-accent hover:text-paper",
  },
  light: {
    card: "bg-[#eceae6] text-ink",
    muted: "text-ink/60",
    tag: "text-ink/40",
    number: "text-ink/35",
    arrow: "border-ink/20 text-ink hover:border-accent hover:bg-accent hover:text-paper",
  },
  muted: {
    card: "bg-[#ddd9d2] text-ink",
    muted: "text-ink/60",
    tag: "text-ink/40",
    number: "text-ink/35",
    arrow: "border-ink/20 text-ink hover:border-accent hover:bg-accent hover:text-paper",
  },
} as const;

function CardMeta({
  number,
  theme,
  className,
}: {
  number: string;
  theme: (typeof themes)[keyof typeof themes];
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <p className={cn("meta", theme.number)}>{number}</p>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
          theme.arrow,
        )}
        aria-hidden="true"
      >
        <ArrowUpRight size={16} strokeWidth={1.75} />
      </span>
    </div>
  );
}

function CardCopy({
  title,
  description,
  tag,
  theme,
  className,
}: {
  title: string;
  description: string;
  tag: string;
  theme: (typeof themes)[keyof typeof themes];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-display text-[clamp(1.65rem,7.5vw,2.35rem)] leading-[0.95] font-extrabold tracking-[-0.045em] uppercase md:text-[clamp(1.6rem,2.4vw,2.25rem)]">
        {title}
      </h3>
      <p className={cn("mt-3 text-[14px] leading-relaxed sm:mt-4", theme.muted)}>
        {description}
      </p>
      <p className={cn("meta mt-4 sm:mt-5", theme.tag)}>{tag}</p>
    </div>
  );
}

export function Services3D({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-paper py-16 sm:py-20 md:py-28">
      {heading && (
        <div className="site-shell mb-8 sm:mb-10 md:mb-14">
          <p className="meta mb-4">Capabilities</p>
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[clamp(2.75rem,12vw,5rem)] leading-[0.88] md:text-[clamp(3.5rem,7vw,5.5rem)] lg:text-[clamp(4rem,5.2vw,6rem)]">
              What we do
            </h2>
            <p className="max-w-[22rem] text-[14px] leading-relaxed text-muted sm:text-[15px] md:pb-2 md:text-right">
              Outdoor, digital, and brand campaigns.
            </p>
          </div>
        </div>
      )}

      <div className="site-shell grid gap-4 sm:gap-5 md:grid-cols-2">
        {services.map((service) => {
          const theme = themes[service.theme];

          if (service.id === "billboards") {
            return (
              <article
                key={service.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-0.5",
                  theme.card,
                )}
              >
                <div className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[320px] lg:min-h-[360px]">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
                  <div className="relative z-10 flex h-full min-h-[260px] flex-col p-5 sm:min-h-[300px] sm:p-6 md:min-h-[320px] md:p-7 lg:min-h-[360px] lg:p-8">
                    <CardMeta number={service.number} theme={theme} />
                    <CardCopy
                      title={service.title}
                      description={service.description}
                      tag={service.tag}
                      theme={theme}
                      className="mt-auto max-w-[22rem] pt-10"
                    />
                  </div>
                </div>
                <Link
                  href="/services"
                  className="absolute inset-0 z-20"
                  aria-label={service.title}
                />
              </article>
            );
          }

          if (service.id === "outdoor") {
            return (
              <article
                key={service.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5 sm:p-6 md:min-h-[236px] md:p-5 lg:p-6",
                  theme.card,
                )}
              >
                <div className="relative z-10 flex flex-col gap-5 md:h-full md:max-w-[52%] md:gap-0">
                  <CardMeta
                    number={service.number}
                    theme={theme}
                    className="md:mb-4"
                  />
                  <CardCopy
                    title={service.title}
                    description={service.description}
                    tag={service.tag}
                    theme={theme}
                    className="md:mt-auto md:max-w-[22rem] md:pr-2"
                  />
                </div>

                <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl md:absolute md:inset-y-0 md:right-0 md:mt-0 md:aspect-auto md:w-[48%] md:rounded-none md:rounded-r-2xl">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="object-cover object-[75%_center]"
                  />
                </div>

                <Link
                  href="/services"
                  className="absolute inset-0 z-20"
                  aria-label={service.title}
                />
              </article>
            );
          }

          // Digital + Brand campaigns: stack on mobile, split on desktop
          return (
            <article
              key={service.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-0.5",
                theme.card,
              )}
            >
              {/* Mobile: stacked text then image */}
              <div className="flex flex-col p-5 sm:p-6 md:hidden">
                <CardMeta number={service.number} theme={theme} className="mb-5" />
                <CardCopy
                  title={service.title}
                  description={service.description}
                  tag={service.tag}
                  theme={theme}
                />
                <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="100vw"
                    className={cn(
                      "object-cover",
                      service.id === "campaigns"
                        ? "object-[78%_center]"
                        : "object-[70%_center]",
                    )}
                  />
                </div>
              </div>

              {/* Desktop: full-bleed image with readable text panel */}
              <div className="relative hidden min-h-[300px] md:block lg:min-h-[320px]">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="50vw"
                  className={cn(
                    "object-cover",
                    service.id === "campaigns"
                      ? "object-[78%_center]"
                      : "object-[70%_center]",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r to-transparent",
                    service.id === "campaigns"
                      ? "from-[#ddd9d2] via-[#ddd9d2]/92"
                      : "from-[#eceae6] via-[#eceae6]/92",
                  )}
                />
                <div className="relative z-10 flex h-full min-h-[300px] flex-col p-7 lg:min-h-[320px] lg:p-8">
                  <CardMeta number={service.number} theme={theme} className="mb-8" />
                  <CardCopy
                    title={service.title}
                    description={service.description}
                    tag={service.tag}
                    theme={theme}
                    className="mt-auto max-w-[18rem]"
                  />
                </div>
              </div>

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
