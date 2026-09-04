"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ROAD_CURVE } from "@/components/three/hero/Road";

export function LightTrails({ count = 14 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const offsets = useMemo(
    () => Array.from({ length: count }, (_, i) => i / count),
    [count],
  );
  const point = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const speed = 0.08 + (index % 3) * 0.025;
      const t = (offsets[index] + delta * speed) % 1;
      offsets[index] = t;
      ROAD_CURVE.getPointAt(t, point);
      ROAD_CURVE.getTangentAt(t, look);
      child.position.copy(point);
      child.position.y = -1.28 + (index % 2) * 0.02;
      child.lookAt(point.x + look.x, child.position.y, point.z + look.z);
    });
  });

  return (
    <group ref={group}>
      {offsets.map((_, index) => (
        <mesh key={index} scale={[0.045, 0.045, 1.6 + (index % 4) * 0.55]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#fff6d4" : "#F5B400"}
            transparent
            opacity={0.55 + (index % 4) * 0.08}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
