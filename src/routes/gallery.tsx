import { createFileRoute, redirect } from "@tanstack/react-router";
import { furnitureHead } from "@/components/FurnitureSite";
import { LEGACY_SECTIONS } from "@/lib/site-navigation";
export const Route = createFileRoute("/gallery")({
  beforeLoad: () => { throw redirect({ to: "/", hash: LEGACY_SECTIONS.gallery, statusCode: 301 }); },
  head: () => furnitureHead("Furniture designs", "Explore the New Yes Steel furniture collection."),
});
