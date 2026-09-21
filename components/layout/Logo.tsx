import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/2000px%20Logo.webp";

export function Logo({
  className,
  priority = false,
  size = "nav",
}: {
  className?: string;
  priority?: boolean;
  size?: "nav" | "footer";
}) {
  if (size === "footer") {
    return (
      <Image
        src={LOGO_SRC}
        alt={site.name}
        width={800}
        height={281}
        priority={priority}
        sizes="(max-width: 768px) 90vw, 800px"
        className={cn("h-auto w-full max-w-[10.5rem] object-contain object-left", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "relative inline-block h-9 w-[5.5rem] shrink-0 lg:h-10 lg:w-[6.5rem]",
        className,
      )}
    >
      <Image
        src={LOGO_SRC}
        alt={site.name}
        fill
        sizes="120px"
        priority={priority}
        className="object-contain object-left"
      />
    </span>
  );
}
