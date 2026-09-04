"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

export function ServiceRow({
  service,
  active,
  onEnter,
}: {
  service: Service;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <article
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={cn(
        "group relative border-t border-line transition-colors duration-500 last:border-b",
        active ? "bg-paper text-ink" : "bg-transparent text-paper",
      )}
    >
      <button
        type="button"
        className="site-shell grid w-full grid-cols-4 items-start gap-4 py-7 text-left md:grid-cols-8 lg:grid-cols-12 lg:py-9"
        aria-expanded={active}
      >
        <span
          className={cn(
            "meta col-span-1 pt-2 transition-colors",
            active ? "text-ink/45" : "text-muted",
          )}
        >
          {service.number}
        </span>
        <h3
          className={cn(
            "display col-span-3 text-[9vw] leading-[0.9] transition-transform duration-500 md:col-span-5 md:text-[5vw] lg:col-span-6 lg:text-[3.6vw]",
            active && "translate-x-3 md:translate-x-6",
          )}
        >
          {service.title}
        </h3>
        <span className="col-span-4 flex justify-end md:col-span-2 lg:col-span-5">
          <Plus
            className={cn(
              "mt-1 transition-transform duration-500",
              active && "rotate-45",
            )}
            size={22}
          />
        </span>
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-4 overflow-hidden md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-2"
            >
              <p className="max-w-[46ch] pt-2 pb-4 text-sm leading-relaxed text-ink/70">
                {service.description}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 pb-4">
                {service.capabilities.map((item) => (
                  <li key={item} className="meta text-ink/45">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </article>
  );
}

export function Services({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState(services[0].id);

  return (
    <section id="services" className="py-20 md:py-32">
      {heading && (
        <div className="site-shell">
          <SectionHeading eyebrow="Capabilities" title="What we do" />
        </div>
      )}
      <div>
        {services.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
            active={active === service.id}
            onEnter={() => setActive(service.id)}
          />
        ))}
      </div>
    </section>
  );
}
