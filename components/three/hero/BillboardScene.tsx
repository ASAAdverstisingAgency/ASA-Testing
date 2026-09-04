"use client";

import type { MutableRefObject } from "react";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Bloom, EffectComposer, SMAA, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { pointer } from "@/lib/pointer";
import { Billboard } from "@/components/three/hero/Billboard";
import { Bridge } from "@/components/three/hero/Bridge";
import { CameraController } from "@/components/three/hero/CameraController";
import { City } from "@/components/three/hero/City";
import { Sky } from "@/components/three/hero/Sky";
import { Traffic } from "@/components/three/hero/Traffic";

export function BillboardScene({
  progress,
  reduced = false,
  interactive = true,
}: {
  progress: MutableRefObject<number>;
  reduced?: boolean;
  interactive?: boolean;
}) {
  const city = useRef<THREE.Group>(null);
  const board = useRef<THREE.Group>(null);
  const bridge = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2());

  useFrame((_, delta) => {
    mouse.current.x = THREE.MathUtils.damp(
      mouse.current.x,
      interactive ? pointer.nx : 0,
      2.5,
      delta,
    );
    mouse.current.y = THREE.MathUtils.damp(
      mouse.current.y,
      interactive ? pointer.ny : 0,
      2.5,
      delta,
    );
    if (bridge.current) {
      bridge.current.position.x = mouse.current.x * 0.18;
      bridge.current.rotation.y = mouse.current.x * 0.012;
    }
    if (board.current) {
      board.current.position.x = mouse.current.x * 0.08;
    }
    if (city.current) {
      city.current.position.x = mouse.current.x * 0.03;
    }
  });

  return (
    <>
      <color attach="background" args={["#071018"]} />
      <fog attach="fog" args={["#101b28", 32, reduced ? 95 : 140]} />
      <Sky />
      <hemisphereLight args={["#4a6a88", "#0b0d10", 0.62]} />
      <directionalLight
        position={[-14, 22, 10]}
        intensity={0.48}
        color="#9bb4ce"
        castShadow={!reduced}
        shadow-mapSize-width={reduced ? 512 : 1024}
        shadow-mapSize-height={reduced ? 512 : 1024}
        shadow-camera-far={90}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
      />
      <directionalLight position={[18, 5, -12]} intensity={0.18} color="#c47a3a" />
      <pointLight position={[7.4, 13.2, -29.5]} intensity={2.1} color="#fff3c4" distance={26} />

      <Suspense fallback={null}>
        <Environment preset="night" environmentIntensity={0.18} />
      </Suspense>

      <CameraController progress={progress} interactive={interactive} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8.2, -20]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color="#0c1016" roughness={1} />
      </mesh>

      <group ref={city}>
        <City dense={!reduced} />
      </group>
      <group ref={bridge}>
        <Bridge reduced={reduced} />
        <Traffic count={reduced ? 4 : 9} />
      </group>
      <group ref={board}>
        <Billboard progress={progress} />
      </group>

      <ContactShadows
        position={[0, 0.01, -2]}
        opacity={0.28}
        scale={42}
        blur={2.6}
        far={14}
        color="#000000"
      />

      {!reduced && (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <SMAA />
          <Bloom intensity={0.18} luminanceThreshold={1.15} luminanceSmoothing={0.22} mipmapBlur />
          <Vignette darkness={0.32} offset={0.32} />
        </EffectComposer>
      )}
    </>
  );
}
