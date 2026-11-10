import { Link } from "@tanstack/react-router";
import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Menu, X, Pause, Play, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES, getProduct, type ProductKey, type FurnitureProduct } from "@/lib/furniture";
import type { ViewerHandle } from "@/components/SteelViewer";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SECTION_NAV } from "@/lib/site-navigation";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
const SteelViewer = lazy(() => import("@/components/SteelViewer"));
export function furnitureHead(title: string, description: string) {
  const pageTitle = title.includes(siteConfig.businessName) ? title : `${title} | ${siteConfig.businessName}`;
  const canonicalUrl = siteConfig.siteUrl;
  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: `${siteConfig.siteUrl}/new-yes-steel-logo.png` },
      { property: "og:url", content: canonicalUrl },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${siteConfig.siteUrl}/new-yes-steel-logo.png` },
    ],
    links: [{ rel: "canonical", href: siteConfig.siteUrl }],
  };
}
export function Brand() {
  return <Link to="/" className="brand-logo-wrap flex shrink-0 items-center" aria-label="New Yes Steel Furniture Udhyog home"><img src="/new-yes-steel-logo.png" alt="New Yes Steel Furniture Udhyog logo" className="brand-logo" /></Link>;
}
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`site-width ${className}`}>{children}</div>;
}
export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`site-section ${className}`}>{children}</section>;
}
export function SectionHeader({ label, title, lead }: { label?: string; title: string; lead?: string }) {
  return <div className="section-header">{label && <p className="eyebrow">{label}</p>}<h2 className="section-title">{title}</h2>{lead && <p className="section-lead">{lead}</p>}</div>;
}
export function SiteLayout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    let frame = 0;
    function updateSection() {
      frame = 0;
      const current = SECTION_NAV.filter(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 150;
      }).at(-1);
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? "contact" : current?.id ?? "home");
    }
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateSection);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  const whatsappMessage = `Hello, I would like to know more about ${siteConfig.businessName}.`;
  return <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-30 border-b border-border bg-background"><div className="site-width flex h-20 items-center justify-between gap-4"><Brand /><nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">{SECTION_NAV.map((n) => <Link key={n.id} to="/" hash={n.id} aria-current={active === n.id ? "location" : undefined} className={`site-nav-link ${active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{n.name}</Link>)}</nav><Button variant="ghost" size="icon" className="lg:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>{menu && <nav className="site-width flex flex-col gap-4 border-t border-border py-6 lg:hidden" aria-label="Mobile navigation">{SECTION_NAV.map((n) => <Link key={n.id} to="/" hash={n.id} aria-current={active === n.id ? "location" : undefined} onClick={() => setMenu(false)} className={`site-nav-link ${active === n.id ? "text-primary" : "text-muted-foreground"}`}>{n.name}</Link>)}</nav>}</header>
    <main>{children}</main>
    <footer className="site-footer pb-24"><div className="site-width grid gap-8 py-12 md:grid-cols-2"><div><img src="/new-yes-steel-logo.png" alt={`${siteConfig.businessName} logo`} className="footer-logo" /><h4 className="mt-4 text-lg font-semibold">New Yes Steel Furniture Udyog</h4><p className="footer-muted mt-3 max-w-sm text-sm leading-6">Manufacturer of quality steel furniture for homes, offices, and businesses.</p><p className="footer-muted mt-4 flex gap-2 text-sm"><MapPin size={16} className="mt-0.5 shrink-0" />{siteConfig.address}</p><p className="footer-muted mt-3 text-sm">Open {siteConfig.openingHours}</p></div><div><h4 className="text-lg font-semibold">Contact Us</h4><ul className="footer-muted mt-4 space-y-3 text-sm"><li><a href={`tel:${siteConfig.phone}`} className="footer-link inline-flex items-center gap-2"><Phone size={16} />{siteConfig.phone}</a></li><li><a href={`tel:${siteConfig.whatsappNumber}`} className="footer-link inline-flex items-center gap-2"><Phone size={16} />{siteConfig.phone}</a></li><li><a href={`mailto:${siteConfig.email}`} className="footer-link inline-flex items-center gap-2 break-all"><Mail size={16} className="shrink-0" />{siteConfig.email}</a></li></ul></div></div><div className="footer-divider"><p className="site-width footer-muted py-6 text-xs">© 2026 New Yes Steel Furniture Udyog. All rights reserved.</p></div></footer>
    <FloatingContactActions message={whatsappMessage} />
  </div>;
}
function FloatingContactActions({ message }: { message: string }) {
  return <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
    <a href={`tel:${siteConfig.phone}`} aria-label={`Call ${siteConfig.businessName}`} className="mobile-call inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><Phone aria-hidden="true" size={23} /></a>
    <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" aria-label={`Contact ${siteConfig.businessName} on WhatsApp`} className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><svg viewBox="0 0 24 24" width="25" height="25" aria-hidden="true" fill="currentColor"><path d="M12 2a9.9 9.9 0 0 0-8.56 14.88L2 22l5.28-1.39A10 10 0 1 0 12 2Zm0 17.98a8 8 0 0 1-4.08-1.12l-.29-.17-3.13.82.84-3.05-.19-.31A8 8 0 1 1 12 19.98Zm4.39-5.99c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.71-.63-1.19-1.4-1.33-1.64-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" /></svg></a>
  </div>;
}
function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch { return false; }
}
class ViewerBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override componentDidCatch(error: unknown) { console.warn("3D viewer unavailable, showing photo instead", error); }
  override render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
function ViewerFallback({ kind }: { kind: ProductKey }) {
  const product = getProduct(kind);
  return <div className="flex h-full flex-col items-center justify-center gap-2">{product && <img src={product.images[0] ?? `/furniture/${kind}.jpg`} alt={`${product.name} — illustrative design`} className="max-h-[85%] w-auto object-contain" />}<p className="text-[10px] text-muted-foreground">3D view isn’t supported on this browser — showing a photo instead.</p></div>;
}
export function FurniturePreview({ kind, autoRotate = true, open = false, zoomedOut = false, viewerRef }: { kind: ProductKey; autoRotate?: boolean; open?: boolean; zoomedOut?: boolean; viewerRef?: React.Ref<ViewerHandle> }) {
  const [state, setState] = useState<"pending" | "ok" | "unsupported">("pending");
  useEffect(() => setState(webglAvailable() ? "ok" : "unsupported"), []);
  if (state === "pending") return null;
  if (state === "unsupported") return <ViewerFallback kind={kind} />;
  return <ViewerBoundary fallback={<ViewerFallback kind={kind} />}><Suspense fallback={<div className="flex h-full items-center justify-center text-xs text-muted-foreground">Loading furniture…</div>}><SteelViewer ref={viewerRef} kind={kind} autoRotate={autoRotate} open={open} zoomedOut={zoomedOut} /></Suspense></ViewerBoundary>;
}
export function ProductPhoto({ product }: { product: FurnitureProduct }) {
  return <ImageFrame className="catalogue-photo"><img src={product.images[0] ?? `/furniture/${product.key}.jpg`} alt={`${product.name} steel furniture by ${siteConfig.businessName} in Nepal`} loading="lazy" decoding="async" width={800} height={700} className="catalogue-image" /></ImageFrame>;
}
export function ImageFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`image-frame ${className}`}>{children}</span>;
}
export function Showroom({ hero = false, initial = "almirah1", onEnquire }: { hero?: boolean; initial?: ProductKey; onEnquire?: () => void }) {
  const [key, setKey] = useState<ProductKey>(initial), [rotate, setRotate] = useState(true), [open, setOpen] = useState(false);
  const ref = useRef<ViewerHandle>(null);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setRotate(false); }, []);
  const p = getProduct(key);
  if (!p) return null;
  return <div className={hero ? "hero-viewer" : "product-viewer"}>
    <div className={`grid items-center gap-4 ${hero ? "" : "lg:grid-cols-[minmax(0,1fr)_280px]"}`}>
      <div className="relative min-w-0">
        <div className="showroom-canvas" data-testid="furniture-viewer" data-product={key}><FurniturePreview key={key} kind={key} autoRotate={rotate} open={open} zoomedOut={!hero} viewerRef={ref} /></div>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-3"><Button title={rotate ? "Pause rotation" : "Start rotation"} aria-label={rotate ? "Pause rotation" : "Start rotation"} variant="ghost" size="icon" aria-pressed={rotate} onClick={() => setRotate(!rotate)}>{rotate ? <Pause /> : <Play />}</Button></div>
      </div>
      {!hero && <div className="pb-2 lg:pl-5"><p className="eyebrow">{p.category}</p><h3 className="mt-3 text-2xl font-semibold">{p.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{p.description}</p><dl className="mt-5 divide-y divide-border border-y border-border text-xs">{[["Dimensions", p.dimensions ?? "To be confirmed"], ["Finish", p.finish ?? "To be confirmed"], ["Price (NPR)", p.priceNpr === null ? "Please enquire" : `NPR ${p.priceNpr.toLocaleString()}`], ["Availability", p.availability ?? "Please enquire"]].map(([label, value]) => <div key={label} className="flex justify-between gap-3 py-3"><dt className="text-muted-foreground">{label}</dt><dd className="text-right">{value}</dd></div>)}</dl><Button asChild className="mt-5 w-full shadow-none"><Link to="/" hash="contact" onClick={onEnquire}>Enquire about this product <ArrowUpRight /></Link></Button></div>}
    </div>
  </div>;
}
export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="pt-14"><p className="eyebrow mb-3">{eyebrow}</p><h1 className="page-title mb-4">{title}</h1>{children && <p className="max-w-prose text-base leading-[1.65] text-muted-foreground">{children}</p>}</div>;
}
export function Catalogue({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState("All furniture");
  const [selected, setSelected] = useState<FurnitureProduct | null>(null);
  const products = PRODUCTS.filter((p) => category === "All furniture" || p.category === category);
  return <><div className="catalogue-filters mt-8 flex gap-x-8 gap-y-3 overflow-x-auto border-b border-border pb-4">{["All furniture", ...CATEGORIES].map((c) => <Button key={c} variant="link" className={`h-auto shrink-0 p-0 text-sm ${category === c ? "text-primary underline" : "text-muted-foreground"}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</Button>)}</div><div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{(compact ? products.slice(0, 3) : products).map((p) => <ProductCard key={p.key} product={p} onSelect={setSelected} />)}</div>{products.length === 0 && <div className="py-12"><h3 className="text-xl">Collection details coming soon</h3><Button asChild variant="link" className="mt-3 px-0"><Link to="/" hash="contact">Enquire about {category.toLowerCase()} <ArrowRight /></Link></Button></div>}<p className="mt-6 text-sm text-muted-foreground">Illustrative 3D designs · Specifications, prices and stock to be confirmed.</p><Dialog open={selected !== null} onOpenChange={(isOpen) => { if (!isOpen) setSelected(null); }}><DialogContent className="viewer-dialog max-h-[90dvh] w-[calc(100%-24px)] max-w-5xl overflow-y-auto"><DialogTitle className="pr-8">{selected?.name}</DialogTitle><DialogDescription>Illustrative 3D design · Specifications and stock to be confirmed.</DialogDescription>{selected && <Showroom key={selected.key} initial={selected.key} onEnquire={() => setSelected(null)} />}</DialogContent></Dialog></>;
}
function ProductCard({ product, onSelect }: { product: FurnitureProduct; onSelect: (product: FurnitureProduct) => void }) {
  return <article className="catalogue-product min-w-0"><Button variant="ghost" className="block h-auto w-full overflow-hidden rounded-none p-0 hover:bg-background" aria-label={`View ${product.name} in showroom`} onClick={() => onSelect(product)}><ProductPhoto product={product} /></Button><h3 className="catalogue-title mt-4 line-clamp-2 min-h-[3.25rem] text-left"><button type="button" className="text-left hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={() => onSelect(product)}>{product.name}</button></h3><p className="product-category mt-1">{product.category}</p><div className="mt-3 flex flex-wrap justify-between gap-4"><Button variant="link" className="h-auto min-h-11 p-0 text-sm text-foreground" onClick={() => onSelect(product)}>View in Showroom <ArrowRight /></Button><a href={buildWhatsAppLink(`Hello, I am interested in the ${product.name} (${product.category}). Please share details and price.`)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-primary underline-offset-4 hover:underline">Enquire <ArrowUpRight /></a></div></article>;
}
