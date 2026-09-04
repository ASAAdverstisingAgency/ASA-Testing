"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = ["#c5c8cd", "#1c1c1c", "#7a1c1c", "#d6cec2", "#2a3648", "#ece8e0", "#3d4a3a"];

type Kind = "sedan" | "suv" | "hatch";

function dims(kind: Kind) {
  if (kind === "suv") return { body: [1.86, 0.62, 4.45] as const, cabin: [1.62, 0.5, 2.15] as const, cabinY: 0.82 };
  if (kind === "hatch") return { body: [1.62, 0.46, 3.55] as const, cabin: [1.48, 0.4, 1.7] as const, cabinY: 0.66 };
  return { body: [1.72, 0.48, 4.15] as const, cabin: [1.56, 0.42, 2.05] as const, cabinY: 0.7 };
}

function Car({
  color,
  lane,
  speed,
  start,
  kind,
}: {
  color: string;
  lane: number;
  speed: number;
  start: number;
  kind: Kind;
}) {
  const group = useRef<THREE.Group>(null);
  const z = useRef(start);
  const { body, cabin, cabinY } = dims(kind);

  useFrame((_, delta) => {
    if (!group.current) return;
    z.current += speed * delta;
    if (speed > 0 && z.current > 18) z.current = -22;
    if (speed < 0 && z.current < -22) z.current = 18;
    group.current.position.set(lane, 0.38, z.current);
    group.current.rotation.y = speed < 0 ? Math.PI : 0;
  });

  return (
    <group ref={group} position={[lane, 0.38, start]}>
      <mesh castShadow position={[0, 0.26, 0]}>
        <boxGeometry args={[body[0], body[1], body[2]]} />
        <meshStandardMaterial
          color={color}
          metalness={0.82}
          roughness={0.26}
          envMapIntensity={1.25}
        />
      </mesh>
      <mesh castShadow position={[0, cabinY, -0.28]}>
        <boxGeometry args={[cabin[0], cabin[1], cabin[2]]} />
        <meshStandardMaterial
          color="#6f8496"
          metalness={0.35}
          roughness={0.08}
          transparent
          opacity={0.78}
          envMapIntensity={1.4}
        />
      </mesh>
      {([-0.58, 0.58] as const).flatMap((x) =>
        ([-body[2] * 0.32, body[2] * 0.32] as const).map((zz) => (
          <mesh key={`${x}-${zz}`} position={[x, 0.16, zz]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.27, 0.27, 0.18, 10]} />
            <meshStandardMaterial color="#111" roughness={0.72} />
          </mesh>
        )),
      )}
      <mesh position={[0.48, 0.3, body[2] / 2 - 0.02]}>
        <boxGeometry args={[0.28, 0.12, 0.05]} />
        <meshStandardMaterial color="#fff4cc" emissive="#fff4cc" emissiveIntensity={2.2} toneMapped={false} />
      </mesh>
      <mesh position={[-0.48, 0.3, body[2] / 2 - 0.02]}>
        <boxGeometry args={[0.28, 0.12, 0.05]} />
        <meshStandardMaterial color="#fff4cc" emissive="#fff4cc" emissiveIntensity={2.2} toneMapped={false} />
      </mesh>
      <mesh position={[0.48, 0.3, -body[2] / 2 + 0.02]}>
        <boxGeometry args={[0.3, 0.1, 0.04]} />
        <meshStandardMaterial color="#ff2a2a" emissive="#c21818" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      <mesh position={[-0.48, 0.3, -body[2] / 2 + 0.02]}>
        <boxGeometry args={[0.3, 0.1, 0.04]} />
        <meshStandardMaterial color="#ff2a2a" emissive="#c21818" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function Traffic({ count = 8 }: { count?: number }) {
  const cars = useMemo(
    () => {
      const kinds: Kind[] = ["sedan", "suv", "hatch"];
      return Array.from({ length: count }, (_, i) => ({
        color: COLORS[i % COLORS.length] ?? "#ccc",
        lane: [-3.5, -1.15, 1.15, 3.5][i % 4] ?? 1.15,
        speed: (i % 2 === 0 ? 1 : -1) * (2.4 + (i % 3) * 0.55),
        start: -18 + i * 4.6,
        kind: kinds[i % 3] ?? "sedan",
      }));
    },
    [count],
  );

  return (
    <group>
      {cars.map((car, index) => (
        <Car key={index} {...car} />
      ))}
    </group>
  );
}
