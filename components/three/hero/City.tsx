"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useSurfaceTexture } from "@/components/three/hero/textures";

type Variant = "glass" | "concrete" | "apt" | "office";

const BUILDINGS: Array<{
  x: number;
  z: number;
  w: number;
  h: number;
  d: number;
  variant: Variant;
  tank?: boolean;
}> = [
  { x: -18, z: -52, w: 4.2, h: 38, d: 3.6, variant: "glass" },
  { x: -12.2, z: -50, w: 3.4, h: 26, d: 3.2, variant: "apt", tank: true },
  { x: -6.4, z: -54, w: 5.1, h: 44, d: 4.4, variant: "office" },
  { x: 1.2, z: -51, w: 3.8, h: 22, d: 3.5, variant: "concrete", tank: true },
  { x: 13.6, z: -49, w: 4.6, h: 36, d: 4.0, variant: "glass" },
  { x: 19.4, z: -56, w: 3.2, h: 19, d: 3.0, variant: "apt", tank: true },
  { x: -22.5, z: -62, w: 5.4, h: 48, d: 4.8, variant: "office" },
  { x: -14.8, z: -64, w: 3.6, h: 28, d: 3.4, variant: "concrete" },
  { x: -7.2, z: -66, w: 4.0, h: 33, d: 3.8, variant: "glass" },
  { x: 4.8, z: -63, w: 6.2, h: 52, d: 5.2, variant: "office" },
  { x: 12.2, z: -61, w: 3.5, h: 24, d: 3.3, variant: "apt", tank: true },
  { x: 20.8, z: -68, w: 4.4, h: 31, d: 4.1, variant: "concrete" },
  { x: -19, z: -74, w: 4.8, h: 41, d: 4.2, variant: "glass" },
  { x: -9.4, z: -78, w: 3.3, h: 18, d: 3.1, variant: "apt", tank: true },
  { x: 0.4, z: -76, w: 5.6, h: 46, d: 4.6, variant: "office" },
  { x: 10.6, z: -80, w: 3.9, h: 27, d: 3.6, variant: "concrete" },
  { x: 18.2, z: -75, w: 4.1, h: 35, d: 3.9, variant: "glass" },
];

function materialFor(variant: Variant, windows: THREE.Texture | null) {
  if (variant === "glass" || variant === "office") {
    return (
      <meshStandardMaterial
        color={variant === "office" ? "#121820" : "#1a2430"}
        metalness={0.72}
        roughness={0.22}
        envMapIntensity={1.2}
        emissive="#c9a15a"
        emissiveIntensity={0.045}
        emissiveMap={windows ?? undefined}
      />
    );
  }
  return (
    <meshStandardMaterial
      color={variant === "apt" ? "#4a453e" : "#5c564d"}
      metalness={0.08}
      roughness={0.9}
      envMapIntensity={0.35}
      emissive="#d6b06a"
      emissiveIntensity={0.03}
      emissiveMap={windows ?? undefined}
    />
  );
}

function Building({
  x,
  z,
  w,
  h,
  d,
  variant,
  tank,
  windows,
}: (typeof BUILDINGS)[number] & { windows: THREE.Texture | null }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        {materialFor(variant, windows)}
      </mesh>
      {variant !== "glass" && (
        <mesh position={[0, h + 0.35, 0]}>
          <boxGeometry args={[w * 0.92, 0.7, d * 0.92]} />
          <meshStandardMaterial color="#3a3732" roughness={0.95} />
        </mesh>
      )}
      {tank && (
        <mesh position={[w * 0.18, h + 1.15, d * 0.12]}>
          <cylinderGeometry args={[0.42, 0.42, 0.9, 10]} />
          <meshStandardMaterial color="#7a8694" metalness={0.55} roughness={0.4} />
        </mesh>
      )}
    </group>
  );
}

export function City({ dense = true }: { dense?: boolean }) {
  const far = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const windows = useSurfaceTexture("windows");
  const farCount = dense ? 36 : 14;
  const near = dense ? BUILDINGS : BUILDINGS.slice(0, 9);

  useLayoutEffect(() => {
    if (!far.current) return;
    for (let i = 0; i < farCount; i += 1) {
      dummy.position.set(-34 + (i % 12) * 6.6, 10 + (i % 5) * 2.4, -96 - (i % 5) * 7);
      dummy.scale.set(3.8 + (i % 3) * 0.8, 18 + (i % 7) * 4, 3.8);
      dummy.updateMatrix();
      far.current.setMatrixAt(i, dummy.matrix);
    }
    far.current.instanceMatrix.needsUpdate = true;
  }, [dummy, farCount]);

  return (
    <group>
      {near.map((b) => (
        <Building key={`${b.x}-${b.z}`} {...b} windows={windows} />
      ))}
      <instancedMesh ref={far} args={[undefined, undefined, farCount]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1b1f26" roughness={0.88} metalness={0.1} />
      </instancedMesh>
      <mesh position={[0, 12, -88]}>
        <planeGeometry args={[140, 40]} />
        <meshBasicMaterial color="#101b28" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh position={[0, 2.2, -70]} rotation={[0.08, 0, 0]}>
        <planeGeometry args={[160, 18]} />
        <meshBasicMaterial
          color="#7a4a28"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
