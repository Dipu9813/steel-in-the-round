export const PRODUCT_KEYS = [
  "almirah1",
  "wardrobe",
  "wardrobe2",
  "bed",
  "chair",
  "chair1",
  "sofa",
  "sofa1",
  "desk",
  "desk1",
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
  size: string;
  material: string;
  finish: string | null;
  colors: string;
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
  "Sofas",
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
  // TODO: Replace placeholder product specifications with verified catalogue data.
  size: "Size: To be confirmed",
  material: "Material: To be confirmed",
  finish: options.finish ?? null,
  colors: "Colors: To be confirmed",
  priceNpr: options.priceNpr ?? null,
  availability: options.availability ?? null,
  images: options.images ?? [],
  modelUrl: options.modelUrl,
});

export const PRODUCTS: FurnitureProduct[] = [
  product("almirah1", "Steel Almirah / Daraz", CATEGORIES[0] ?? "Storage", "A decorative steel almirah with twin arched mirror doors, built-in clock, open cubbies and pull-out drawers — designed for everyday storage of clothes, documents and household essentials.", { images: ["/furniture/almirah1.jpg"], modelUrl: "/models/almirah1.glb" }),
  product("wardrobe", "Steel Wardrobe 3-Door", CATEGORIES[1] ?? "Storage", "A multi-door storage design with separate hanging and shelving spaces for an organized bedroom."),
  product("wardrobe2", "Steel Wardrobe 2-Door", CATEGORIES[1] ?? "Storage", "A multi-door storage design with separate hanging and shelving spaces for an organized bedroom.", { images: ["/furniture/daraz1.jpg"], modelUrl: "/models/daraz1.glb" }),
  product("bed", "Steel Bed", CATEGORIES[2] ?? "Bedroom", "A clean-lined steel bed design with a headboard and supporting frame, shown with a mattress for context."),
  product("chair", "Executive Office Chair", CATEGORIES[3] ?? "Seating", "A straightforward seating design for household and commercial spaces, with a metal frame and supported backrest."),
  product("chair1", "Steel Dining Chair", CATEGORIES[3] ?? "Seating", "A straightforward seating design for household and commercial spaces, with a metal frame and supported backrest.", { images: ["/furniture/chair1.jpg"], modelUrl: "/models/chair1.glb" }),
  product("sofa", "Steel Sofa", CATEGORIES[4] ?? "Sofas", "A practical sofa design with a durable steel frame and cushioned seating for homes, offices and waiting spaces."),
  product("sofa1", "Steel Sofa", CATEGORIES[4] ?? "Sofas", "A practical sofa design with a durable steel frame and cushioned seating for homes, offices and waiting spaces.", { images: ["/furniture/sofa1.jpg"], modelUrl: "/models/sofa1.glb" }),
  product("desk", "Office Table with Drawers", CATEGORIES[5] ?? "Office", "A practical workspace design with a generous tabletop and drawer storage for everyday office essentials."),
  product("desk1", "Steel Workshop Table", CATEGORIES[5] ?? "Office", "A practical workspace design with a generous tabletop and drawer storage for everyday office essentials.", { images: ["/furniture/table1.jpg"], modelUrl: "/models/table1.glb" }),
  product("bench", "Waiting Bench", CATEGORIES[3] ?? "Seating", "Connected seating on a shared metal frame, designed for reception and waiting spaces."),
  product("trunk", "Steel Storage Trunk", CATEGORIES[6] ?? "Storage", "A lidded storage design with carry handles and a front latch for keeping household essentials together."),
];

export function getProduct(key: string) {
  return PRODUCTS.find((p) => p.key === key) ?? PRODUCTS[0];
}
