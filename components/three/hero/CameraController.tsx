"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { pointer } from "@/lib/pointer";

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

export function CameraController({
  progress,
  interactive = true,
}: {
  progress: MutableRefObject<number>;
  interactive?: boolean;
}) {
  const intro = useRef({ t: 0 });
  const mouse = useRef(new THREE.Vector2());
  const look = useRef(new THREE.Vector3(4.2, 6.4, -28));
  const pos = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  const alongPos = useRef(new THREE.Vector3(0.7, 1.55, 2.2));
  const risePos = useRef(new THREE.Vector3(2.4, 4.2, -8));
  const closePos = useRef(new THREE.Vector3(6.6, 9.1, -20));
  const throughPos = useRef(new THREE.Vector3(7.4, 9.15, -28.6));
  const digitalPos = useRef(new THREE.Vector3(6.8, 9.2, -22));
  const exitPos = useRef(new THREE.Vector3(1.2, 3.4, 8));
  const alongLook = useRef(new THREE.Vector3(4.8, 7.6, -31));
  const riseLook = useRef(new THREE.Vector3(7.1, 9.1, -32));
  const closeLook = useRef(new THREE.Vector3(7.4, 9.15, -32));
  const throughLook = useRef(new THREE.Vector3(7.4, 9.15, -40));
  const digitalLook = useRef(new THREE.Vector3(7.4, 9.15, -32));
  const exitLook = useRef(new THREE.Vector3(0, 4, -20));

  useEffect(() => {
    const tween = gsap.fromTo(
      intro.current,
      { t: 0 },
      { t: 1, duration: 3, ease: "power2.inOut" },
    );
    return () => {
      tween.kill();
    };
  }, []);

  useFrame((state, delta) => {
    const p = progress.current;
    const i = smooth(intro.current.t);
    mouse.current.x = THREE.MathUtils.damp(mouse.current.x, interactive ? pointer.nx : 0, 2.4, delta);
    mouse.current.y = THREE.MathUtils.damp(mouse.current.y, interactive ? pointer.ny : 0, 2.4, delta);

    const along = smooth(THREE.MathUtils.smoothstep(p, 0, 0.22));
    const rise = smooth(THREE.MathUtils.smoothstep(p, 0.18, 0.42));
    const close = smooth(THREE.MathUtils.smoothstep(p, 0.38, 0.56));
    const through = smooth(THREE.MathUtils.smoothstep(p, 0.54, 0.7));
    const digital = smooth(THREE.MathUtils.smoothstep(p, 0.68, 0.88));
    const exit = smooth(THREE.MathUtils.smoothstep(p, 0.86, 1));

    pos.current.set(
      THREE.MathUtils.lerp(0.35, 0.9, i),
      THREE.MathUtils.lerp(1.22, 1.55, i),
      THREE.MathUtils.lerp(11.4, 5.4, i),
    );
    pos.current.lerp(alongPos.current, along);
    pos.current.lerp(risePos.current, rise);
    pos.current.lerp(closePos.current, close);
    pos.current.lerp(throughPos.current, through);
    pos.current.lerp(digitalPos.current, digital);
    pos.current.lerp(exitPos.current, exit);

    pos.current.x += mouse.current.x * 0.35;
    pos.current.y += mouse.current.y * -0.12;

    target.current.set(
      THREE.MathUtils.lerp(0.4, 4.6, i),
      THREE.MathUtils.lerp(1.35, 7.4, i),
      THREE.MathUtils.lerp(4, -30, i),
    );
    target.current.lerp(alongLook.current, along);
    target.current.lerp(riseLook.current, rise);
    target.current.lerp(closeLook.current, close);
    target.current.lerp(throughLook.current, through);
    target.current.lerp(digitalLook.current, digital);
    target.current.lerp(exitLook.current, exit);
    target.current.x += mouse.current.x * -0.25;

    state.camera.position.lerp(pos.current, 1 - Math.exp(-2.2 * delta));
    look.current.lerp(target.current, 1 - Math.exp(-2.4 * delta));
    state.camera.lookAt(look.current);
    state.camera.rotation.z = THREE.MathUtils.damp(
      state.camera.rotation.z,
      mouse.current.x * 0.042,
      2,
      delta,
    );
  });

  return null;
}
