"use client";

import type { MutableRefObject } from "react";
import { useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { useCampaignTexture } from "@/components/three/hero/textures";

function Steel({ children, ...props }: ThreeElements["mesh"]) {
  return (
    <mesh castShadow receiveShadow {...props}>
      {children}
      <meshStandardMaterial color="#1c1c1c" metalness={0.92} roughness={0.32} envMapIntensity={1.1} />
    </mesh>
  );
}

export function Billboard({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const print = useCampaignTexture("print");
  const digital = useCampaignTexture("digital");
  const printMat = useRef<THREE.MeshStandardMaterial>(null);
  const digitalMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const p = progress.current;
    const digitalMix = THREE.MathUtils.smoothstep(p, 0.52, 0.68);
    const pass = THREE.MathUtils.smoothstep(p, 0.62, 0.8);
    group.current.scale.setScalar(
      THREE.MathUtils.damp(group.current.scale.x, 1 + pass * 0.08, 2.6, delta),
    );
    if (printMat.current) printMat.current.opacity = 1 - digitalMix;
    if (digitalMat.current) {
      digitalMat.current.opacity = digitalMix;
      digitalMat.current.emissiveIntensity = 0.2 + digitalMix * 0.9;
    }
  });

  return (
    <group ref={group} position={[7.4, 0, -32]}>
      {[-3.6, 3.6].map((x) => (
        <Steel key={x} position={[x, 4.1, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 8.2, 12]} />
        </Steel>
      ))}
      <Steel position={[0, 6.4, 0]}>
        <boxGeometry args={[8.6, 0.28, 0.42]} />
      </Steel>
      <Steel position={[-3.6, 5.2, 0.18]} rotation={[0, 0, 0.55]}>
        <boxGeometry args={[0.12, 3.4, 0.12]} />
      </Steel>
      <Steel position={[3.6, 5.2, 0.18]} rotation={[0, 0, -0.55]}>
        <boxGeometry args={[0.12, 3.4, 0.12]} />
      </Steel>

      <Steel position={[0, 9.15, 0]}>
        <boxGeometry args={[12.4, 6.35, 0.42]} />
      </Steel>
      <mesh position={[0, 9.15, 0.18]} castShadow>
        <boxGeometry args={[11.7, 5.75, 0.12]} />
        <meshStandardMaterial color="#080808" roughness={0.62} metalness={0.12} />
      </mesh>
      <mesh position={[0, 9.15, 0.26]}>
        <planeGeometry args={[11.45, 5.5]} />
        <meshStandardMaterial
          ref={printMat}
          map={print}
          color={print ? "#ffffff" : "#111"}
          roughness={0.42}
          metalness={0.04}
          transparent
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>
      <mesh position={[0, 9.15, 0.27]}>
        <planeGeometry args={[11.45, 5.5]} />
        <meshStandardMaterial
          ref={digitalMat}
          map={digital}
          color="#ffffff"
          emissive="#F5B400"
          emissiveIntensity={0}
          roughness={0.16}
          metalness={0.28}
          transparent
          opacity={0}
        />
      </mesh>

      {[-5.2, -1.7, 1.7, 5.2].map((x) => (
        <group key={x} position={[x, 12.45, 0.28]}>
          <Steel>
            <boxGeometry args={[0.22, 0.14, 0.32]} />
          </Steel>
          <mesh position={[0, -0.08, 0.16]} rotation={[0.8, 0, 0]}>
            <coneGeometry args={[0.12, 0.16, 8]} />
            <meshStandardMaterial color="#fff6d2" emissive="#F5B400" emissiveIntensity={1.1} />
          </mesh>
        </group>
      ))}

      <Steel position={[0, 6.05, 0.55]}>
        <boxGeometry args={[11.8, 0.08, 0.85]} />
      </Steel>
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={`bolt-${i}`} position={[-5.6 + i * 1.24, 6.08, 0.22]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}
