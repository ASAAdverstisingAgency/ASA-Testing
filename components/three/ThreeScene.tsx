"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

interface ThreeSceneProps {
  children: React.ReactNode;
  className?: string;
  cameraZ?: number;
  fov?: number;
  dpr?: number | [number, number];
}

export function ThreeScene({
  children,
  className,
  cameraZ = 5.4,
  fov = 36,
  dpr = [1, 1.5],
}: ThreeSceneProps) {
  return (
    <Canvas
      className={cn("h-full w-full", className)}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.12, cameraZ], fov, near: 0.1, far: 40 }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
