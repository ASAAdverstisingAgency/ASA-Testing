"use client";

import { useMemo } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    float h = normalize(vWorld).y;
    vec3 zenith = vec3(0.028, 0.055, 0.09);
    vec3 mid = vec3(0.07, 0.13, 0.21);
    vec3 horizon = vec3(0.48, 0.28, 0.14);
    vec3 col = mix(horizon, mid, smoothstep(-0.08, 0.16, h));
    col = mix(col, zenith, smoothstep(0.16, 0.72, h));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function Sky() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
      }),
    [],
  );

  return (
    <mesh scale={160} frustumCulled={false}>
      <sphereGeometry args={[1, 32, 24]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
