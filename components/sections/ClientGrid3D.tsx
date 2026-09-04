"use client";

import { useRef } from "react";
import { clients } from "@/data/clients";
import { pointer } from "@/lib/pointer";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function ClientGrid3D() {
  const grid = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <section id="clients" className="py-24 md:py-32">
      <div className="site-shell">
        <p className="meta mb-4">Collaborations</p>
        <h2 className="display mb-12 text-[12vw] md:text-[7vw] lg:text-[5.2vw]">
          Selected clients
        </h2>
        <div className="perspective">
          <ul
            ref={grid}
            className="preserve-3d grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-4"
            onMouseMove={() => {
              if (reduced || !grid.current) return;
              grid.current.style.transform = `rotateX(${pointer.ny * -6}deg) rotateY(${pointer.nx * 8}deg)`;
            }}
            onMouseLeave={() => {
              if (grid.current) grid.current.style.transform = "";
            }}
          >
            {clients.map((client, index) => (
              <li
                key={client.name}
                className="border-b border-r border-line px-4 py-8 md:px-6"
                style={{
                  transform: `translateZ(${(index % 5) * 18 - 24}px)`,
                }}
              >
                <p className="display text-[6.4vw] leading-none md:text-[2.2vw]">
                  {client.name}
                </p>
                <p className="meta mt-3">{client.sector}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
