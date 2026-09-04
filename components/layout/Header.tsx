"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { TalkButton } from "@/components/ui/TalkButton";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";

const hints: Record<string, string> = {
  Home: "Index",
  "About Us": "Agency",
  Services: "Capabilities",
  "Our Work": "Archive",
  Clients: "Partners",
  "Contact Us": "Studio",
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[65] transition-[background,border-color,backdrop-filter,box-shadow] duration-500",
          scrolled || open
            ? "border-b border-line bg-paper/75 shadow-[0_1px_0_rgba(17,17,17,0.04)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="site-shell grid h-[72px] grid-cols-[1fr_auto] items-center lg:h-[88px] lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label={`${site.name} home`}
          >
            <Logo priority />
          </Link>

          <nav className="hidden items-center gap-4 xl:gap-7 lg:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative overflow-hidden pb-1"
                >
                  <span
                    className={cn(
                      "meta block transition-transform duration-300 group-hover:-translate-y-[140%]",
                      active ? "text-ink" : "text-muted",
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="meta absolute inset-x-0 top-full text-ink transition-transform duration-300 group-hover:-translate-y-[140%]">
                    {hints[item.label] ?? item.label}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-ink transition-all duration-300 group-hover:w-full",
                      active ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden justify-self-end lg:block">
            <TalkButton href="/contact">Let&apos;s Talk</TalkButton>
          </div>

          <button
            type="button"
            className="justify-self-end p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
