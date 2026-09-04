"use client";

import { useState } from "react";
import { site } from "@/data/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="grid gap-10"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {sent ? (
        <p className="display text-[8vw] leading-[0.95] md:text-[3.4vw]">
          Received. We&apos;ll be in touch.
        </p>
      ) : (
        <>
          <label className="block border-b border-line pb-3">
            <span className="meta mb-3 block">Name</span>
            <input
              required
              name="name"
              autoComplete="name"
              className="w-full bg-transparent py-2 text-xl outline-none placeholder:text-muted/40"
              placeholder="Your name"
            />
          </label>
          <label className="block border-b border-line pb-3">
            <span className="meta mb-3 block">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="w-full bg-transparent py-2 text-xl outline-none placeholder:text-muted/40"
              placeholder="you@brand.com"
            />
          </label>
          <label className="block border-b border-line pb-3">
            <span className="meta mb-3 block">Campaign</span>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full resize-none bg-transparent py-2 text-xl outline-none placeholder:text-muted/40"
              placeholder="What should the city see?"
            />
          </label>
          <button
            type="submit"
            className="justify-self-start border border-paper px-8 py-4 text-[12px] tracking-[0.2em] uppercase transition-colors hover:border-accent hover:bg-accent hover:text-ink"
          >
            Send message
          </button>
        </>
      )}
    </form>
  );
}

export function ContactDetails() {
  return (
    <div className="space-y-10">
      <div>
        <p className="meta mb-3">Email</p>
        <a href={`mailto:${site.email}`} className="text-lg">
          {site.email}
        </a>
      </div>
      <div>
        <p className="meta mb-3">Offices</p>
        <ul className="space-y-4 text-sm">
          {site.locations.map((location) => (
            <li key={location.city}>
              <span className="block">{location.city}</span>
              <span className="text-muted">{location.address}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="meta mb-3">Social</p>
        <ul className="space-y-2">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
