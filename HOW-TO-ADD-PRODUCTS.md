# Guide: Adding Products & 3D Models to the Frontend

This step-by-step guide explains how to add new 3D models and catalogue images for any furniture category (Almirahs, Beds, Desks, Chairs, Wardrobes, etc.) so that they display on the website.

---

## Quick Overview

Adding a new product requires only **2 simple steps**:
1. Drop your files into `public/` (the `.glb` model and `.jpg`/`.png` image).
2. Register the product in [`src/lib/furniture.ts`](file:///c:/Users/dipru/OneDrive/Documents/codes/code/steel-in-the-round/src/lib/furniture.ts).

Everything else—the 3D showroom viewer, catalogue card, category filter, and quote request form—is **100% automated**.

---

## Step 1: Add Asset Files

### A. 3D Model (`.glb`)
Place your 3D model file in:
```
public/models/<model-name>.glb
```
> **Tip:** The model must be in `.glb` or `.gltf` format. If your file is `.obj`, `.fbx`, or `.blend`, export it as `.glb` in Blender before adding.

### B. Product Photo / Thumbnail (`.jpg` or `.png`)
Place the product image in:
```
public/furniture/<image-name>.jpg
```
> This image is shown in the catalogue grid and serves as an automatic fallback if the user's device doesn't support WebGL.

---

## Step 2: Register in `src/lib/furniture.ts`

Open [`src/lib/furniture.ts`](file:///c:/Users/dipru/OneDrive/Documents/codes/code/steel-in-the-round/src/lib/furniture.ts).

### 1. Add your key to `PRODUCT_KEYS`
Add a unique key to the `PRODUCT_KEYS` array:

```typescript
export const PRODUCT_KEYS = [
  "almirah",
  "almirah-1",
  "wardrobe",
  "bed",
  "chair",
  "desk",
  "bench",
  "trunk",
  "executive-desk", // <-- Your new product key
] as const;
```

### 2. Add the product entry to `PRODUCTS`
Add your product to the `PRODUCTS` array using the `product()` helper:

```typescript
export const PRODUCTS: FurnitureProduct[] = [
  // ... existing products ...

  product(
    "executive-desk",                         // 1. Unique Key (matches PRODUCT_KEYS)
    "Executive Steel Desk",                   // 2. Display Name
    CATEGORIES[4] ?? "Office Tables & Desks", // 3. Category (see list below)
    "Heavy-duty steel desk with drawers...",  // 4. Description
    {
      images: ["/furniture/executive-desk.jpg"], // 5. Photo path
      modelUrl: "/models/executive-desk.glb",   // 6. 3D Model path
    }
  ),
];
```

---

## Available Categories

Select one of the standard categories from `CATEGORIES`:

| Index | Category Name | Best suited for |
|-------|---------------|-----------------|
| `CATEGORIES[0]` | `"Steel Almirahs & Daraz"` | Steel almirahs, cupboards, daraz units |
| `CATEGORIES[1]` | `"Wardrobes & Cupboards"` | Multi-door wardrobes, tall cabinets |
| `CATEGORIES[2]` | `"Steel Beds"` | Steel bed frames, bunk beds |
| `CATEGORIES[3]` | `"Chairs & Waiting Benches"`| Office chairs, public seating benches |
| `CATEGORIES[4]` | `"Office Tables & Desks"` | Computer tables, manager desks |
| `CATEGORIES[5]` | `"Storage Cabinets & Trunks"`| Metal trunks, file cabinets, lockers |
| `CATEGORIES[6]` | `"Household Furniture"` | Dining tables, shelves, general home |
| `CATEGORIES[7]` | `"Other available furniture"` | Custom metal fabrications, accessories |

---

## Step 3 (Optional): Preload the 3D Model

To ensure fast 3D loading without any delay when the user clicks "View in Showroom", add a preload line in [`src/components/FurnitureModels.tsx`](file:///c:/Users/dipru/OneDrive/Documents/codes/code/steel-in-the-round/src/components/FurnitureModels.tsx):

```typescript
useGLTF.preload("/models/almirah1.glb");
useGLTF.preload("/models/daraz1.glb");
useGLTF.preload("/models/executive-desk.glb"); // <-- Add your new model here
```

---

## Where Your Product Will Appear

Once added, the frontend automatically handles everything:

1. **Catalogue Grid** (`#catalogue`):
   - Displays the product card with your thumbnail image and title.
   - Shows up under its specific category tab and under **"All furniture"**.
2. **Interactive 3D Showroom**:
   - Clicking **"View in Showroom"** opens the modal dialog.
   - Renders the `.glb` model with 360° rotation, camera zoom in/out, and reset controls.
   - The model is automatically centered and scaled to fit the camera view.
3. **Quote Request Form** (`#contact`):
   - The item is automatically added as a selectable checkbox with quantity controls in Step 1 of the quote request form.
   - Submissions pass strict backend validation without any schema changes needed.
4. **Hero Section (Optional)**:
   - If you want this product featured as the main rotating 3D model at the top of the homepage, open [`src/routes/index.tsx`](file:///c:/Users/dipru/OneDrive/Documents/codes/code/steel-in-the-round/src/routes/index.tsx) and change:
     ```tsx
     <Showroom hero initial="executive-desk" />
     ```

---

## Examples for Common Categories

### Example A: Adding a Second Almirah / Daraz
```typescript
// 1. In PRODUCT_KEYS:
"daraz-deluxe",

// 2. In PRODUCTS:
product(
  "daraz-deluxe",
  "Deluxe Double-Door Steel Daraz",
  CATEGORIES[0] ?? "Steel Almirahs & Daraz",
  "Features internal security locker, clothes hanger rod, and premium handles.",
  {
    images: ["/furniture/daraz-deluxe.jpg"],
    modelUrl: "/models/daraz1.glb",
  }
),
```

### Example B: Adding a Bed
```typescript
// 1. In PRODUCT_KEYS:
"bed-queen",

// 2. In PRODUCTS:
product(
  "bed-queen",
  "Queen Size Steel Bed Frame",
  CATEGORIES[2] ?? "Steel Beds",
  "Constructed with reinforced steel tubes and engineered for long-term durability.",
  {
    images: ["/furniture/bed-queen.jpg"],
    modelUrl: "/models/bed-queen.glb",
  }
),
```

---

## Troubleshooting

- **Model is not showing / black screen**:
  - Verify that the model is placed in `public/models/` and starts with a leading slash in `modelUrl: "/models/your-model.glb"`.
  - Check the browser console (F12) for 404 errors.
- **Image is not showing**:
  - Check that the image file exists in `public/furniture/` and matches the path in `images: ["/furniture/your-image.jpg"]`.
- **TypeScript error `TS2322: Type '"..."' is not assignable to type 'ProductKey'`**:
  - Ensure the key in `product("my-key", ...)` is also listed in `PRODUCT_KEYS = [...]`.
