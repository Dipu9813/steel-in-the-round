import { describe, expect, it } from "vitest";
import { PRODUCTS, PRODUCT_KEYS, CATEGORIES, getProduct } from "@/lib/furniture";
describe("Furniture catalogue rules", () => {
  it("provides each requested furniture model", () => {
    expect(PRODUCTS.map((p) => p.key)).toEqual([...PRODUCT_KEYS]);
  });
  it("does not invent commercial details", () => {
    for (const p of PRODUCTS) expect([p.dimensions, p.finish, p.priceNpr, p.availability]).toEqual([null, null, null, null]);
  });
  it("keeps product selection synchronized", () => {
    expect(getProduct("bed")?.name).toBe("Steel Bed");
    expect(getProduct("desk")?.category).toBe("Office Tables & Desks");
  });
  it("includes all eight requested furniture categories", () => { expect(CATEGORIES).toHaveLength(8); expect(CATEGORIES).toContain("Household Furniture"); expect(CATEGORIES).toContain("Other available furniture"); });
});