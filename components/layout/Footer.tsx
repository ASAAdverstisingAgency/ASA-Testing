import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { footerNav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-paper text-ink">
      <div className="site-shell pt-12 pb-8 sm:pt-16 md:pt-24">
        <p className="display mb-10 max-w-[16ch] text-[clamp(2.5rem,12vw,5rem)] leading-[0.82] text-ink sm:mb-16 md:mb-24 md:text-[clamp(3.5rem,8vw,6rem)]">
          We make brands 360° Branding
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 sm:gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-3">
            <Link href="/" aria-label={site.name} className="block max-w-[9rem] sm:max-w-[10.5rem]">
              <Logo size="footer" />
            </Link>
          </div>

          <nav className="col-span-1 md:col-span-2" aria-label="Footer">
            <p className="meta mb-4 text-accent">Services</p>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-ink/80 hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-1 md:col-span-3">
            <p className="meta mb-4 text-accent">Quick links</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent">About Us</Link>
              </li>
              <li>
                <Link href="/#work" className="hover:text-accent">Our Work</Link>
              </li>
              <li>
                <Link href="/#clients" className="hover:text-accent">Clients</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-accent">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4">
            <p className="meta mb-4 text-accent">Contact</p>
            <a href={`mailto:${site.email}`} className="block text-sm break-all sm:break-normal">
              {site.email}
            </a>
            <p className="mt-2 text-sm text-muted">{site.phone}</p>
            <ul className="mt-6 flex gap-5">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="meta text-muted hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[10px] tracking-[0.14em] text-muted uppercase sm:mt-16 sm:gap-4 sm:text-[11px] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-accent">We make brands 360° Branding</p>
        </div>
      </div>
    </footer>
  );
}
