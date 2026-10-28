import { Link, useRouterState } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Box, Menu, X, RotateCcw, Pause, Play, Plus, Minus, DoorOpen, Download, Check, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES, getProduct, type ProductKey, type FurnitureProduct } from "@/lib/furniture";
import type { ViewerHandle } from "@/components/SteelViewer";
import conceptImage from "@/assets/furniture-concept.jpg";
const SteelViewer = lazy(() => import("@/components/SteelViewer"));
const NAV = [{ to: "/", name: "Home" }, { to: "/products", name: "Products" }, { to: "/showroom", name: "3D Showroom" }, { to: "/about", name: "About Us" }, { to: "/gallery", name: "Gallery" }, { to: "/contact", name: "Contact" }] as const;
export function furnitureHead(title: string, description: string) {
  return { meta: [{ title: `${title} | NEW YES STEEL` }, { name: "description", content: description }, { property: "og:title", content: `${title} | NEW YES STEEL` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}
export function Brand() {
  return <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="New Yes Steel Furniture Udhyog home"><span className="flex h-10 w-10 items-center justify-center border-l-[3px] border-primary text-secondary"><Armchair size={32} strokeWidth={1.8} /></span><span><span className="block font-display text-lg font-bold leading-tight">NEW YES <span className="text-secondary">STEEL</span></span><span className="block text-[10px] font-semibold text-muted-foreground">Furniture Udhyog · Nepal</span></span></Link>;
}
export function SiteLayout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-30 border-b border-border bg-background"><div className="site-width flex h-20 items-center justify-between gap-5"><Brand /><nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{NAV.map((n) => <Link key={n.to} to={n.to} aria-current={path === n.to ? "page" : undefined} className={`site-nav-link text-xs font-semibold ${path === n.to ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{n.name}</Link>)}</nav><Button asChild className="hidden shadow-none sm:inline-flex"><Link to="/contact">Enquire now <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>{menu && <nav className="site-width flex flex-col gap-5 border-t border-border py-6 lg:hidden" aria-label="Mobile navigation">{NAV.map((n) => <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="text-sm font-semibold">{n.name}</Link>)}</nav>}</header>
    <main>{children}</main>
    <footer className="mt-16 border-t border-border"><div className="site-width flex flex-wrap items-center justify-between gap-6 py-9"><Brand /><p className="text-xs text-muted-foreground">© 2026 New Yes Steel Furniture Udhyog</p><Link to="/contact" className="text-xs font-semibold text-secondary">Let’s talk furniture <ArrowUpRight className="ml-1 inline" size={14} /></Link></div></footer>
  </div>;
}
export function FurniturePreview({ kind, autoRotate = true, open = false, viewerRef }: { kind: ProductKey; autoRotate?: boolean; open?: boolean; viewerRef?: React.Ref<ViewerHandle> }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <Suspense fallback={<div className="flex h-full items-center justify-center text-xs text-muted-foreground">Loading furniture…</div>}><SteelViewer ref={viewerRef} kind={kind} autoRotate={autoRotate} open={open} /></Suspense> : null;
}
export function ProductPhoto({ product }: { product: FurnitureProduct }) {
  return <span className="catalogue-photo"><img src={product.images[0] ?? `/furniture/${product.key}.jpg`} alt={`${product.name} — illustrative 3D design`} loading="lazy" width={800} height={700} className="catalogue-image" /></span>;
}
export function Showroom({ hero = false, initial = "almirah" }: { hero?: boolean; initial?: ProductKey }) {
  const [key, setKey] = useState<ProductKey>(initial), [rotate, setRotate] = useState(true), [open, setOpen] = useState(false);
  const ref = useRef<ViewerHandle>(null);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setRotate(false); }, []);
  const p = getProduct(key);
  if (!p) return null;
  function select(next: ProductKey) { setKey(next); setOpen(false); ref.current?.reset(); }
  return <div className={hero ? "mt-4" : "mt-10"}>
    <div className="product-tabs flex gap-2 overflow-x-auto border-b border-border pb-0" aria-label="Choose furniture">{PRODUCTS.map((x) => <Button key={x.key} variant="ghost" aria-label={`View ${x.name}`} aria-pressed={key === x.key} onClick={() => select(x.key)} className="product-tab h-12 shrink-0 px-4 text-xs shadow-none">{x.key === "almirah" ? "Almirah" : x.key === "wardrobe" ? "Wardrobe" : x.key === "desk" ? "Office table" : x.key === "trunk" ? "Storage trunk" : x.name.replace("Steel ", "")}</Button>)}</div>
    <div className={`grid items-center gap-4 ${hero ? "lg:grid-cols-[minmax(0,1fr)_300px]" : "lg:grid-cols-[minmax(0,1fr)_320px]"}`}>
      <div className="relative min-w-0">
        <div className="pointer-events-none absolute left-0 top-6 z-10 flex items-center gap-2 text-[10px] font-semibold text-secondary"><Box size={14} /> 3D SHOWROOM</div>
        <div className="showroom-canvas" data-testid="furniture-viewer" data-product={key}><FurniturePreview key={key} kind={key} autoRotate={rotate} open={open} viewerRef={ref} /></div>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between gap-3"><span className="text-[10px] text-muted-foreground">Illustrative furniture design</span><div className="flex items-center gap-1">{[{ label: rotate ? "Pause rotation" : "Start rotation", icon: rotate ? <Pause /> : <Play />, action: () => setRotate(!rotate) }, { label: "Zoom in", icon: <Plus />, action: () => ref.current?.zoom(1) }, { label: "Zoom out", icon: <Minus />, action: () => ref.current?.zoom(-1) }, { label: "Reset view", icon: <RotateCcw />, action: () => ref.current?.reset() }].map((tool) => <Button key={tool.label} title={tool.label} aria-label={tool.label} variant="ghost" size="icon" onClick={tool.action}>{tool.icon}</Button>)}{["almirah", "wardrobe", "trunk"].includes(key) && <Button title={open ? "Close doors" : "Open doors"} aria-label={open ? "Close doors" : "Open doors"} variant="ghost" size="icon" aria-pressed={open} onClick={() => setOpen(!open)}><DoorOpen /></Button>}</div></div>
      </div>
      <div className="pb-6 lg:pl-7"><p className="eyebrow">{p.category}</p><h3 className="mt-3 text-2xl font-semibold">{p.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{p.description}</p><dl className="mt-5 divide-y divide-border border-y border-border text-xs">{[["Dimensions", p.dimensions ?? "To be confirmed"], ["Finish", p.finish ?? "To be confirmed"], ["Price (NPR)", p.priceNpr === null ? "Request a quote" : `NPR ${p.priceNpr.toLocaleString()}`], ["Availability", p.availability ?? "Please enquire"]].map(([label, value]) => <div key={label} className="flex justify-between gap-3 py-3"><dt className="text-muted-foreground">{label}</dt><dd className="text-right">{value}</dd></div>)}</dl><Button asChild className="mt-5 w-full shadow-none"><Link to="/contact" search={{ product: p.key }}>Request a quote <ArrowUpRight /></Link></Button></div>
    </div>
  </div>;
}
export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="pt-14"><p className="eyebrow">{eyebrow}</p><h1 className="page-title mt-4 font-semibold">{title}</h1>{children && <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{children}</p>}</div>;
}
export function Catalogue({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState("All furniture");
  const products = PRODUCTS.filter((p) => category === "All furniture" || p.category === category);
  return <><div className="catalogue-filters mt-8 flex gap-x-6 gap-y-3 overflow-x-auto border-b border-border pb-5">{["All furniture", ...CATEGORIES].map((c) => <Button key={c} variant="link" className={`h-auto shrink-0 p-0 text-xs ${category === c ? "text-primary underline" : "text-muted-foreground"}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</Button>)}</div><div className="mt-5 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{(compact ? products.slice(0, 3) : products).map((p) => <article key={p.key} className="catalogue-product min-w-0 border-b border-border pb-6"><Link to="/showroom" search={{ product: p.key }}><ProductPhoto product={p} /></Link><p className="eyebrow mt-4">{p.category}</p><h3 className="mt-2 text-xl font-semibold leading-snug">{p.name}</h3><div className="mt-5 flex justify-between gap-4"><Button asChild variant="link" className="h-auto p-0 text-xs text-secondary"><Link to="/showroom" search={{ product: p.key }}>Explore in 3D <ArrowRight /></Link></Button><Button asChild variant="link" className="h-auto p-0 text-xs"><Link to="/contact" search={{ product: p.key }}>Enquire <ArrowUpRight /></Link></Button></div></article>)}</div>{products.length === 0 && <div className="py-16"><h3 className="text-xl">Collection details coming soon</h3><Button asChild variant="link" className="mt-3 px-0"><Link to="/contact">Enquire about {category.toLowerCase()} <ArrowRight /></Link></Button></div>}<p className="mt-6 text-xs text-muted-foreground">Illustrative 3D designs · Specifications, prices and stock to be confirmed.</p></>;
}
export function ConceptGallery() {
  return <figure className="mt-10"><img src={conceptImage} alt="Illustrative furniture styling concept with an almirah, steel bed, chair and office table" width={1536} height={1024} loading="lazy" className="w-full object-contain" /><figcaption className="mt-3 text-xs text-muted-foreground">Furniture styling concept · AI-generated illustration, not a photograph of our products or showroom.</figcaption></figure>;
}
export function EnquiryForm({ initial }: { initial?: ProductKey }) {
  const [saved, setSaved] = useState(false);
  function download(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `Enquiry draft — New Yes Steel Furniture Udhyog\n\nName: ${data.get("name")}\nContact: ${data.get("contact")}\nProduct: ${data.get("product")}\nMessage: ${data.get("message")}\n\nThis draft has not been sent. Business contact details are not yet configured.`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "new-yes-steel-enquiry.txt"; a.click(); URL.revokeObjectURL(url); setSaved(true);
  }
  const field = "mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-secondary";
  return <form onSubmit={download} className="grid gap-5" onChange={() => setSaved(false)}><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-semibold">Your name<input className={field} name="name" autoComplete="name" required /></label><label className="text-xs font-semibold">Phone or email<input className={field} name="contact" required /></label></div><label className="text-xs font-semibold">Furniture you’re interested in<select className={field} name="product" defaultValue={getProduct(initial ?? "")?.name}>{PRODUCTS.map((p) => <option key={p.key}>{p.name}</option>)}<option>Other furniture</option></select></label><label className="text-xs font-semibold">Your enquiry<textarea className={`${field} min-h-32`} name="message" required /></label><p className="text-xs leading-6 text-muted-foreground">Direct enquiries are not connected yet. Save a draft below; it will not be sent to the business.</p><Button type="submit" className="justify-self-start shadow-none">{saved ? <Check /> : <Download />}{saved ? "Draft saved" : "Save enquiry draft"}</Button>{saved && <p role="status" className="text-sm text-secondary">Your enquiry draft was downloaded. Nothing has been sent.</p>}</form>;
}