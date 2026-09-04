import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("relative inline-block h-7 w-[3.75rem] shrink-0 lg:h-8 lg:w-[4.25rem]", className)}>
      <Image
        src="/asa-logo.jpg"
        alt={site.name}
        fill
        sizes="80px"
        priority={priority}
        className="object-contain object-left"
      />
    </span>
  );
}
