import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "left" | "right";
  inverted?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  inverted = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex items-end justify-between gap-6 md:mb-16",
        align === "right" && "flex-row-reverse text-right",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <p className={cn("meta mb-4", inverted ? "text-ink/50" : "")}>
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "display text-[12vw] md:text-[7vw] lg:text-[5.4vw]",
            inverted ? "text-ink" : "text-paper",
          )}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
