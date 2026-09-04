import { Counter } from "@/components/ui/Counter";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="site-shell">
        <div className="site-grid gap-y-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="col-span-2 border-t border-line pt-5 md:col-span-4 lg:col-span-3"
            >
              <p className="display text-[18vw] leading-none md:text-[9vw] lg:text-[6.5vw]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="meta mt-4">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
