"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TalkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 bg-ink py-2 pr-2 pl-5 text-[12px] tracking-[0.16em] text-paper uppercase transition-colors duration-300 hover:bg-accent hover:text-paper",
        className,
      )}
    >
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-paper transition-colors duration-300 group-hover:bg-paper group-hover:text-accent">
        <ArrowRight size={16} />
      </span>
    </Link>
  );
}
