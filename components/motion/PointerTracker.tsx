"use client";

import { useEffect } from "react";
import { bindPointer } from "@/lib/pointer";

export function PointerTracker({ children }: { children: React.ReactNode }) {
  useEffect(() => bindPointer(), []);
  return children;
}
