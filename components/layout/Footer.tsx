import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { footerNav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="site-shell pt-16 pb-8 md:pt-24">
        <p className="display mb-16 max-w-[16ch] text-[16vw] leading-[0.82] text-paper md:mb-24 md:text-[9vw] lg:text-[7vw]">
          We make brands unmissable.
        </p>

        <div className="site-grid gap-y-12 border-t border-white/15 pt-10">
          <div className="col-span-4 md:col-span-3">
            <Link
              href="/"
              className="inline-flex bg-paper p-2"
              aria-label={site.name}
            >
              <Logo className="h-8 w-[4.25rem]" />
            </Link>
            <p className="mt-4 max-w-[16rem] text-sm text-white/60">{site.legalName}</p>
          </div>

          <nav className="col-span-2 md:col-span-2" aria-label="Footer">
            <p className="meta mb-4 text-accent">Services</p>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <p className="meta mb-4 text-accent">Quick links</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent">About Us</Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-accent">Our Work</Link>
              </li>
              <li>
                <Link href="/#clients" className="hover:text-accent">Clients</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-4 md:col-span-4">
            <p className="meta mb-4 text-accent">Contact</p>
            <a href={`mailto:${site.email}`} className="block text-sm">
              {site.email}
            </a>
            <p className="mt-2 text-sm text-white/60">{site.phone}</p>
            <ul className="mt-6 flex gap-5">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="meta text-white/70 hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-[11px] tracking-[0.14em] text-white/45 uppercase md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-accent">We make brands unmissable.</p>
        </div>
      </div>
    </footer>
  );
}
