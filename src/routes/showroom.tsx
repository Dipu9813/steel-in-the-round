import { createFileRoute, redirect } from "@tanstack/react-router";
import { furnitureHead } from "@/components/FurnitureSite";
import { LEGACY_SECTIONS } from "@/lib/site-navigation";
export const Route = createFileRoute("/showroom")({
  beforeLoad: () => { throw redirect({ to: "/", hash: LEGACY_SECTIONS.showroom, statusCode: 301 }); },
  head: () => furnitureHead("Furniture viewer", "View furniture in the New Yes Steel product collection."),
});
