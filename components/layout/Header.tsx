"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { TalkButton } from "@/components/ui/TalkButton";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const headerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Get a Proposal", href: "/#contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const isHome = pathname === "/";
  const solid = scrolled || open || isHome;

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
          solid
            ? "border-b border-line bg-paper shadow-[0_1px_0_rgba(17,17,17,0.04)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="site-shell flex h-[64px] items-center justify-between gap-4 sm:h-[72px] sm:gap-6 lg:h-[88px]">
          <Link
            href="/"
            className="inline-flex min-w-0 items-center"
            aria-label={`${site.name} home`}
          >
            <Logo priority />
          </Link>

          <div className="hidden items-center gap-5 md:flex lg:gap-8">
            <nav className="flex items-center gap-5 lg:gap-7" aria-label="Primary">
              {headerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[12px] font-medium tracking-[0.04em] whitespace-nowrap text-ink/70 transition-colors hover:text-accent lg:text-[13px]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <TalkButton href="/#contact">
              Let&apos;s Talk
            </TalkButton>
          </div>

          <button
            type="button"
            className="p-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} links={headerLinks} />
    </>
  );
}
