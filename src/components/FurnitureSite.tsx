import { Link } from "@tanstack/react-router";
import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Box, Menu, X, RotateCcw, Pause, Play, Plus, Minus, DoorOpen, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES, getProduct, type ProductKey, type FurnitureProduct } from "@/lib/furniture";
import type { ViewerHandle } from "@/components/SteelViewer";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SECTION_NAV } from "@/lib/site-navigation";
const SteelViewer = lazy(() => import("@/components/SteelViewer"));
export function furnitureHead(title: string, description: string) {
  return { meta: [{ title: `${title} | NEW YES STEEL` }, { name: "description", content: description }, { property: "og:title", content: `${title} | NEW YES STEEL` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}
export function Brand() {
  return <Link to="/" className="brand-logo-wrap flex shrink-0 items-center" aria-label="New Yes Steel Furniture Udhyog home"><img src="/new-yes-steel-logo.png" alt="New Yes Steel Furniture Udhyog logo" className="brand-logo" /></Link>;
}
export function SiteLayout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    function updateSection() {
      const current = SECTION_NAV.filter(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 150;
      }).at(-1);
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? "contact" : current?.id ?? "home");
    }
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("resize", updateSection);
    return () => { window.removeEventListener("scroll", updateSection); window.removeEventListener("resize", updateSection); };
  }, []);
  return <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-30 border-b border-border bg-background"><div className="site-width flex h-20 items-center justify-between gap-5"><Brand /><nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{SECTION_NAV.map((n) => <Link key={n.id} to="/" hash={n.id} aria-current={active === n.id ? "location" : undefined} className={`site-nav-link text-xs font-semibold ${active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{n.name}</Link>)}</nav><Button variant="ghost" size="icon" className="lg:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>{menu && <nav className="site-width flex flex-col gap-5 border-t border-border py-6 lg:hidden" aria-label="Mobile navigation">{SECTION_NAV.map((n) => <Link key={n.id} to="/" hash={n.id} aria-current={active === n.id ? "location" : undefined} onClick={() => setMenu(false)} className={`text-sm font-semibold ${active === n.id ? "text-primary" : "text-muted-foreground"}`}>{n.name}</Link>)}</nav>}</header>
    <main>{children}</main>
    <footer className="site-footer"><div className="site-width grid gap-10 py-14 md:grid-cols-2"><div><img src="/new-yes-steel-logo.png" alt="New Yes Steel Furniture Udhyog logo" className="footer-logo" /><h2 className="mt-5 text-lg font-semibold">New Yes Steel Furniture Udyog</h2><p className="footer-muted mt-3 max-w-sm text-sm leading-6">Manufacturer of quality steel furniture for homes, offices, and businesses.</p><p className="footer-muted mt-4 flex gap-2 text-sm"><MapPin size={16} className="mt-0.5 shrink-0" />M.N.P.A. Ward No. 6, Dhalkewar, Dhanusha, Nepal.</p></div><div><h2 className="text-lg font-semibold">Contact Us</h2><ul className="footer-muted mt-5 space-y-3 text-sm">{["9854028046", "9854048046"].map((n) => <li key={n}><a href={`tel:${n}`} className="footer-link inline-flex items-center gap-2"><Phone size={16} />{n}</a></li>)}<li><a href="mailto:newyessteelfurnitureudhyog868@gmail.com" className="footer-link inline-flex items-center gap-2 break-all"><Mail size={16} className="shrink-0" />newyessteelfurnitureudhyog868@gmail.com</a></li></ul></div></div><div className="footer-divider"><p className="site-width footer-muted py-6 text-xs">© 2026 New Yes Steel Furniture Udyog. All rights reserved.</p></div></footer>
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
export function FurniturePreview({ kind, autoRotate = true, open = false, viewerRef }: { kind: ProductKey; autoRotate?: boolean; open?: boolean; viewerRef?: React.Ref<ViewerHandle> }) {
  const [state, setState] = useState<"pending" | "ok" | "unsupported">("pending");
  useEffect(() => setState(webglAvailable() ? "ok" : "unsupported"), []);
  if (state === "pending") return null;
  if (state === "unsupported") return <ViewerFallback kind={kind} />;
  return <ViewerBoundary fallback={<ViewerFallback kind={kind} />}><Suspense fallback={<div className="flex h-full items-center justify-center text-xs text-muted-foreground">Loading furniture…</div>}><SteelViewer ref={viewerRef} kind={kind} autoRotate={autoRotate} open={open} /></Suspense></ViewerBoundary>;
}
export function ProductPhoto({ product }: { product: FurnitureProduct }) {
  return <span className="catalogue-photo"><img src={product.images[0] ?? `/furniture/${product.key}.jpg`} alt={`${product.name} — illustrative 3D design`} loading="lazy" width={800} height={700} className="catalogue-image" /></span>;
}
export function Showroom({ hero = false, initial = "almirah", onEnquire }: { hero?: boolean; initial?: ProductKey; onEnquire?: () => void }) {
  const [key, setKey] = useState<ProductKey>(initial), [rotate, setRotate] = useState(true), [open, setOpen] = useState(false);
  const ref = useRef<ViewerHandle>(null);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setRotate(false); }, []);
  const p = getProduct(key);
  if (!p) return null;
  return <div className={hero ? "hero-viewer" : "product-viewer"}>
    <div className={`grid items-center gap-4 ${hero ? "" : "lg:grid-cols-[minmax(0,1fr)_280px]"}`}>
      <div className="relative min-w-0">
        <div className="pointer-events-none absolute left-0 top-3 z-10 flex items-center gap-2 text-[10px] font-semibold text-secondary"><Box size={14} /> {p.name}</div>
        <div className="showroom-canvas" data-testid="furniture-viewer" data-product={key}><FurniturePreview key={key} kind={key} autoRotate={rotate} open={open} viewerRef={ref} /></div>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between gap-3"><span className="text-[10px] text-muted-foreground">Illustrative furniture design</span><div className="flex items-center gap-1">{!hero && [{ label: rotate ? "Pause rotation" : "Start rotation", icon: rotate ? <Pause /> : <Play />, action: () => setRotate(!rotate) }, { label: "Zoom in", icon: <Plus />, action: () => ref.current?.zoom(1) }, { label: "Zoom out", icon: <Minus />, action: () => ref.current?.zoom(-1) }, { label: "Reset view", icon: <RotateCcw />, action: () => ref.current?.reset() }].map((tool) => <Button key={tool.label} title={tool.label} aria-label={tool.label} variant="ghost" size="icon" onClick={tool.action}>{tool.icon}</Button>)}{(key.startsWith("almirah") || key === "wardrobe" || key === "trunk") && <Button title={open ? "Close doors" : "Open doors"} aria-label={open ? "Close doors" : "Open doors"} variant="ghost" size="icon" aria-pressed={open} onClick={() => setOpen(!open)}><DoorOpen /></Button>}</div></div>
      </div>
      {!hero && <div className="pb-2 lg:pl-5"><p className="eyebrow">{p.category}</p><h3 className="mt-3 text-2xl font-semibold">{p.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{p.description}</p><dl className="mt-5 divide-y divide-border border-y border-border text-xs">{[["Dimensions", p.dimensions ?? "To be confirmed"], ["Finish", p.finish ?? "To be confirmed"], ["Price (NPR)", p.priceNpr === null ? "Please enquire" : `NPR ${p.priceNpr.toLocaleString()}`], ["Availability", p.availability ?? "Please enquire"]].map(([label, value]) => <div key={label} className="flex justify-between gap-3 py-3"><dt className="text-muted-foreground">{label}</dt><dd className="text-right">{value}</dd></div>)}</dl><Button asChild className="mt-5 w-full shadow-none"><Link to="/" hash="contact" onClick={onEnquire}>Enquire about this product <ArrowUpRight /></Link></Button></div>}
    </div>
  </div>;
}
export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="pt-14"><p className="eyebrow">{eyebrow}</p><h1 className="page-title mt-4 font-semibold">{title}</h1>{children && <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{children}</p>}</div>;
}
export function Catalogue({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState("All furniture");
  const [selected, setSelected] = useState<FurnitureProduct | null>(null);
  const products = PRODUCTS.filter((p) => category === "All furniture" || p.category === category);
  return <><div className="catalogue-filters mt-8 flex gap-x-6 gap-y-3 overflow-x-auto border-b border-border pb-5">{["All furniture", ...CATEGORIES].map((c) => <Button key={c} variant="link" className={`h-auto shrink-0 p-0 text-xs ${category === c ? "text-primary underline" : "text-muted-foreground"}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</Button>)}</div><div className="mt-5 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{(compact ? products.slice(0, 3) : products).map((p) => <article key={p.key} className="catalogue-product min-w-0 border-b border-border pb-6"><Button variant="ghost" className="block h-auto w-full overflow-hidden rounded-none p-0 hover:bg-background" aria-label={`View ${p.name} in showroom`} onClick={() => setSelected(p)}><ProductPhoto product={p} /></Button><p className="eyebrow mt-4">{p.category}</p><h3 className="mt-2 text-xl font-semibold leading-snug">{p.name}</h3><div className="mt-5 flex flex-wrap justify-between gap-4"><Button variant="link" className="h-auto p-0 text-xs text-secondary" onClick={() => setSelected(p)}>View in Showroom <ArrowRight /></Button><Button asChild variant="link" className="h-auto p-0 text-xs"><Link to="/" hash="contact">Enquire <ArrowUpRight /></Link></Button></div></article>)}</div>{products.length === 0 && <div className="py-16"><h3 className="text-xl">Collection details coming soon</h3><Button asChild variant="link" className="mt-3 px-0"><Link to="/" hash="contact">Enquire about {category.toLowerCase()} <ArrowRight /></Link></Button></div>}<p className="mt-6 text-xs text-muted-foreground">Illustrative 3D designs · Specifications, prices and stock to be confirmed.</p><Dialog open={selected !== null} onOpenChange={(isOpen) => { if (!isOpen) setSelected(null); }}><DialogContent className="viewer-dialog max-h-[90dvh] w-[calc(100%-24px)] max-w-5xl overflow-y-auto"><DialogTitle className="pr-8">{selected?.name}</DialogTitle><DialogDescription>Illustrative 3D design · Specifications and stock to be confirmed.</DialogDescription>{selected && <Showroom key={selected.key} initial={selected.key} onEnquire={() => setSelected(null)} />}</DialogContent></Dialog></>;
}