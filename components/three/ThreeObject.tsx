"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { pointer } from "@/lib/pointer";

interface ThreeObjectProps {
  progress?: React.MutableRefObject<number>;
  interactive?: boolean;
  scale?: number;
  variant?: "hero" | "cta";
}

export function ThreeObject({
  progress,
  interactive = true,
  scale = 1,
  variant = "hero",
}: ThreeObjectProps) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progress?.current ?? 0;
    const mouseX = interactive ? pointer.nx : 0;
    const mouseY = interactive ? pointer.ny : 0;

    target.current.x += (mouseX * 0.7 - target.current.x) * 0.06;
    target.current.y += (mouseY * 0.5 - target.current.y) * 0.06;

    group.current.rotation.y += delta * 0.18 + p * delta * 0.2;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      target.current.y * 0.45 + p * 0.3,
      2.6,
      delta,
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      -target.current.x * 0.16,
      2.4,
      delta,
    );

    group.current.position.x = target.current.x * 0.28;
    group.current.position.y = -target.current.y * 0.18;
    group.current.position.z = variant === "hero" ? p * 0.9 : 0;
    group.current.scale.setScalar(scale * (1 + p * 0.2));

    if (ring.current) {
      ring.current.rotation.x += delta * 0.22;
      ring.current.rotation.y -= delta * 0.12;
    }

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      target.current.x * 0.4,
      2.2,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      0.12 - target.current.y * 0.25,
      2.2,
      delta,
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      variant === "hero" ? 5.4 - p * 1.15 : 4.8,
      2.1,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#ffffff", "#cfc8be", 0.95]} />
      <directionalLight position={[4, 6, 3]} intensity={2} color="#fff6ea" />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#9aa7b5" />

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.2}>
        <group ref={group}>
          <mesh>
            <icosahedronGeometry args={[1.28, 1]} />
            <meshPhysicalMaterial
              color="#cfc8bd"
              metalness={1}
              roughness={0.14}
              clearcoat={1}
              clearcoatRoughness={0.08}
            />
          </mesh>
          <mesh scale={0.72}>
            <icosahedronGeometry args={[1.28, 0]} />
            <meshPhysicalMaterial
              color="#e8e2d6"
              metalness={0.08}
              roughness={0.12}
              transmission={0.65}
              thickness={1.1}
              ior={1.45}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh ref={ring} rotation={[Math.PI / 2.4, 0.4, 0.2]}>
            <torusGeometry args={[1.85, 0.018, 12, 80]} />
            <meshPhysicalMaterial
              color="#111111"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.75, 0]}
        opacity={0.16}
        scale={8}
        blur={2.5}
        far={3.5}
      />
    </>
  );
}
