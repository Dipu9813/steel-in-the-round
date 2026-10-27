import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { quoteSchema } from "@/lib/quote-schema";
import type { Database } from "@/integrations/supabase/types";
export const submitQuote = createServerFn({ method: "POST" }).inputValidator((input: unknown) => quoteSchema.parse(input)).handler(async ({ data }) => {
  const url = process.env["SUPABASE_URL"], key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return { ok: false as const, error: "Quote requests are temporarily unavailable. Please try again." };
  const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => { const h = new Headers(init?.headers); if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization"); h.set("apikey", key); return fetch(input, { ...init, headers: h }); } } });
  const id = crypto.randomUUID();
  const { error } = await client.from("quote_requests").insert({ id, customer_name: data.customerName, phone: data.phone, email: data.email, items: data.items, delivery_method: data.deliveryMethod, district: data.deliveryMethod === "delivery" ? data.district : "", municipality: data.deliveryMethod === "delivery" ? data.municipality : "", address: data.deliveryMethod === "delivery" ? data.address : "", notes: data.notes });
  if (error) return { ok: false as const, error: "Your request could not be saved. Please try again." };
  return { ok: true as const, reference: id };
});