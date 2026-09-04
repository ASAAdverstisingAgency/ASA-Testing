"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Billboard, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { pointer } from "@/lib/pointer";
import type { MutableRefObject } from "react";

const RAIPUR = {
  lat: 21.2514,
  lon: 81.6296,
  label: "ASA Billboard",
  place: "Raipur, Chhattisgarh",
};

const GLOBE_RADIUS = 1.62;

const CHHATTISGARH: [number, number][] = [
  [17.9, 80.3],
  [17.8, 81.1],
  [17.9, 82.3],
  [18.5, 82.9],
  [19.0, 83.4],
  [19.7, 83.5],
  [20.4, 83.3],
  [21.2, 83.6],
  [21.9, 83.3],
  [22.6, 84.0],
  [23.3, 83.8],
  [24.1, 83.3],
  [24.1, 82.2],
  [23.7, 81.4],
  [23.8, 80.3],
  [22.8, 80.2],
  [21.7, 80.6],
  [20.6, 80.6],
  [19.5, 80.5],
  [18.5, 80.4],
  [17.9, 80.3],
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function facingQuaternion(lat: number, lon: number) {
  return new THREE.Quaternion().setFromEuler(
    new THREE.Euler(
      THREE.MathUtils.degToRad(lat),
      THREE.MathUtils.degToRad(-(90 + lon)),
      0,
      "YXZ",
    ),
  );
}

function pointInRing(lat: number, lon: number, ring: [number, number][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const yi = ring[i][0];
    const xi = ring[i][1];
    const yj = ring[j][0];
    const xj = ring[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function distanceDeg(lat: number, lon: number, lat2: number, lon2: number) {
  const dLat = lat - lat2;
  const dLon = (lon - lon2) * Math.cos(((lat + lat2) * 0.5 * Math.PI) / 180);
  return Math.hypot(dLat, dLon);
}

function rasterizeMask(image: CanvasImageSource) {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { data: new Uint8ClampedArray(width * height * 4), width, height };
  ctx.drawImage(image, 0, 0, width, height);
  return { data: ctx.getImageData(0, 0, width, height).data, width, height };
}

function isLand(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  lat: number,
  lon: number,
) {
  const u = (lon + 180) / 360;
  const v = (90 - lat) / 180;
  const x = Math.min(width - 1, Math.max(0, Math.floor(u * width)));
  const y = Math.min(height - 1, Math.max(0, Math.floor(v * height)));
  return data[(y * width + x) * 4] < 90;
}

function fibonacciCoords(count: number) {
  const coords: { lat: number; lon: number }[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - ((i + 0.5) / count) * 2;
    const lat = Math.asin(Math.min(1, Math.max(-1, y))) * (180 / Math.PI);
    let lon = (((golden * i) * 180) / Math.PI) % 360;
    if (lon > 180) lon -= 360;
    coords.push({ lat, lon });
  }
  return coords;
}

function bboxCoords(
  latMin: number,
  latMax: number,
  lonMin: number,
  lonMax: number,
  step: number,
) {
  const coords: { lat: number; lon: number }[] = [];
  for (let lat = latMin; lat <= latMax; lat += step) {
    const lonStep = step / Math.max(0.22, Math.cos((lat * Math.PI) / 180));
    for (let lon = lonMin; lon <= lonMax; lon += lonStep) {
      coords.push({ lat, lon });
    }
  }
  return coords;
}

const DOT_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aPulse;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uTime;

  void main() {
    vColor = aColor;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec3 viewDir = normalize(cameraPosition - world.xyz);
    vec3 normal = normalize(mat3(modelMatrix) * position);
    float facing = dot(normal, viewDir);
    vAlpha = mix(0.14, 1.0, smoothstep(-0.22, 0.5, facing));

    float pulse = 1.0 + aPulse * 0.2 * sin(uTime * 2.6);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * pulse * uScale * uPixelRatio / max(0.8, -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const DOT_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord * 2.0 - 1.0;
    float dist = dot(center, center);
    if (dist > 1.0) discard;
    float edge = smoothstep(1.0, 0.55, dist);
    gl_FragColor = vec4(vColor, vAlpha * edge);
  }
`;

function buildDotGeometry(image: CanvasImageSource, quality: number) {
  const { data, width, height } = rasterizeMask(image);
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];
  const pulses: number[] = [];
  const scratch = new THREE.Vector3();

  const ink = new THREE.Color("#8a8680");
  const accent = new THREE.Color("#c45c3a");
  const ocean = new THREE.Color("#d8d4cc");

  const push = (
    lat: number,
    lon: number,
    color: THREE.Color,
    size: number,
    pulse: number,
  ) => {
    scratch.copy(latLonToVector3(lat, lon, GLOBE_RADIUS));
    positions.push(scratch.x, scratch.y, scratch.z);
    colors.push(color.r, color.g, color.b);
    sizes.push(size);
    pulses.push(pulse);
  };

  const globalCount = Math.floor(36000 * quality);
  fibonacciCoords(globalCount).forEach(({ lat, lon }, index) => {
    if (isLand(data, width, height, lat, lon)) {
      const nearBillboard = distanceDeg(lat, lon, RAIPUR.lat, RAIPUR.lon) < 0.38;
      const inState = pointInRing(lat, lon, CHHATTISGARH);
      if (nearBillboard) push(lat, lon, accent, 3.4, 1);
      else if (inState) push(lat, lon, accent, 2.7, 1);
      else push(lat, lon, ink, 1.95, 0);
    } else if (index % 14 === 0) {
      push(lat, lon, ocean, 1.05, 0);
    }
  });

  const stateStep = 0.055 / quality;
  for (const { lat, lon } of bboxCoords(17.7, 24.2, 80.15, 84.1, stateStep)) {
    if (!isLand(data, width, height, lat, lon)) continue;
    if (!pointInRing(lat, lon, CHHATTISGARH)) continue;
    const nearBillboard = distanceDeg(lat, lon, RAIPUR.lat, RAIPUR.lon) < 0.22;
    push(lat, lon, accent, nearBillboard ? 3.8 : 3.0, 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aColor", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
  geometry.setAttribute("aPulse", new THREE.Float32BufferAttribute(pulses, 1));
  return geometry;
}

function DottedEarth({ quality }: { quality: number }) {
  const { gl } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);
  const mask = useTexture("/globe/earth-water.png");
  const geometry = useMemo(
    () => buildDotGeometry(mask.image as CanvasImageSource, quality),
    [mask, quality],
  );

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: gl.getPixelRatio() },
      uScale: { value: 5.1 },
      uTime: { value: 0 },
    }),
    [gl],
  );

  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={DOT_VERT}
        fragmentShader={DOT_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

function PlaceholderDots() {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (const { lat, lon } of fibonacciCoords(2200)) {
      const point = latLonToVector3(lat, lon, GLOBE_RADIUS);
      positions.push(point.x, point.y, point.z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#b9b5ad" size={0.018} sizeAttenuation />
    </points>
  );
}

function BillboardRay({
  lat,
  lon,
  radius,
}: {
  lat: number;
  lon: number;
  radius: number;
}) {
  const beam = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const position = useMemo(
    () => latLonToVector3(lat, lon, radius),
    [lat, lon, radius],
  );
  const quaternion = useMemo(() => {
    const normal = position.clone().normalize();
    const rayDir = normal
      .clone()
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0.12, 0.82, 0.18))
      .normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      rayDir,
    );
  }, [position]);
  const markerPos = useMemo(
    () => position.clone().add(position.clone().normalize().multiplyScalar(0.06)),
    [position],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (beam.current) {
      const mat = beam.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.86 + Math.sin(t * 2.6) * 0.1;
    }
    if (core.current) {
      const mat = core.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.95 + Math.sin(t * 3.2) * 0.05;
    }
    if (pulse.current) {
      const s = 1 + (Math.sin(t * 2.2) * 0.5 + 0.5) * 1.5;
      pulse.current.scale.setScalar(s);
      const mat = pulse.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 * (1 - (s - 1) / 1.5);
    }
  });

  return (
    <group>
      <group position={position} quaternion={quaternion}>
        <mesh ref={beam} position={[0, 0.95, 0]} renderOrder={30}>
          <cylinderGeometry args={[0.03, 0.01, 1.9, 20, 1, true]} />
          <meshBasicMaterial
            color="#c45c3a"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={core} position={[0, 0.95, 0]} renderOrder={31}>
          <cylinderGeometry args={[0.011, 0.003, 1.9, 12]} />
          <meshBasicMaterial
            color="#fff4ee"
            transparent
            opacity={1}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 1.92, 0]} renderOrder={32}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial
            color="#c45c3a"
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <Billboard position={markerPos} follow>
        <mesh renderOrder={40}>
          <circleGeometry args={[0.075, 48]} />
          <meshBasicMaterial
            color="#c45c3a"
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh renderOrder={41}>
          <circleGeometry args={[0.03, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={pulse} renderOrder={39}>
          <ringGeometry args={[0.09, 0.14, 48]} />
          <meshBasicMaterial
            color="#c45c3a"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </Billboard>
      <pointLight position={markerPos} color="#c45c3a" intensity={2.2} distance={4} />
    </group>
  );
}

interface GlobeProps {
  progress?: MutableRefObject<number>;
  interactive?: boolean;
  detailed?: boolean;
}

export function Globe({
  progress,
  interactive = true,
  detailed = true,
}: GlobeProps) {
  const root = useRef<THREE.Group>(null);
  const world = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2());
  const intro = useRef(0);

  const startFacing = useMemo(
    () => facingQuaternion(RAIPUR.lat - 2, RAIPUR.lon - 18),
    [],
  );
  const locationFacing = useMemo(
    () => facingQuaternion(RAIPUR.lat - 2, RAIPUR.lon + 16),
    [],
  );

  useFrame((state, delta) => {
    if (!root.current || !world.current) return;
    const p = progress?.current ?? 0;
    const mouseX = interactive ? pointer.nx : 0;
    const mouseY = interactive ? pointer.ny : 0;

    intro.current = Math.min(1, intro.current + delta / 1.45);
    const eased = 1 - (1 - intro.current) ** 3;
    world.current.quaternion.slerpQuaternions(startFacing, locationFacing, eased);

    target.current.x += (mouseX * 0.35 - target.current.x) * 0.05;
    target.current.y += (mouseY * 0.24 - target.current.y) * 0.05;

    const idle = Math.sin(state.clock.elapsedTime * 0.22) * 0.025;
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      target.current.x * 0.18 + idle,
      2.2,
      delta,
    );
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      target.current.y * 0.12,
      2.2,
      delta,
    );
    root.current.position.z = p * 0.9;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      target.current.x * 0.18,
      2,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      -target.current.y * 0.1,
      2,
      delta,
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      4.7 - p * 1.05,
      2,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <group ref={root} position={[0.12, 0, 0]}>
        <group ref={world}>
          <Suspense fallback={<PlaceholderDots />}>
            <DottedEarth quality={detailed ? 1 : 0.62} />
          </Suspense>
          <BillboardRay
            lat={RAIPUR.lat}
            lon={RAIPUR.lon}
            radius={GLOBE_RADIUS + 0.02}
          />
        </group>
      </group>
      <ContactShadows
        position={[0.12, -1.78, 0]}
        opacity={0.12}
        scale={8}
        blur={2.8}
        far={3.6}
      />
    </>
  );
}
