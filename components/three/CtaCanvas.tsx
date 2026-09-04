"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Billboard } from "@/components/three/hero/Billboard";

export function CtaCanvas({ reduced = false }: { reduced?: boolean }) {
  const progress = useRef(0);

  return (
    <Canvas
      className="h-full w-full"
      dpr={reduced ? 1 : [1, 1.35]}
      gl={{ antialias: !reduced, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [2.4, 0.8, 6.2], fov: 32, near: 0.1, far: 30 }}
    >
      <color attach="background" args={["#f5f4f1"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.8} color="#ffd9a0" />
      <group scale={0.72} position={[0.4, -0.4, 0]}>
        <Billboard progress={progress} />
      </group>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.16} scale={10} blur={2.4} far={4} />
    </Canvas>
  );
}
