import { createFileRoute, redirect } from "@tanstack/react-router";
import { furnitureHead } from "@/components/FurnitureSite";
import { LEGACY_SECTIONS } from "@/lib/site-navigation";
export const Route = createFileRoute("/contact")({
  beforeLoad: () => { throw redirect({ to: "/", hash: LEGACY_SECTIONS.contact, statusCode: 301 }); },
  head: () => furnitureHead("Contact New Yes Steel", "Visit New Yes Steel Furniture Udhyog and find verified contact details."),
});
