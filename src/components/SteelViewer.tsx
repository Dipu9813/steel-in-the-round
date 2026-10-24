import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, ContactShadows, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type ProductKey = "ibeam" | "pipe" | "rebar" | "angle" | "channel" | "sheet";

function extrude(shape: THREE.Shape, depth = 4) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 });
  g.center();
  return g;
}

function useGeometry(kind: ProductKey) {
  return useMemo(() => {
    const s = new THREE.Shape();
    switch (kind) {
      case "ibeam":
        s.moveTo(-0.6, -0.8); s.lineTo(0.6, -0.8); s.lineTo(0.6, -0.65); s.lineTo(0.08, -0.65);
        s.lineTo(0.08, 0.65); s.lineTo(0.6, 0.65); s.lineTo(0.6, 0.8); s.lineTo(-0.6, 0.8);
        s.lineTo(-0.6, 0.65); s.lineTo(-0.08, 0.65); s.lineTo(-0.08, -0.65); s.lineTo(-0.6, -0.65);
        return extrude(s);
      case "pipe": {
        s.absarc(0, 0, 0.6, 0, Math.PI * 2, false);
        const h = new THREE.Path(); h.absarc(0, 0, 0.5, 0, Math.PI * 2, true); s.holes.push(h);
        const g = new THREE.ExtrudeGeometry(s, { depth: 4, bevelEnabled: false, curveSegments: 64 }); g.center(); return g;
      }
      case "angle":
        s.moveTo(-0.6, -0.6); s.lineTo(0.6, -0.6); s.lineTo(0.6, -0.48); s.lineTo(-0.48, -0.48);
        s.lineTo(-0.48, 0.6); s.lineTo(-0.6, 0.6);
        return extrude(s);
      case "channel":
        s.moveTo(-0.5, -0.8); s.lineTo(0.4, -0.8); s.lineTo(0.4, -0.66); s.lineTo(-0.36, -0.66);
        s.lineTo(-0.36, 0.66); s.lineTo(0.4, 0.66); s.lineTo(0.4, 0.8); s.lineTo(-0.5, 0.8);
        return extrude(s);
      case "sheet": {
        const pts: THREE.Vector2[] = [];
        for (let i = 0; i <= 80; i++) { const x = -1.6 + (i / 80) * 3.2; pts.push(new THREE.Vector2(x, Math.sin(x * 6) * 0.08)); }
        for (let i = 80; i >= 0; i--) { const x = -1.6 + (i / 80) * 3.2; pts.push(new THREE.Vector2(x, Math.sin(x * 6) * 0.08 - 0.03)); }
        return extrude(new THREE.Shape(pts), 3);
      }
      default:
        return new THREE.CylinderGeometry(0.22, 0.22, 4, 32);
    }
  }, [kind]);
}

function Rebar({ material }: { material: THREE.Material }) {
  const ribs = useMemo(() => Array.from({ length: 34 }, (_, i) => -1.95 + i * 0.118), []);
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh material={material} castShadow><cylinderGeometry args={[0.22, 0.22, 4, 32]} /></mesh>
      {ribs.map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2 + 0.35, 0, 0]} material={material} castShadow>
          <torusGeometry args={[0.22, 0.035, 8, 32]} />
        </mesh>
      ))}
    </group>
  );
}

function Product({ kind, autoRotate }: { kind: ProductKey; autoRotate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const geo = useGeometry(kind);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#9aa3ad", metalness: 1, roughness: kind === "sheet" ? 0.35 : 0.28 }),
    [kind],
  );
  useFrame((_, d) => { if (ref.current && autoRotate) ref.current.rotation.y += Math.min(d, 0.05) * 0.4; });
  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={ref} rotation={[0.35, 0.6, 0]}>
        {kind === "rebar" ? <Rebar material={material} /> : <mesh geometry={geo} material={material} rotation={kind === "sheet" ? [-Math.PI / 2.4, 0, 0] : [0, Math.PI / 2, 0]} castShadow />}
      </group>
    </Float>
  );
}

export default function SteelViewer({ kind, autoRotate = true }: { kind: ProductKey; autoRotate?: boolean }) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.2, 7.5], fov: 40 }}>
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={1.7} castShadow />
      <pointLight position={[-4, -1, 3]} intensity={22} color="#ff7a1a" />
      <Product kind={kind} autoRotate={autoRotate} />
      <ContactShadows position={[0, -1.6, 0]} color="#242c38" opacity={0.32} blur={2.6} scale={12} far={4} />
      <Environment resolution={256}>
        <Lightformer intensity={2.4} color="#ffffff" position={[0, 6, 2]} scale={[14, 4, 1]} />
        <Lightformer intensity={1.7} color="#ffffff" position={[0, -5, 2]} scale={[14, 4, 1]} />
        <Lightformer intensity={3} position={[0, 5, -2]} scale={[10, 2, 1]} />
        <Lightformer intensity={2} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[10, 1, 1]} />
        <Lightformer intensity={2.5} color="#ff8a3d" position={[5, 0, 1]} rotation-y={-Math.PI / 2} scale={[8, 1, 1]} />
        <Lightformer intensity={1.3} color="#ffffff" position={[0, 0, -8]} scale={[18, 18, 1]} />
      </Environment>
      <OrbitControls enablePan={false} minDistance={3.5} maxDistance={10} />
    </Canvas>
  );
}
