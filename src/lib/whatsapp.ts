import { siteConfig } from "@/config/site";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
