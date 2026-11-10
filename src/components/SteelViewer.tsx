import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ComponentRef } from "react";
import { FurnitureModel } from "@/components/FurnitureModels";
import type { ProductKey } from "@/lib/furniture";
export type { ProductKey } from "@/lib/furniture";
export interface ViewerHandle { reset: () => void; zoom: (direction: number) => void }

const DEFAULT_CAMERA_POSITION: [number, number, number] = [3.6, 2.8, 5.3];
const WIDE_CAMERA_POSITION: [number, number, number] = [4.5, 3.25, 6.625];

const SteelViewer = forwardRef<ViewerHandle, { kind: ProductKey; autoRotate?: boolean; open?: boolean; zoomedOut?: boolean }>(function SteelViewer({ kind, autoRotate = true, open = false, zoomedOut = false }, ref) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const [palette, setPalette] = useState({ white: "", shadow: "" });
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    setPalette({ white: css.getPropertyValue("--model-white").trim(), shadow: css.getPropertyValue("--model-dark").trim() });
  }, []);
  useImperativeHandle(ref, () => ({
    reset() { controls.current?.reset(); },
    zoom(direction) {
      const orbit = controls.current;
      if (!orbit) return;
      const offset = orbit.object.position.clone().sub(orbit.target);
      const next = Math.max(3, Math.min(12, offset.length() * (direction > 0 ? 0.82 : 1.22)));
      orbit.object.position.copy(orbit.target).add(offset.setLength(next));
      orbit.update();
    },
  }), []);
  if (!palette.white) return null;
  const cameraPosition = zoomedOut ? WIDE_CAMERA_POSITION : DEFAULT_CAMERA_POSITION;
  return <Canvas shadows dpr={[1, 1.25]} camera={{ position: cameraPosition, fov: 33 }} gl={{ powerPreference: "high-performance", antialias: true }}>
    <color attach="background" args={[palette.white]} />
    <ambientLight intensity={0.7} />
    <directionalLight position={[3, 6, 4]} intensity={2} castShadow shadow-mapSize-width={512} shadow-mapSize-height={512} />
    <FurnitureModel kind={kind} open={open} />
    <ContactShadows position={[0, -0.005, 0]} color={palette.shadow} opacity={0.35} blur={2.7} scale={8} far={3} resolution={128} />
    <Environment resolution={64}>
      <Lightformer intensity={2.4} color={palette.white} position={[0, 6, 2]} scale={[10, 4, 1]} />
      <Lightformer intensity={1.5} color={palette.white} position={[-5, 2, 1]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
      <Lightformer intensity={1.8} color={palette.white} position={[4, 3, -3]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
    </Environment>
    <OrbitControls ref={controls} target={[0, 1, 0]} enablePan={false} minDistance={3} maxDistance={12} minPolarAngle={0.25} maxPolarAngle={Math.PI / 2.05} autoRotate={autoRotate} autoRotateSpeed={0.55} />
  </Canvas>;
});
export default SteelViewer;
