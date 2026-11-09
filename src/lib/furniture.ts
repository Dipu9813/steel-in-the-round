export const PRODUCT_KEYS = [
  "almirah1",
  "almirah2",
  "wardrobe",
  "wardrobe2",
  "bed",
  "bed1",
  "matress1",
  "chair",
  "chair1",
  "chair2",
  "waitingchair1",
  "sofa",
  "sofa1",
  "sofa2",
  "desk",
  "desk1",
  "desk2",
  "bench",
  "trunk",
  "locker1",
  "rack1",
  "safe1",
  "wardrobe1"
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
  modelScale?: number | undefined;
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
  modelScale?: number | undefined;
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
  modelScale: options.modelScale,
});

export const PRODUCTS: FurnitureProduct[] = [
  product("almirah1", "3-Piece Almirah", CATEGORIES[0] ?? "Storage", "A decorative steel almirah with twin arched mirror doors, built-in clock, open cubbies and pull-out drawers — designed for everyday storage of clothes, documents and household essentials.", { images: ["/furniture/almirah1.jpg"], modelUrl: "/models/almirah1.glb" }),
  product("almirah2", "Single Door Almirah", CATEGORIES[0] ?? "Storage", "A decorative steel almirah with twin arched mirror doors, built-in clock, open cubbies and pull-out drawers — designed for everyday storage of clothes, documents and household essentials.", { images: ["/furniture/almirah2.jpg"], modelUrl: "/models/almirah2.glb" }),
  product("wardrobe2", "One Locker Office Alimarah", CATEGORIES[1] ?? "Storage", "A multi-door storage design with separate hanging and shelving spaces for an organized bedroom.", { images: ["/furniture/daraz1.jpg"], modelUrl: "/models/daraz1.glb" }),
  product("bed1", "Wooden Bed", CATEGORIES[2] ?? "Bedroom", "A steel bed design with a supported frame and mattress presentation for bedroom spaces.", { images: ["/furniture/bed1.jpg"], modelUrl: "/models/bed1.glb" }),
  product("matress1", " Mattress ", CATEGORIES[2] ?? "Bedroom", "A steel bed and mattress design for bedroom spaces.", { images: ["/furniture/matress1.jpg"], modelUrl: "/models/matress1.glb", modelScale: 0.45 }),
  product("chair1", "Boss Chair", CATEGORIES[3] ?? "Seating", "A straightforward seating design for household and commercial spaces, with a metal frame and supported backrest.", { images: ["/furniture/chair1.jpg"], modelUrl: "/models/chair1.glb" }),
  product("chair2", "Computer Chair", CATEGORIES[3] ?? "Seating", "A straightforward seating design for household and commercial spaces, with a metal frame and supported backrest.", { images: ["/furniture/chair2.jpg"], modelUrl: "/models/chair2.glb" }),
  product("waitingchair1", "3-Seat Waiting Chair", CATEGORIES[3] ?? "Seating", "A practical steel waiting chair for reception and public seating spaces.", { images: ["/furniture/waitingchair1.jpg"], modelUrl: "/models/waitingchair1.glb" }),
  product("sofa1", " Sofa", CATEGORIES[4] ?? "Sofas", "A practical sofa design with a durable steel frame and cushioned seating for homes, offices and waiting spaces.", { images: ["/furniture/sofa1.jpg"], modelUrl: "/models/sofa1.glb" }),
  product("sofa2", "Sofa", CATEGORIES[4] ?? "Sofas", "A practical sofa design with a durable steel frame and cushioned seating for homes, offices and waiting spaces.", { images: ["/furniture/sofa2.jpg"], modelUrl: "/models/sofa2.glb" }),
  product("desk1", "Single Office Table", CATEGORIES[5] ?? "Office", "A practical workspace design with a generous tabletop and drawer storage for everyday office essentials.", { images: ["/furniture/table1.jpg"], modelUrl: "/models/table1.glb" }),
  product("desk2", "Double Office Table", CATEGORIES[5] ?? "Office", "A practical workspace design with a generous tabletop and drawer storage for everyday office essentials.", { images: ["/furniture/table2.jpg"], modelUrl: "/models/table2.glb" }),
  product("locker1", "Locker", CATEGORIES[6] ?? "Storage", "A secure storage solution with a lockable door and a sturdy frame for keeping items safe.", { images: ["/furniture/locker1.jpg"], modelUrl: "/models/locker1.glb" }),
  product("rack1", "Open Rack", CATEGORIES[6] ?? "Storage", "An open steel storage rack for organizing household, office and commercial items.", { images: ["/furniture/rack1.jpg"], modelUrl: "/models/rack1.glb" }),
  product("safe1", "Safe", CATEGORIES[6] ?? "Storage", "A secure steel safe design for storing important documents and valuables.", { images: ["/furniture/safe1.jpg"], modelUrl: "/models/safe1.glb" }),
  product("wardrobe1", "Full Glass Door", CATEGORIES[1] ?? "Storage", "A multi-door storage design with separate hanging and shelving spaces for an organized bedroom.", { images: ["/furniture/wardrobe1.jpg"], modelUrl: "/models/wardrobe1.glb" }),
];

export function getProduct(key: string) {
  return PRODUCTS.find((p) => p.key === key) ?? PRODUCTS[0];
}
