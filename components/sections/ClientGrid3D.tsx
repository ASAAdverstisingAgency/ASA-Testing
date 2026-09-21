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
    <div className={`flex flex-col justify-center px-5 py-6 sm:px-6 sm:py-7 md:px-8 lg:px-10 ${className}`}>
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
        <p className="text-[13px] text-white/80 sm:text-[14px]">Some of our</p>
      </div>
      <h3 className="font-display text-[clamp(2rem,9vw,3.2rem)] leading-[0.9] font-extrabold tracking-[-0.05em] md:text-[clamp(2.2rem,3.8vw,3.5rem)]">
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
      <div className="site-shell py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-[64rem] text-center">
          <p className="mb-4 text-[12px] font-medium tracking-[0.02em] text-accent sm:mb-5 sm:text-[13px]">
            Since 2017
          </p>
          <h2 className="font-display text-[clamp(1.55rem,6.5vw,2.75rem)] leading-[1.15] font-bold tracking-[-0.035em] text-balance md:text-[clamp(2rem,3.4vw,3.1rem)]">
            We help ambitious companies execute hyper-relevant marketing
            strategies for today&apos;s customers
            <span
              className="ml-1.5 inline-block h-[0.5em] w-[0.5em] translate-y-[0.06em] bg-accent align-baseline"
              aria-hidden="true"
            />
          </h2>
        </div>

        <ul className="mx-auto mt-12 grid max-w-[72rem] gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-12 md:mt-24 md:gap-20 lg:gap-28 xl:gap-36">
          {clientStats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="font-display whitespace-nowrap text-[clamp(2.75rem,12vw,4.5rem)] leading-none font-bold tracking-[-0.045em] sm:text-[clamp(2.5rem,4.5vw,4rem)]">
                {stat.value}
              </p>
              <span
                className="mx-auto mt-4 block h-px w-12 bg-accent sm:mt-5"
                aria-hidden="true"
              />
              <p className="mt-3 text-[13px] text-white/90 sm:text-[14px]">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-shell pb-16 sm:pb-20 md:pb-28">
        {/* Mobile + tablet portrait */}
        <div className="border-r border-b border-white/20 lg:hidden">
          <HeadingBlock className="border-b border-white/20" />
          <div className="grid grid-cols-2 sm:grid-cols-3">
            {clients.map((client, index) => (
              <LogoCell
                key={client.name}
                name={client.name}
                className={`border-b border-white/20 ${
                  index % 2 === 0 ? "border-r sm:border-r-0" : ""
                } ${index % 3 !== 2 ? "sm:border-r" : ""}`}
              />
            ))}
            <Link
              href="/#work"
              className="col-span-2 flex min-h-[5.75rem] items-center justify-center bg-paper px-4 text-[13px] text-ink sm:col-span-3"
            >
              view more clients →
            </Link>
          </div>
        </div>

        {/* Large desktop 7-column layout */}
        <div className="hidden overflow-hidden border-r border-b border-white/20 lg:block">
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
              href="/#work"
              className="flex min-h-[7.75rem] items-center justify-center border-l border-white/20 bg-paper px-3 text-center text-[13px] leading-snug tracking-[0.01em] text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              view more clients →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
