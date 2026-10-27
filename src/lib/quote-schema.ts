import { z } from "zod";
export const quoteSchema = z.object({
  customerName: z.string().trim().min(1, "Enter your name.").max(100),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,25}$/, "Enter a valid phone number."),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address.").max(254)]),
  items: z.array(z.object({ product: z.enum(["almirah", "wardrobe", "bed", "chair", "desk", "bench", "trunk"]), quantity: z.number().int().min(1, "Quantity must be at least 1.").max(999, "For larger quantities, please split your request.") }).strict()).min(1, "Select at least one furniture product.").max(7).refine((items) => new Set(items.map((i) => i.product)).size === items.length, "Each product can be selected once."),
  deliveryMethod: z.enum(["delivery", "pickup"]),
  district: z.string().trim().max(100), municipality: z.string().trim().max(100), address: z.string().trim().max(500), notes: z.string().trim().max(1500),
  website: z.literal("").default(""),
}).strict().superRefine((data, ctx) => {
  if (data.deliveryMethod === "delivery") for (const key of ["district", "municipality", "address"] as const) if (!data[key]) ctx.addIssue({ code: "custom", path: [key], message: "Enter your delivery details." });
});
export type QuoteInput = z.infer<typeof quoteSchema>;