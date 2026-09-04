"use client";

import type { MutableRefObject } from "react";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { BillboardScene } from "@/components/three/hero/BillboardScene";

interface HeroCanvasProps {
  progress: MutableRefObject<number>;
  reduced?: boolean;
}

export function HeroCanvas({ progress, reduced = false }: HeroCanvasProps) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onVisibility = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      className="h-full w-full"
      frameloop={active ? "always" : "never"}
      dpr={reduced ? 1 : [1, 1.75]}
      shadows={reduced ? false : "percentage"}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.9;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      gl={{
        antialias: reduced,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0.35, 1.22, 11.4], fov: reduced ? 46 : 38, near: 0.1, far: 180 }}
    >
      <Suspense fallback={null}>
        <BillboardScene
          progress={progress}
          reduced={reduced}
          interactive={!reduced}
        />
      </Suspense>
    </Canvas>
  );
}
