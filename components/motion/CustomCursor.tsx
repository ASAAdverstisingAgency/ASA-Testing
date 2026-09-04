"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

type CursorMode = "default" | "view" | "link" | "image" | "drag";

export function CustomCursor() {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (touch || reduced) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");
    const el = cursor.current;
    const labelEl = label.current;
    if (!el || !labelEl) return;

    const setMode = (next: CursorMode, text = "VIEW") => {
      el.dataset.mode = next;
      labelEl.textContent = text;
    };

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const onOver = (event: PointerEvent) => {
      const node = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!node) {
        setMode("default");
        return;
      }
      const type = node.dataset.cursor as CursorMode | undefined;
      if (type === "view") setMode("view", node.dataset.cursorLabel || "VIEW");
      else if (type === "drag") setMode("drag", "DRAG");
      else if (type === "image") setMode("image", node.dataset.cursorLabel || "LOOK");
      else setMode("link");
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, [touch, reduced, pathname]);

  if (touch || reduced) return null;

  return (
    <div
      ref={cursor}
      aria-hidden="true"
      data-mode="default"
      className="pointer-events-none fixed top-0 left-0 z-[90]"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <span className="cursor-dot block rounded-full bg-ink transition-[width,height,border-radius,background] duration-300" />
        <span
          ref={label}
          className="cursor-label meta pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] tracking-[0.22em] opacity-0"
        >
          VIEW
        </span>
      </div>
    </div>
  );
}
