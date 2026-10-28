import { createFileRoute, redirect } from "@tanstack/react-router";
import { furnitureHead } from "@/components/FurnitureSite";
import { LEGACY_SECTIONS } from "@/lib/site-navigation";
export const Route = createFileRoute("/about")({
  beforeLoad: () => { throw redirect({ to: "/", hash: LEGACY_SECTIONS.about, statusCode: 301 }); },
  head: () => furnitureHead("About New Yes Steel", "Learn about New Yes Steel Furniture Udhyog in Nepal."),
});
