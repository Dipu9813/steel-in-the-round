import { describe, expect, it } from "vitest";
import { quoteSchema } from "@/lib/quote-schema";
const base = { customerName: "Customer", phone: "+977 9800000000", email: "", items: [{ product: "bed", quantity: 2 }], deliveryMethod: "delivery", district: "Kathmandu", municipality: "Kathmandu", address: "Ward 1, test address", notes: "", website: "" };
describe("Furniture quote rules", () => {
  it("accepts selected products with quantities and delivery details", () => { expect(quoteSchema.parse(base).items).toEqual([{ product: "bed", quantity: 2 }]); });
  it("requires at least one product", () => { expect(quoteSchema.safeParse({ ...base, items: [] }).success).toBe(false); });
  it("rejects zero and fractional quantities", () => { for (const quantity of [0, 1.5]) expect(quoteSchema.safeParse({ ...base, items: [{ product: "bed", quantity }] }).success).toBe(false); });
  it("requires a delivery address for delivery", () => { expect(quoteSchema.safeParse({ ...base, address: "" }).success).toBe(false); });
  it("allows collection without a delivery address", () => { expect(quoteSchema.safeParse({ ...base, deliveryMethod: "pickup", district: "", municipality: "", address: "" }).success).toBe(true); });
  it("rejects unknown products and duplicate product lines", () => { expect(quoteSchema.safeParse({ ...base, items: [{ product: "unknown", quantity: 1 }] }).success).toBe(false); expect(quoteSchema.safeParse({ ...base, items: [...base.items, ...base.items] }).success).toBe(false); });
});