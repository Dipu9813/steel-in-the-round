# 3D Model Integration Workflow

> **Purpose:** This document is the complete, authoritative guide for adding `.glb` 3D models to the *steel-in-the-round* frontend. It is written so that **any AI coding assistant** (ChatGPT, Claude, Gemini, GitHub Copilot, Lovable, Cursor, etc.) can read this file, understand the full pipeline, and implement new 3D models correctly without additional context.
>
> 💡 **Quick Guide:** For a concise walkthrough on adding products and images across all categories, see [HOW-TO-ADD-PRODUCTS.md](file:///c:/Users/dipru/OneDrive/Documents/codes/code/steel-in-the-round/HOW-TO-ADD-PRODUCTS.md).

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tech Stack & Key Dependencies](#2-tech-stack--key-dependencies)
3. [File Map — Where Everything Lives](#3-file-map--where-everything-lives)
4. [Data Flow Diagram](#4-data-flow-diagram)
5. [Step-by-Step: Adding a New GLB Model](#5-step-by-step-adding-a-new-glb-model)
6. [Existing Reference: How `almirah1.glb` Was Implemented](#6-existing-reference-how-almirah1glb-was-implemented)
7. [CSS Tokens for 3D Materials](#7-css-tokens-for-3d-materials)
8. [Component API Reference](#8-component-api-reference)
9. [Conventions & Rules](#9-conventions--rules)
10. [Troubleshooting](#10-troubleshooting)
11. [Complete Example: Adding a "Bookshelf" Model](#11-complete-example-adding-a-bookshelf-model)

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        User's Browser                        │
│                                                              │
│  ┌─────────────┐     ┌──────────────┐     ┌──────────────┐  │
│  │  index.tsx   │────▶│ FurnitureSite│────▶│ SteelViewer  │  │
│  │  (Route)     │     │ (Showroom /  │     │ (Canvas /    │  │
│  │              │     │  Catalogue)  │     │  Lighting)   │  │
│  └─────────────┘     └──────┬───────┘     └──────┬───────┘  │
│                             │                     │          │
│                     ┌───────▼─────────────────────▼──────┐   │
│                     │      FurnitureModels.tsx            │   │
│                     │  (ProductKey → 3D component)       │   │
│                     │  GLB loaded via useGLTF()          │   │
│                     └───────────────┬────────────────────┘   │
│                                     │                        │
│                           ┌─────────▼──────────┐            │
│                           │  furniture.ts       │            │
│                           │  (product registry) │            │
│                           └────────────────────┘            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  public/models/          ← GLB files served here     │   │
│  │  src/styles.css          ← CSS tokens for materials  │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

The system has **5 layers** that must be updated when adding a new 3D model:

| Layer | File | What to do |
|-------|------|------------|
| **Asset** | `public/models/<name>.glb` | Drop the GLB file here |
| **Registry** | `src/lib/furniture.ts` | Add a new `ProductKey` and product entry |
| **3D Component** | `src/components/FurnitureModels.tsx` | Create a loader component, wire it into `FurnitureModel` |
| **Viewer** | `src/components/SteelViewer.tsx` | Usually no changes needed (generic) |
| **Page** | `src/routes/index.tsx` (or others) | Use `<Showroom>` or `<FurniturePreview>` to display it |

---

## 2. Tech Stack & Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `three` | `^0.186.1` | Core 3D engine |
| `@react-three/fiber` | `^9` | React renderer for Three.js |
| `@react-three/drei` | `^10` | Helpers: `useGLTF`, `OrbitControls`, `Environment`, `ContactShadows`, etc. |
| `@types/three` | `^0.186.0` | TypeScript types for Three.js |
| `react` | `^19.2.0` | UI framework |
| `@tanstack/react-router` | `1.170.41` | File-based routing |
| `vite` | `8.1.5` | Dev server and bundler |
| `tailwindcss` | `^4.2.1` | Utility CSS (used alongside vanilla CSS) |

> **GLB format is mandatory.** The loader uses `useGLTF` from drei which expects `.glb` or `.gltf` files. If you have `.fbx`, `.obj`, or `.blend` files, convert them to `.glb` first using Blender or an online converter.

---

## 3. File Map — Where Everything Lives

```
steel-in-the-round/
├── public/
│   └── models/
│       └── almirah1.glb              ← GLB model assets (served at /models/*)
├── src/
│   ├── lib/
│   │   └── furniture.ts              ← ProductKey type + PRODUCTS array
│   ├── components/
│   │   ├── FurnitureModels.tsx        ← 3D model components (GLB loaders + procedural)
│   │   ├── SteelViewer.tsx            ← R3F Canvas, camera, lights, orbit controls
│   │   └── FurnitureSite.tsx          ← Showroom, Catalogue, FurniturePreview wrappers
│   ├── routes/
│   │   └── index.tsx                  ← Homepage (hero section shows 3D model)
│   └── styles.css                     ← CSS custom properties for 3D material colors
└── package.json
```

---

## 4. Data Flow Diagram

```
User lands on page
        │
        ▼
  index.tsx renders <Showroom hero initial="almirah" />
        │
        ▼
  FurnitureSite.tsx  →  <FurniturePreview kind="almirah" />
        │
        ▼
  Checks WebGL support → if OK, lazy-loads <SteelViewer kind="almirah" />
        │
        ▼
  SteelViewer.tsx creates:
    - R3F <Canvas> with shadows, camera, lighting
    - Reads CSS tokens (--model-white, --model-dark) for background/shadow colors
    - Renders <FurnitureModel kind="almirah" />
    - Adds OrbitControls (auto-rotate, zoom, pan-lock)
        │
        ▼
  FurnitureModels.tsx:
    - FurnitureModel checks `kind` prop
    - if kind === "almirah" → renders <CustomAlmirah />
    - CustomAlmirah uses useGLTF("/models/almirah1.glb")
    - Clones scene, enables shadows on all meshes
    - Auto-scales to 2.15 units height, centers on origin
    - Returns <primitive object={model} />
```

---

## 5. Step-by-Step: Adding a New GLB Model

### Step 1: Place the GLB file

Copy your `.glb` file into the public models directory:

```
public/models/<your-model-name>.glb
```

> The file will be served at the URL `/models/<your-model-name>.glb` by Vite's static file server.

### Step 2: Register a new ProductKey

Open `src/lib/furniture.ts` and:

**2a.** Add your key to the `ProductKey` union type:

```typescript
// BEFORE
export type ProductKey = "almirah" | "wardrobe" | "bed" | "chair" | "desk" | "bench" | "trunk";

// AFTER (example: adding "bookshelf")
export type ProductKey = "almirah" | "wardrobe" | "bed" | "chair" | "desk" | "bench" | "trunk" | "bookshelf";
```

**2b.** Add a product entry to the `PRODUCTS` array:

```typescript
export const PRODUCTS: FurnitureProduct[] = [
  // ... existing products ...
  product("bookshelf", "Steel Bookshelf", CATEGORIES[5] ?? "Storage", "A multi-tier open bookshelf for organizing books and decor items."),
];
```

### Step 3: Create the GLB loader component

Open `src/components/FurnitureModels.tsx` and:

**3a.** Add a new component that loads your GLB file:

```tsx
function CustomBookshelf() {
  const { scene } = useGLTF("/models/bookshelf.glb");

  const model = useMemo(() => {
    const clone = scene.clone(true);

    // Enable shadows on all meshes
    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    // Auto-scale: normalize height to 2.15 units (matches the viewer's camera framing)
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const scale = 2.15 / size.y;
    clone.scale.setScalar(scale);

    // Center the model on the origin, sitting on the ground plane (y=0)
    const scaledBox = new THREE.Box3().setFromObject(clone);
    clone.position.x -= (scaledBox.min.x + scaledBox.max.x) / 2;
    clone.position.y -= scaledBox.min.y;
    clone.position.z -= (scaledBox.min.z + scaledBox.max.z) / 2;

    return clone;
  }, [scene]);

  return <primitive object={model} />;
}

// Preload for faster first render
useGLTF.preload("/models/bookshelf.glb");
```

**Key details about this pattern:**
- `scene.clone(true)` — deep clone so multiple instances don't share state
- `traverse` — walks the scene graph to enable `castShadow` and `receiveShadow` on every mesh
- Height normalization — scales the model so it is exactly `2.15` Three.js units tall (matching the camera setup in `SteelViewer.tsx`)
- Centering — repositions the model so it sits on the ground plane (y=0) and is centered on x/z
- `useGLTF.preload(...)` — starts downloading the GLB immediately, before the component mounts

**3b.** Wire it into the `FurnitureModel` dispatcher:

```tsx
export function FurnitureModel({ kind, open = false }: { kind: ProductKey; open?: boolean }) {
  const c = usePalette();
  if (!c.body) return null;
  if (kind === "almirah") return <CustomAlmirah />;
  if (kind === "bookshelf") return <CustomBookshelf />;  // ← ADD THIS LINE
  if (kind === "wardrobe") return <Cabinet c={c} wardrobe open={open} />;
  // ... rest unchanged ...
}
```

### Step 4: Display it on a page

You have several options:

**Option A — Hero section (full-width, auto-rotating, no controls):**
```tsx
<Showroom hero initial="bookshelf" />
```

**Option B — Product viewer (with zoom/rotate/reset controls + product details sidebar):**
```tsx
<Showroom initial="bookshelf" />
```

**Option C — Just the 3D canvas (no UI chrome):**
```tsx
<FurniturePreview kind="bookshelf" autoRotate={true} />
```

**Option D — In the catalogue (automatic):**
If you added the product to the `PRODUCTS` array in Step 2, it will automatically appear in the catalogue grid on the homepage. Clicking "View in Showroom" will open it in a dialog with the full 3D viewer.

### Step 5: (Optional) Enable door open/close interaction

If your model has doors or a lid, add it to the interactive list in `FurnitureSite.tsx`:

```tsx
// In the Showroom component, find this line:
{["almirah", "wardrobe", "trunk"].includes(key) && <Button ...>

// Add your key:
{["almirah", "wardrobe", "trunk", "bookshelf"].includes(key) && <Button ...>
```

> Note: The `open` prop is passed through to `FurnitureModel`. Your custom component must handle the `open` prop to animate doors. For GLB models, you would need to identify door meshes in the scene graph and apply rotation transforms.

---

## 6. Existing Reference: How `almirah1.glb` Was Implemented

This is the actual implementation that is live in the codebase — use it as your template:

### 6a. Asset location
```
public/models/almirah1.glb    (8.2 MB)
```

### 6b. Product registry (`src/lib/furniture.ts`)
```typescript
export type ProductKey = "almirah" | "wardrobe" | "bed" | "chair" | "desk" | "bench" | "trunk";

export const PRODUCTS: FurnitureProduct[] = [
  product("almirah", "Steel Almirah / Daraz", CATEGORIES[0] ?? "Storage",
    "Everyday storage for clothes, documents and household essentials. Explore a two-door design with interior shelving."),
  // ...
];
```

### 6c. 3D component (`src/components/FurnitureModels.tsx`, lines 75–105)
```tsx
function CustomAlmirah() {
  const { scene } = useGLTF("/models/almirah1.glb");

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
    const scale = 2.15 / size.y;

    clone.scale.setScalar(scale);

    const scaledBox = new THREE.Box3().setFromObject(clone);
    clone.position.x -= (scaledBox.min.x + scaledBox.max.x) / 2;
    clone.position.y -= scaledBox.min.y;
    clone.position.z -= (scaledBox.min.z + scaledBox.max.z) / 2;

    return clone;
  }, [scene]);

  return <primitive object={model} />;
}

useGLTF.preload("/models/almirah1.glb");
```

### 6d. Dispatcher wiring (`FurnitureModels.tsx`, line 110)
```tsx
if (kind === "almirah") return <CustomAlmirah />;
```

### 6e. Homepage display (`src/routes/index.tsx`, line 11)
```tsx
<div className="hero-model"><Showroom hero initial="almirah" /></div>
```

---

## 7. CSS Tokens for 3D Materials

The 3D viewer reads material colors from CSS custom properties on `:root`. This keeps the 3D scene consistent with the brand theme.

### Viewer-level tokens (used by `SteelViewer.tsx`)
| Token | Default | Used for |
|-------|---------|----------|
| `--model-white` | `#ffffff` | Canvas background + environment lighting color |
| `--model-dark` | `#30343a` | Contact shadow color |

### Model-level tokens (used by procedural models in `FurnitureModels.tsx`)
| Token | Default | Used for |
|-------|---------|----------|
| `--model-body` | `#526777` | Main body panels |
| `--model-steel` | `#b9bdc1` | Metal rails, handles, legs |
| `--model-fabric` | `#eeeeeb` | Soft surfaces (mattress, cushion) |
| `--model-top` | `#cdd0d1` | Table tops, shelves |
| `--model-dark` | `#30343a` | Dark accent details |
| `--model-red` | `#ac3642` | Accent color (pillows, etc.) |

> **For GLB models:** These tokens are used by the procedural (code-generated) furniture only. GLB models use their own embedded materials from the 3D authoring tool. If you want to override GLB materials at runtime, you would need to traverse the scene and replace materials manually.

---

## 8. Component API Reference

### `<Showroom>`
```tsx
<Showroom
  hero={boolean}           // true = simplified hero layout; false = full product viewer with sidebar
  initial={ProductKey}     // which product to show first (default: "almirah")
  onEnquire={() => void}   // callback when user clicks "Enquire"
/>
```

### `<FurniturePreview>`
```tsx
<FurniturePreview
  kind={ProductKey}        // which product to render
  autoRotate={boolean}     // orbit auto-rotation (default: true)
  open={boolean}           // doors open state (default: false)
  viewerRef={Ref}          // ref to ViewerHandle for zoom/reset
/>
```

### `<FurnitureModel>` (used inside the R3F Canvas)
```tsx
<FurnitureModel
  kind={ProductKey}        // which product to render
  open={boolean}           // doors open state (default: false)
/>
```

### `<SteelViewer>` (the R3F Canvas wrapper)
```tsx
<SteelViewer
  ref={ViewerHandle}       // exposes reset() and zoom(direction)
  kind={ProductKey}        // which product
  autoRotate={boolean}     // auto-rotation (default: true)
  open={boolean}           // door state (default: false)
/>
```

### `ViewerHandle` (imperative API)
```typescript
interface ViewerHandle {
  reset(): void;           // reset camera to default position
  zoom(direction: number): void;  // direction > 0 = zoom in, < 0 = zoom out
}
```

---

## 9. Conventions & Rules

These rules come from the project's `AGENTS.md` and must be followed:

1. **GLB files go in `public/models/`** — never in `src/` (they are static assets)
2. **Furniture catalogue data lives in `src/lib/furniture.ts`** — this is the single source of truth shared by catalogue, enquiries, and 3D selection
3. **Do not modify the existing SteelViewer module** — it is generic; camera, lights, and controls are already configured for all products
4. **Material colors come from CSS tokens** — read them via `getComputedStyle()` so the showroom follows the brand theme
5. **Use `scene.clone(true)`** — always deep-clone the GLTF scene to avoid shared state issues
6. **Normalize to 2.15 units height** — this is the standard height that fits the camera framing
7. **Center on origin, floor at y=0** — the contact shadow plane is at `y = -0.005`
8. **Preload GLB files** — call `useGLTF.preload("/models/filename.glb")` after the component definition
9. **Label 3D designs as illustrative** — the UI must include text like "Illustrative furniture design" (already handled by Showroom)
10. **Keep the homepage on one page with hash navigation** — no separate routes for individual products

---

## 10. Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Model doesn't appear | `ProductKey` not added to the union type | Add it to `furniture.ts` line 1 |
| Model appears but is tiny/huge | Height normalization not applied | Use the `2.15 / size.y` scaling pattern |
| Model floats above ground | Bottom of model not at y=0 | Subtract `scaledBox.min.y` from position |
| Model has no shadows | `castShadow`/`receiveShadow` not set | Add the `traverse` loop |
| White screen / crash | WebGL not available | The `ViewerBoundary` error boundary handles this — shows a fallback image instead |
| "Loading furniture…" forever | GLB path wrong or file missing | Verify the file exists in `public/models/` and the path in `useGLTF()` matches |
| TypeScript error on kind | Key not in `ProductKey` union | Update the type in `furniture.ts` |
| Model not in catalogue | Product not in `PRODUCTS` array | Add it via the `product()` helper function |
| 404 on the GLB file | File not in `public/models/` | Move it there; Vite serves `public/` as static root |

---

## 11. Complete Example: Adding a "Bookshelf" Model

Here is the exact set of changes, file by file, to add a new `bookshelf.glb` model:

### File 1: Drop the asset
```
public/models/bookshelf.glb    ← copy your file here
```

### File 2: `src/lib/furniture.ts`
```diff
- export type ProductKey = "almirah" | "wardrobe" | "bed" | "chair" | "desk" | "bench" | "trunk";
+ export type ProductKey = "almirah" | "wardrobe" | "bed" | "chair" | "desk" | "bench" | "trunk" | "bookshelf";

  export const PRODUCTS: FurnitureProduct[] = [
    product("almirah", "Steel Almirah / Daraz", CATEGORIES[0] ?? "Storage", "..."),
    // ... existing products ...
    product("trunk", "Steel Storage Trunk", CATEGORIES[5] ?? "Storage", "..."),
+   product("bookshelf", "Steel Bookshelf", CATEGORIES[5] ?? "Storage", "A multi-tier open bookshelf for organizing books and decorative items."),
  ];
```

### File 3: `src/components/FurnitureModels.tsx`
```diff
  // After the CustomAlmirah component, add:
+ function CustomBookshelf() {
+   const { scene } = useGLTF("/models/bookshelf.glb");
+   const model = useMemo(() => {
+     const clone = scene.clone(true);
+     clone.traverse((object) => {
+       if (object instanceof THREE.Mesh) {
+         object.castShadow = true;
+         object.receiveShadow = true;
+       }
+     });
+     const box = new THREE.Box3().setFromObject(clone);
+     const size = box.getSize(new THREE.Vector3());
+     const scale = 2.15 / size.y;
+     clone.scale.setScalar(scale);
+     const scaledBox = new THREE.Box3().setFromObject(clone);
+     clone.position.x -= (scaledBox.min.x + scaledBox.max.x) / 2;
+     clone.position.y -= scaledBox.min.y;
+     clone.position.z -= (scaledBox.min.z + scaledBox.max.z) / 2;
+     return clone;
+   }, [scene]);
+   return <primitive object={model} />;
+ }
+ useGLTF.preload("/models/bookshelf.glb");

  // In the FurnitureModel dispatcher, add a new case:
  export function FurnitureModel({ kind, open = false }: { kind: ProductKey; open?: boolean }) {
    const c = usePalette();
    if (!c.body) return null;
    if (kind === "almirah") return <CustomAlmirah />;
+   if (kind === "bookshelf") return <CustomBookshelf />;
    if (kind === "wardrobe") return <Cabinet c={c} wardrobe open={open} />;
    // ... rest unchanged ...
  }
```

### File 4: `src/routes/index.tsx` (if you want it in the hero)
```diff
- <div className="hero-model"><Showroom hero initial="almirah" /></div>
+ <div className="hero-model"><Showroom hero initial="bookshelf" /></div>
```

### Result
- The bookshelf appears in the **hero section** on page load
- It **auto-appears in the catalogue** grid (because it's in the `PRODUCTS` array)
- Users can click "View in Showroom" to see it in a **dialog with orbit controls**
- It has **proper shadows**, is **correctly scaled**, and is **centered on the ground plane**

---

## Summary Checklist

When adding a new GLB model, verify each item:

- [ ] GLB file placed in `public/models/`
- [ ] `ProductKey` union type updated in `src/lib/furniture.ts`
- [ ] Product entry added to `PRODUCTS` array in `src/lib/furniture.ts`
- [ ] Loader component created in `src/components/FurnitureModels.tsx`
- [ ] `useGLTF.preload()` called for the new GLB path
- [ ] New case added to `FurnitureModel` dispatcher function
- [ ] (Optional) Hero section updated in `src/routes/index.tsx`
- [ ] (Optional) Door interaction list updated in `FurnitureSite.tsx`
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Model renders correctly at proper scale with shadows
