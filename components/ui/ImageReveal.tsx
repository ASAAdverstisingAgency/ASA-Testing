"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  cursorLabel?: string;
}

export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 70vw, 100vw",
  priority = false,
  cursorLabel,
}: ImageRevealProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      data-cursor="image"
      data-cursor-label={cursorLabel || undefined}
      className={cn("relative overflow-hidden bg-paper-2", className)}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-top bg-paper"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </div>
  );
}
