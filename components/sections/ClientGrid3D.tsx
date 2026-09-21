"use client";

import Link from "next/link";
import { clients, clientStats } from "@/data/clients";

function ClientMark({ name }: { name: string }) {
  return (
    <span className="font-display max-w-[10ch] text-center text-[clamp(0.82rem,1.3vw,1.12rem)] leading-[1.05] font-bold tracking-[-0.04em] text-white uppercase">
      {name}
    </span>
  );
}

function LogoCell({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[5.75rem] items-center justify-center px-3 py-6 md:min-h-[7.75rem] md:px-4 ${className}`}
    >
      <ClientMark name={name} />
    </div>
  );
}

function HeadingBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col justify-center px-6 py-7 md:px-8 lg:px-10 ${className}`}>
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
        <p className="text-[14px] text-white/80">Some of our</p>
      </div>
      <h3 className="font-display text-[11vw] leading-[0.9] font-extrabold tracking-[-0.05em] md:text-[4.4vw] lg:text-[3.5vw]">
        Recent clients
        <span
          className="ml-1.5 inline-block h-[0.4em] w-[0.4em] translate-y-[0.06em] bg-accent align-baseline"
          aria-hidden="true"
        />
      </h3>
    </div>
  );
}

export function ClientGrid3D() {
  const top = clients.slice(0, 3);
  const rest = clients.slice(3);

  return (
    <section id="clients" className="bg-ink text-paper">
      <div className="site-shell py-20 md:py-28">
        <div className="mx-auto max-w-[64rem] text-center">
          <p className="mb-5 text-[13px] font-medium tracking-[0.02em] text-accent">
            Since 2017
          </p>
          <h2 className="font-display text-[9vw] leading-[1.12] font-bold tracking-[-0.035em] text-balance md:text-[3.6vw] lg:text-[3.1vw]">
            We help ambitious companies execute hyper-relevant marketing
            strategies for today&apos;s customers
            <span
              className="ml-1.5 inline-block h-[0.5em] w-[0.5em] translate-y-[0.06em] bg-accent align-baseline"
              aria-hidden="true"
            />
          </h2>
        </div>

        <ul className="mx-auto mt-16 grid max-w-[72rem] gap-16 sm:grid-cols-3 sm:gap-20 md:mt-24 md:gap-28 lg:gap-36">
          {clientStats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="font-display whitespace-nowrap text-[10vw] leading-none font-bold tracking-[-0.045em] sm:text-[4.2vw] lg:text-[3.2vw]">
                {stat.value}
              </p>
              <span
                className="mx-auto mt-5 block h-px w-12 bg-accent"
                aria-hidden="true"
              />
              <p className="mt-3 text-[14px] text-white/90">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-shell pb-20 md:pb-28">
        {/* Mobile layout */}
        <div className="border-r border-b border-white/20 md:hidden">
          <HeadingBlock className="border-b border-white/20" />
          <div className="grid grid-cols-2">
            {clients.map((client, index) => (
              <LogoCell
                key={client.name}
                name={client.name}
                className={`border-b border-white/20 ${index % 2 === 0 ? "border-r" : ""}`}
              />
            ))}
            <Link
              href="/work"
              className="col-span-2 flex min-h-[5.75rem] items-center justify-center bg-paper px-4 text-[13px] text-ink"
            >
              view more clients →
            </Link>
          </div>
        </div>

        {/* Desktop 7-column layout matching the reference */}
        <div className="hidden overflow-hidden border-r border-b border-white/20 md:block">
          <div className="grid grid-cols-7">
            <HeadingBlock className="col-span-4 border-r border-white/20" />
            {top.map((client, index) => (
              <LogoCell
                key={client.name}
                name={client.name}
                className={`border-t border-white/20 ${index > 0 ? "border-l border-white/20" : ""}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-7 border-t border-l border-white/20">
            {rest.slice(0, 7).map((client, index) => (
              <LogoCell
                key={client.name}
                name={client.name}
                className={index > 0 ? "border-l border-white/20" : ""}
              />
            ))}
          </div>

          <div className="grid grid-cols-7 border-t border-l border-white/20">
            {rest.slice(7, 13).map((client, index) => (
              <LogoCell
                key={client.name}
                name={client.name}
                className={index > 0 ? "border-l border-white/20" : ""}
              />
            ))}
            <Link
              href="/work"
              className="flex min-h-[7.75rem] items-center justify-center border-l border-white/20 bg-paper px-3 text-center text-[13px] leading-snug tracking-[0.01em] text-ink transition-colors hover:bg-accent"
            >
              view more clients →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
