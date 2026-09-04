"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingObjects({ reduced = false }: { reduced?: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, index) => {
      child.position.y += Math.sin(t * 0.6 + index) * 0.0018;
      child.rotation.y = t * (0.12 + index * 0.04);
    });
  });

  return (
    <group ref={group}>
      <mesh position={[-2.1, 1.7, 1.1]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2.4, 2.1, 0.4]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#F5B400" metalness={0.3} roughness={0.35} />
      </mesh>
      {!reduced && (
        <>
          <mesh position={[1.1, 2.35, -0.6]} rotation={[0.4, 0.2, 0.3]}>
            <octahedronGeometry args={[0.11, 0]} />
            <meshStandardMaterial color="#f5f4f1" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[-1.6, 0.55, 1.6]} rotation={[0.2, 0.8, 0]}>
            <boxGeometry args={[0.16, 0.16, 0.16]} />
            <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.28} />
          </mesh>
        </>
      )}
    </group>
  );
}
