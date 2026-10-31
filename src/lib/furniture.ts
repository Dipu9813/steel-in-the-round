export const PRODUCT_KEYS = [
  "almirah",
  "almirah-1",
  "wardrobe",
  "bed",
  "chair",
  "desk",
  "bench",
  "trunk",
] as const;

export type ProductKey = (typeof PRODUCT_KEYS)[number];

export interface FurnitureProduct {
  key: ProductKey;
  name: string;
  category: string;
  description: string;
  dimensions: string | null;
  finish: string | null;
  priceNpr: number | null;
  availability: string | null;
  images: string[];
  modelUrl?: string | undefined;
}

export const CATEGORIES = [
  "Steel Almirahs & Daraz",
  "Wardrobes & Cupboards",
  "Steel Beds",
  "Chairs & Waiting Benches",
  "Office Tables & Desks",
  "Storage Cabinets & Trunks",
  "Household Furniture",
  "Other available furniture",
];

interface ProductOptions {
  dimensions?: string | null;
  finish?: string | null;
  priceNpr?: number | null;
  availability?: string | null;
  images?: string[];
  modelUrl?: string | undefined;
}

const product = (
  key: ProductKey,
  name: string,
  category: string,
  description: string,
  options: ProductOptions = {}
): FurnitureProduct => ({
  key,
  name,
  category,
  description,
  dimensions: options.dimensions ?? null,
  finish: options.finish ?? null,
  priceNpr: options.priceNpr ?? null,
  availability: options.availability ?? null,
  images: options.images ?? (options.modelUrl ? [] : []),
  modelUrl: options.modelUrl,
});

export const PRODUCTS: FurnitureProduct[] = [
  product("almirah", "Steel Almirah / Daraz", CATEGORIES[0] ?? "Storage", "A decorative steel almirah with twin arched mirror doors, built-in clock, open cubbies and pull-out drawers — designed for everyday storage of clothes, documents and household essentials.", { images: ["/furniture/almirah1.jpg"], modelUrl: "/models/almirah1.glb" }),
  product("almirah-1", "Steel Daraz / Double Door Almirah", CATEGORIES[0] ?? "Storage", "A classic double-door steel almirah with security locker and organized shelving for everyday storage.", { images: ["/furniture/almirah1.jpg"], modelUrl: "/models/daraz1.glb" }),
  product("wardrobe", "Steel Wardrobe", CATEGORIES[1] ?? "Storage", "A multi-door storage design with separate hanging and shelving spaces for an organized bedroom."),
  product("bed", "Steel Bed", CATEGORIES[2] ?? "Bedroom", "A clean-lined steel bed design with a headboard and supporting frame, shown with a mattress for context."),
  product("chair", "Steel Chair", CATEGORIES[3] ?? "Seating", "A straightforward seating design for household and commercial spaces, with a metal frame and supported backrest."),
  product("desk", "Office Table", CATEGORIES[4] ?? "Office", "A practical workspace design with a generous tabletop and drawer storage for everyday office essentials."),
  product("bench", "Waiting Bench", CATEGORIES[3] ?? "Seating", "Connected seating on a shared metal frame, designed for reception and waiting spaces."),
  product("trunk", "Steel Storage Trunk", CATEGORIES[5] ?? "Storage", "A lidded storage design with carry handles and a front latch for keeping household essentials together."),
];

export function getProduct(key: string) { return PRODUCTS.find((p) => p.key === key) ?? PRODUCTS[0]; }