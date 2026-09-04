import { SectionHeading } from "@/components/ui/SectionHeading";
import { clients } from "@/data/clients";

export function Clients() {
  return (
    <section className="py-20 md:py-32">
      <div className="site-shell">
        <SectionHeading eyebrow="Collaborations" title="Selected clients" />
        <ul className="grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-4">
          {clients.map((client) => (
            <li
              key={client.name}
              className="group border-b border-r border-line px-4 py-8 last:border-r-0 md:px-6"
            >
              <p className="display text-[7vw] leading-none transition-transform duration-500 group-hover:translate-x-1 md:text-[3vw] lg:text-[2.1vw]">
                {client.name}
              </p>
              <p className="meta mt-3 text-muted transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                {client.sector}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
