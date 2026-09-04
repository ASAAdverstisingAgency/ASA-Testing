const pillars = [
  { title: "Strategic Thinking", copy: "Every board starts with a reason to look twice." },
  { title: "Creative Execution", copy: "Ideas built for distance, weather, and a two-second glance." },
  { title: "High Visibility", copy: "Sites, formats, and flights chosen so the city cannot miss you." },
  { title: "Digital Reach", copy: "The same idea, recut for screens, social, and DOOH." },
  { title: "Measurable Results", copy: "Attention that turns into recall, search, and bookings." },
];

export function WhyASA() {
  return (
    <section className="border-y border-line bg-paper-2 py-24 md:py-36">
      <div className="site-shell">
        <p className="meta mb-4">Why ASA</p>
        <h2 className="display mb-16 max-w-[12ch] text-[12vw] md:text-[7vw] lg:text-[5.2vw]">
          Built to be seen.
        </h2>
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {pillars.map((item, index) => (
            <li key={item.title} className="border-t border-line pt-5">
              <p className="meta mb-4">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="font-display text-2xl leading-[0.95] font-bold tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
