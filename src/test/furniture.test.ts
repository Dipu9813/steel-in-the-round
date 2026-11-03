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
  it("places trunks and lockers in the storage category", () => {
    expect(getProduct("trunk")?.category).toBe("Storage Cabinets & Trunks");
    expect(getProduct("locker1")?.category).toBe("Storage Cabinets & Trunks");
  });
  it("includes the requested furniture categories", () => { expect(CATEGORIES).toHaveLength(9); expect(CATEGORIES).toContain("Sofas"); expect(CATEGORIES).toContain("Household Furniture"); expect(CATEGORIES).toContain("Other available furniture"); });
});