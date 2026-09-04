"use client";

import { MeshReflectorMaterial } from "@react-three/drei";
import { useSurfaceTexture } from "@/components/three/hero/textures";

export function Bridge({ reduced = false }: { reduced?: boolean }) {
  const asphalt = useSurfaceTexture("asphalt");
  const concrete = useSurfaceTexture("concrete");

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -4]} receiveShadow>
        <planeGeometry args={[13.5, 48]} />
        {reduced ? (
          <meshStandardMaterial map={asphalt} color="#1c1c1e" roughness={0.88} metalness={0.08} />
        ) : (
          <MeshReflectorMaterial
            map={asphalt ?? undefined}
            color="#16171a"
            roughness={0.82}
            metalness={0.22}
            blur={[250, 80]}
            resolution={512}
            mixBlur={0.85}
            mixStrength={28}
            minDepthThreshold={0.7}
            maxDepthThreshold={1.4}
            depthScale={1.1}
            mirror={0.12}
          />
        )}
      </mesh>

      {[-0.18, 8, -8].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, z]}>
          <planeGeometry args={[13.2, 0.08]} />
          <meshStandardMaterial color="#0c0c0c" roughness={1} />
        </mesh>
      ))}

      {[-6.05, 6.05].map((x) => (
        <mesh key={`edge-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.014, -3]}>
          <planeGeometry args={[0.1, 42]} />
          <meshStandardMaterial color="#d8d2c4" roughness={0.7} />
        </mesh>
      ))}
      {Array.from({ length: 14 }, (_, i) =>
        [-3.6, -1.2, 1.2, 3.6].map((x) => (
          <mesh
            key={`${x}-${i}`}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[x, 0.016, -24 + i * 3.4]}
          >
            <planeGeometry args={[0.09, 1.7]} />
            <meshStandardMaterial color="#d4cdb8" roughness={0.68} />
          </mesh>
        )),
      )}

      {[-6.4, 6.4].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.55, -4]} castShadow receiveShadow>
            <boxGeometry args={[0.42, 1.1, 46]} />
            <meshStandardMaterial map={concrete} color="#8b847a" roughness={0.92} metalness={0.04} />
          </mesh>
          <mesh position={[x, 1.18, -4]} castShadow>
            <boxGeometry args={[0.08, 0.7, 46]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.35} />
          </mesh>
        </group>
      ))}

      {[-16, -8, 0, 8, 16].map((z) =>
        [-6.4, 6.4].map((x) => (
          <group key={`${x}-${z}`} position={[x, 0, z]}>
            <mesh position={[0, 3.1, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.07, 6.2, 8]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
            </mesh>
            <mesh position={[x > 0 ? -0.55 : 0.55, 6.05, 0]} rotation={[0, 0, x > 0 ? 0.4 : -0.4]}>
              <boxGeometry args={[1.1, 0.06, 0.18]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.35} />
            </mesh>
            <mesh position={[x > 0 ? -0.95 : 0.95, 5.95, 0]}>
              <sphereGeometry args={[0.09, 8, 8]} />
              <meshStandardMaterial
                color="#fff1c2"
                emissive="#fff1c2"
                emissiveIntensity={1.8}
                toneMapped={false}
              />
            </mesh>
            {z === 0 && (
              <pointLight
                position={[x > 0 ? -1.05 : 1.05, 5.7, 0]}
                intensity={5.5}
                color="#fff1c2"
                distance={16}
                decay={2}
              />
            )}
          </group>
        )),
      )}

      {[-5.2, 5.2].map((x) => (
        <mesh key={x} position={[x, -4.2, -6]} receiveShadow>
          <boxGeometry args={[1.6, 8.4, 3.2]} />
          <meshStandardMaterial map={concrete} color="#7a736a" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}
