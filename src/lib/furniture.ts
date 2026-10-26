export type ProductKey = "almirah" | "wardrobe" | "bed" | "chair" | "desk" | "bench" | "trunk";
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
}
export const CATEGORIES = ["Steel Almirahs & Daraz", "Wardrobes & Cupboards", "Steel Beds", "Chairs & Waiting Benches", "Office Tables & Desks", "Storage Cabinets & Trunks", "Household Furniture", "Other available furniture"];
const product = (key: ProductKey, name: string, category: string, description: string): FurnitureProduct => ({ key, name, category, description, dimensions: null, finish: null, priceNpr: null, availability: null, images: [] });
export const PRODUCTS: FurnitureProduct[] = [
  product("almirah", "Steel Almirah / Daraz", CATEGORIES[0] ?? "Storage", "Everyday storage for clothes, documents and household essentials. Explore a two-door design with interior shelving."),
  product("wardrobe", "Steel Wardrobe", CATEGORIES[1] ?? "Storage", "A multi-door storage design with separate hanging and shelving spaces for an organized bedroom."),
  product("bed", "Steel Bed", CATEGORIES[2] ?? "Bedroom", "A clean-lined steel bed design with a headboard and supporting frame, shown with a mattress for context."),
  product("chair", "Steel Chair", CATEGORIES[3] ?? "Seating", "A straightforward seating design for household and commercial spaces, with a metal frame and supported backrest."),
  product("desk", "Office Table", CATEGORIES[4] ?? "Office", "A practical workspace design with a generous tabletop and drawer storage for everyday office essentials."),
  product("bench", "Waiting Bench", CATEGORIES[3] ?? "Seating", "Connected seating on a shared metal frame, designed for reception and waiting spaces."),
  product("trunk", "Steel Storage Trunk", CATEGORIES[5] ?? "Storage", "A lidded storage design with carry handles and a front latch for keeping household essentials together."),
];
export function getProduct(key: string) { return PRODUCTS.find((p) => p.key === key) ?? PRODUCTS[0]; }