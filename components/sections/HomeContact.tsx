"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const lookingFor = [
  "Billboards & Hoardings",
  "Outdoor Advertising",
  "Digital Marketing",
  "Brand Campaigns",
  "Full campaign",
];

const heardFrom = ["Google", "Instagram", "LinkedIn", "Referral", "Event", "Other"];

const budgets = [
  "Less than $25K",
  "$25K – $50K",
  "$50K – $100K",
  "$100K – $250K",
  "$250K+",
];

const sectors = [
  "Food & Beverages",
  "Fashion/Apparel",
  "Beauty/Personal Care",
  "Fitness/Wellness",
  "Tech/Apps",
  "Hospitality (Cafés, Restaurants, Hotels)",
  "Services/Consulting",
  "Other",
];

const interestedServices = [
  "Social Media Management",
  "Performance Marketing (Meta / Google Ads)",
  "Creative Content & Design",
  "Professional Shoots (Photo / Video)",
  "Branding & Identity",
  "Campaign Strategy",
  "Website Development",
  "Outdoor Advertising",
  "Full Marketing Support",
  "Newspaper ad",
  "Radio",
];

function FieldShell({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[13px] leading-snug text-white sm:text-[14px]">
        {label}
        <span className="text-accent">*</span>
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full min-w-0 rounded-none border-0 bg-[#1a1a1a] px-3 py-3 text-[14px] text-paper outline-none transition-colors placeholder:text-white/30 focus:bg-[#222] focus:ring-1 focus:ring-accent/50 sm:px-4 sm:py-3.5 sm:text-[15px]";

const selectClass = `${inputClass} appearance-none pr-10`;

export function HomeContact() {
  const [sent, setSent] = useState(false);
  const [sector, setSector] = useState("");
  const [sectorOther, setSectorOther] = useState("");

  return (
    <section id="contact" className="scroll-mt-[72px] bg-ink py-16 text-paper sm:py-20 md:scroll-mt-[88px] md:py-28">
      <div className="site-shell mx-auto w-full max-w-[64rem]">
        <div className="mb-8 text-center sm:mb-12 md:mb-14">
          <h2 className="font-display text-[clamp(1.75rem,7vw,2.75rem)] leading-[1.05] font-bold tracking-[-0.04em] md:text-[clamp(2rem,3vw,2.8rem)]">
            Let&apos;s start a conversation
            <span
              className="ml-1.5 inline-block h-[0.42em] w-[0.42em] translate-y-[0.06em] bg-accent align-baseline"
              aria-hidden="true"
            />
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 inline-block text-[14px] break-all text-accent transition-opacity hover:opacity-80 sm:mt-4 sm:text-[15px] sm:break-normal"
          >
            {site.email}
          </a>
        </div>

        {sent ? (
          <p className="font-display text-center text-[8vw] leading-[0.95] font-bold tracking-[-0.04em] md:text-[2.8vw]">
            Received. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (sector === "Other" && !sectorOther.trim()) return;
              setSent(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell label="Name">
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className={inputClass}
                  placeholder="..."
                />
              </FieldShell>
              <FieldShell label="Company Name">
                <input
                  required
                  name="company"
                  autoComplete="organization"
                  className={inputClass}
                  placeholder="..."
                />
              </FieldShell>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell label="Company Email">
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={inputClass}
                  placeholder="..."
                />
              </FieldShell>
              <FieldShell label="Phone">
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className={inputClass}
                  placeholder="..."
                />
              </FieldShell>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell label="I'm looking for">
                <div className="relative">
                  <select required name="lookingFor" defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Select
                    </option>
                    {lookingFor.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/50"
                  />
                </div>
              </FieldShell>
              <FieldShell label={`I heard about ${site.name} from`}>
                <div className="relative">
                  <select required name="source" defaultValue="Google" className={selectClass}>
                    {heardFrom.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/50"
                  />
                </div>
              </FieldShell>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell label="My budget range is">
                <div className="relative">
                  <select required name="budget" defaultValue={budgets[0]} className={selectClass}>
                    {budgets.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/50"
                  />
                </div>
              </FieldShell>

              <FieldShell label="Which sector/industry does your brand belong to?">
                <div className="relative">
                  <select
                    required
                    name="sector"
                    value={sector}
                    onChange={(event) => setSector(event.target.value)}
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {sectors.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/50"
                  />
                </div>
              </FieldShell>
            </div>

            {sector === "Other" && (
              <FieldShell label="Please specify your sector">
                <input
                  required
                  name="sectorOther"
                  value={sectorOther}
                  onChange={(event) => setSectorOther(event.target.value)}
                  className={inputClass}
                  placeholder="Please specify"
                />
              </FieldShell>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell label="Which services are you interested in?">
                <div className="relative">
                  <select required name="services" defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Select
                    </option>
                    {interestedServices.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/50"
                  />
                </div>
              </FieldShell>

              <FieldShell label="What's the biggest challenge you're facing right now?">
                <input
                  required
                  name="challenge"
                  className={inputClass}
                  placeholder="Your answer"
                />
              </FieldShell>
            </div>

            <FieldShell label="Project Details">
              <textarea
                required
                name="details"
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Let us know more about what you're looking for"
              />
            </FieldShell>

            <button
              type="submit"
              className="mt-2 w-full bg-accent py-4 text-[15px] font-semibold tracking-[0.04em] text-paper transition-colors hover:bg-[#c41f28]"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
