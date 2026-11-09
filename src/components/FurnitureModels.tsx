import { RoundedBox, useGLTF } from "@react-three/drei";
import { getProduct, type ProductKey } from "@/lib/furniture";
import { useMemo, useEffect, useState } from "react";
import * as THREE from "three";

type Point = [number, number, number];
type Palette = Record<"body" | "steel" | "fabric" | "top" | "dark" | "red", string>;
function usePalette(): Palette {
  const [colors, setColors] = useState<Palette>({ body: "", steel: "", fabric: "", top: "", dark: "", red: "" });
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    setColors({ body: css.getPropertyValue("--model-body").trim(), steel: css.getPropertyValue("--model-steel").trim(), fabric: css.getPropertyValue("--model-fabric").trim(), top: css.getPropertyValue("--model-top").trim(), dark: css.getPropertyValue("--model-dark").trim(), red: css.getPropertyValue("--model-red").trim() });
  }, []);
  return colors;
}
function Part({ at, size, color, metal = 0.65, radius = 0.012 }: { at: Point; size: Point; color: string; metal?: number; radius?: number }) {
  return <RoundedBox position={at} args={size} radius={radius} smoothness={2} castShadow receiveShadow><meshStandardMaterial color={color} metalness={metal} roughness={metal ? 0.36 : 0.85} /></RoundedBox>;
}
function Rail({ from, to, color, radius = 0.026 }: { from: Point; to: Point; color: string; radius?: number }) {
  const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to), direction = b.clone().sub(a);
  const rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  return <mesh position={a.clone().add(b).multiplyScalar(0.5)} quaternion={rotation} castShadow><cylinderGeometry args={[radius, radius, direction.length(), 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.25} /></mesh>;
}
function Handle({ x, y, z, c }: { x: number; y: number; z: number; c: Palette }) {
  return <><Rail from={[x, y - 0.085, z]} to={[x, y + 0.085, z]} color={c.steel} radius={0.014} />{[-0.085, 0.085].map((dy) => <Rail key={dy} from={[x, y + dy, z - 0.035]} to={[x, y + dy, z]} color={c.steel} radius={0.012} />)}</>;
}
function Cabinet({ c, wardrobe = false, open }: { c: Palette; wardrobe?: boolean; open: boolean }) {
  const width = wardrobe ? 1.7 : 1.15, height = 2.15, depth = 0.62, count = wardrobe ? 3 : 2, doorWidth = (width - 0.08) / count;
  return <>
    <Part at={[0, 1.17, -depth / 2]} size={[width, height, 0.035]} color={c.body} />
    {[-1, 1].map((side) => <Part key={side} at={[side * (width / 2 - 0.018), 1.17, 0]} size={[0.035, height, depth]} color={c.body} />)}
    {[0.1, 2.24].map((y) => <Part key={y} at={[0, y, 0]} size={[width, 0.045, depth]} color={c.body} />)}
    {[0.6, 1.15, 1.7].map((y) => <Part key={y} at={[wardrobe ? width / 3 : 0, y, 0]} size={[wardrobe ? width / 3 - 0.04 : width - 0.08, 0.025, depth - 0.03]} color={c.top} />)}
    {wardrobe && <><Part at={[width / 6, 1.17, 0]} size={[0.025, height - 0.08, depth - 0.02]} color={c.body} /><Rail from={[-width / 2 + 0.1, 1.98, 0]} to={[width / 6 - 0.05, 1.98, 0]} color={c.steel} /></>}
    {Array.from({ length: count }, (_, i) => {
      const hingeX = -width / 2 + 0.04 + i * doorWidth;
      return <group key={i} position={[hingeX, 0, depth / 2 + 0.014]} rotation-y={open ? -1.25 : 0}>
        <Part at={[doorWidth / 2 - 0.005, 1.17, 0]} size={[doorWidth - 0.014, height - 0.055, 0.035]} color={c.body} />
        <Handle x={doorWidth - 0.075} y={1.16} z={0.065} c={c} />
        {[1.87, 1.94, 2.01].map((y) => <Part key={y} at={[doorWidth / 2, y, 0.022]} size={[doorWidth * 0.55, 0.008, 0.006]} color={c.dark} radius={0.002} />)}
      </group>;
    })}
    {[-1, 1].flatMap((x) => [-1, 1].map((z) => <Part key={`${x}${z}`} at={[x * (width / 2 - 0.09), 0.055, z * 0.22]} size={[0.065, 0.11, 0.065]} color={c.dark} />))}
  </>;
}
function Bed({ c }: { c: Palette }) {
  return <>
    {[-0.78, 0.78].map((x) => <Part key={x} at={[x, 0.4, 0]} size={[0.055, 0.13, 2.12]} color={c.body} />)}
    {[-1.04, 1.04].map((z) => <Part key={z} at={[0, 0.42, z]} size={[1.6, 0.13, 0.055]} color={c.body} />)}
    {[-0.78, 0.78].flatMap((x) => [-1.03, 1.03].map((z) => <Part key={`${x}${z}`} at={[x, z < 0 ? 0.65 : 0.27, z]} size={[0.06, z < 0 ? 1.3 : 0.54, 0.06]} color={c.body} />))}
    {[0.75, 1.02, 1.27].map((y) => <Part key={y} at={[0, y, -1.03]} size={[1.57, 0.065, 0.055]} color={c.body} />)}
    {[-0.5, 0, 0.5].map((x) => <Part key={x} at={[x, 1.01, -1.03]} size={[0.025, 0.52, 0.035]} color={c.body} />)}
    <Part at={[0, 0.59, 0]} size={[1.5, 0.25, 2]} color={c.fabric} metal={0} radius={0.065} />
    <Part at={[0, 0.724, 0.35]} size={[1.51, 0.035, 1.1]} color={c.top} metal={0} radius={0.016} />
    {[-0.38, 0.38].map((x) => <Part key={x} at={[x, 0.8, -0.68]} size={[0.62, 0.16, 0.4]} color={c.fabric} metal={0} radius={0.07} />)}
    <Part at={[0, 0.83, -0.38]} size={[0.4, 0.19, 0.27]} color={c.red} metal={0} radius={0.05} />
  </>;
}
function Chair({ c, offset = 0, bench = false }: { c: Palette; offset?: number; bench?: boolean }) {
  return <group position-x={offset}>
    <Part at={[0, 0.47, 0]} size={[0.48, 0.045, 0.48]} color={bench ? c.steel : c.body} radius={0.045} />
    <group position={[0, 0.82, -0.23]} rotation-x={-0.12}><Part at={[0, 0, 0]} size={[0.47, 0.43, 0.04]} color={bench ? c.steel : c.body} radius={0.04} />{Array.from({ length: 9 }, (_, i) => <Part key={i} at={[-0.17 + i * 0.042, 0, 0.025]} size={[0.009, 0.3, 0.004]} color={c.dark} radius={0.002} />)}</group>
    {!bench && [-1, 1].flatMap((x) => [-1, 1].map((z) => <Rail key={`${x}${z}`} from={[x * 0.255, 0.025, z * 0.245]} to={[x * 0.2, z < 0 ? 1.01 : 0.47, z * 0.19]} color={c.steel} />))}
  </group>;
}
function Sofa({ c }: { c: Palette }) {
  return <group scale={1.35}>
    <Part at={[0, 0.52, 0]} size={[1.8, 0.38, 0.72]} color={c.fabric} metal={0} radius={0.09} />
    <Part at={[0, 0.94, -0.27]} size={[1.82, 0.72, 0.2]} color={c.fabric} metal={0} radius={0.08} />
    {[-0.78, 0.78].map((x) => <Part key={x} at={[x, 0.66, 0]} size={[0.18, 0.62, 0.82]} color={c.fabric} metal={0} radius={0.07} />)}
    {[-0.48, 0.48].map((x) => <Part key={x} at={[x, 0.76, 0.03]} size={[0.78, 0.16, 0.6]} color={c.top} metal={0} radius={0.05} />)}
    {[-0.68, 0.68].map((x) => <group key={x}><Rail from={[x, 0.04, -0.25]} to={[x, 0.4, -0.25]} color={c.steel} radius={0.028} /><Rail from={[x, 0.04, 0.25]} to={[x, 0.4, 0.25]} color={c.steel} radius={0.028} /></group>)}
  </group>;
}
function Desk({ c }: { c: Palette }) {
  return <>
    <Part at={[0, 0.79, 0]} size={[1.65, 0.055, 0.78]} color={c.top} metal={0.1} />
    <Part at={[0, 0.49, -0.34]} size={[1.5, 0.42, 0.025]} color={c.body} />
    {[-0.73, 0.73].flatMap((x) => [-0.3, 0.3].map((z) => <Part key={`${x}${z}`} at={[x, 0.38, z]} size={[0.04, 0.76, 0.04]} color={c.steel} />))}
    <Part at={[0.49, 0.43, 0]} size={[0.51, 0.64, 0.65]} color={c.body} />
    {[0.24, 0.46, 0.65].map((y, i) => <group key={y}><Part at={[0.49, y, 0.338]} size={[0.47, i === 0 ? 0.24 : 0.16, 0.025]} color={c.body} /><Rail from={[0.39, y + 0.02, 0.375]} to={[0.59, y + 0.02, 0.375]} color={c.steel} radius={0.012} /></group>)}
  </>;
}
function GLTFModel({ url, modelScale = 1 }: { url: string; modelScale?: number }) {
  const { scene } = useGLTF(url);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const scale = (2.15 / size.y) * modelScale;

    clone.scale.setScalar(scale);

    const scaledBox = new THREE.Box3().setFromObject(clone);
    clone.position.x -= (scaledBox.min.x + scaledBox.max.x) / 2;
    clone.position.y -= scaledBox.min.y;
    clone.position.z -= (scaledBox.min.z + scaledBox.max.z) / 2;

    return clone;
  }, [modelScale, scene]);

  return <primitive object={model} />;
}

useGLTF.preload("/models/almirah1.glb");
useGLTF.preload("/models/daraz1.glb");


export function FurnitureModel({ kind, open = false }: { kind: ProductKey; open?: boolean }) {
  const prod = getProduct(kind);
  if (prod?.modelUrl) {
    return <GLTFModel url={prod.modelUrl} {...(prod.modelScale !== undefined ? { modelScale: prod.modelScale } : {})} />;
  }
  const c = usePalette();
  if (!c.body) return null;
  if (kind === "almirah1") return <GLTFModel url="/models/almirah1.glb" />;
  if (kind === "wardrobe") return <Cabinet c={c} wardrobe open={open} />;
  if (kind === "bed") return <Bed c={c} />;
  if (kind === "chair") return <group scale={1.7}><Chair c={c} /></group>;
  if (kind === "sofa") return <Sofa c={c} />;
  if (kind === "desk") return <group scale={1.35}><Desk c={c} /></group>;
  if (kind === "bench") return <group scale={1.3}>{[-0.6, 0, 0.6].map((x) => <Chair key={x} c={c} offset={x} bench />)}<Part at={[0, 0.4, 0]} size={[1.85, 0.065, 0.065]} color={c.body} />{[-0.65, 0.65].map((x) => <group key={x}><Rail from={[x, 0.05, 0]} to={[x, 0.4, 0]} color={c.steel} radius={0.04} /><Part at={[x, 0.045, 0]} size={[0.08, 0.06, 0.64]} color={c.steel} /></group>)}</group>;
  return <group scale={1.5}><Part at={[0, 0.33, 0]} size={[1.2, 0.6, 0.64]} color={c.body} /><group position={[0, 0.64, -0.32]} rotation-x={open ? -1 : 0}><Part at={[0, 0, 0.32]} size={[1.23, 0.055, 0.67]} color={c.body} /></group><Part at={[0, 0.52, 0.344]} size={[0.075, 0.14, 0.02]} color={c.steel} />{[-1, 1].map((side) => <group key={side}><Rail from={[side * 0.63, 0.38, -0.1]} to={[side * 0.63, 0.38, 0.1]} color={c.steel} radius={0.018} /><Part at={[side * 0.58, 0.33, 0.322]} size={[0.035, 0.53, 0.012]} color={c.steel} /></group>)}</group>;
}