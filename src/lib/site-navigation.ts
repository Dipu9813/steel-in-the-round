export const SECTION_NAV = [
  { id: "home", name: "Home" },
  { id: "products", name: "Products" },
  { id: "about", name: "About Us" },
  { id: "contact", name: "Contact" },
] as const;

export const LEGACY_SECTIONS = {
  products: "products",
  showroom: "products",
  gallery: "products",
  about: "about",
  contact: "contact",
} as const;