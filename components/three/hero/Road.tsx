"use client";

import { useMemo } from "react";
import * as THREE from "three";

export const ROAD_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(7.4, -1.38, 10.2),
  new THREE.Vector3(4.2, -1.38, 6.1),
  new THREE.Vector3(1.9, -1.38, 3.6),
  new THREE.Vector3(0.15, -1.38, 1.7),
  new THREE.Vector3(-1.6, -1.38, -0.8),
]);

function ribbon(curve: THREE.CatmullRomCurve3, width: number, segments = 96) {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x)
      .normalize()
      .multiplyScalar(width * 0.5);
    const left = point.clone().add(side);
    const right = point.clone().sub(side);
    left.y = -1.385;
    right.y = -1.385;
    positions.push(left.x, left.y, left.z, right.x, right.y, right.z);
    uvs.push(0, t * 8, 1, t * 8);
    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function Road() {
  const asphalt = useMemo(() => ribbon(ROAD_CURVE, 1.85), []);
  const shoulder = useMemo(() => ribbon(ROAD_CURVE, 2.25), []);
  const lane = useMemo(() => ribbon(ROAD_CURVE, 0.06), []);

  return (
    <group>
      <mesh geometry={shoulder} receiveShadow>
        <meshStandardMaterial color="#4a453c" roughness={0.95} metalness={0} />
      </mesh>
      <mesh geometry={asphalt} receiveShadow>
        <meshStandardMaterial color="#1a1a1a" roughness={0.72} metalness={0.08} />
      </mesh>
      <mesh geometry={lane} position={[0, 0.008, 0]}>
        <meshBasicMaterial color="#F5B400" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}
