import { createFileRoute, redirect } from "@tanstack/react-router";
import { furnitureHead } from "@/components/FurnitureSite";
import { LEGACY_SECTIONS } from "@/lib/site-navigation";
export const Route = createFileRoute("/products")({
  beforeLoad: () => { throw redirect({ to: "/", hash: LEGACY_SECTIONS.products, statusCode: 301 }); },
  head: () => furnitureHead("Furniture collection", "Browse steel furniture designs from New Yes Steel Furniture Udhyog."),
});
