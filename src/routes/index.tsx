import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import type { ProductKey } from "@/components/SteelViewer";

const SteelViewer = lazy(() => import("@/components/SteelViewer"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forge Steel — Structural Steel Products in 3D" },
      { name: "description", content: "Explore TMT rebars, I-beams, pipes, angles, channels and roofing sheets in an interactive 3D viewer." },
      { property: "og:title", content: "Forge Steel — Structural Steel Products in 3D" },
      { property: "og:description", content: "Interactive 3D catalogue of premium steel products built for Nepal's infrastructure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PRODUCTS: { key: ProductKey; name: string; tag: string; desc: string; specs: [string, string][] }[] = [
  { key: "rebar", name: "TMT Rebar", tag: "Fe 500D", desc: "Thermo-mechanically treated bars with high ductility and earthquake resistance.", specs: [["Diameter", "8–32 mm"], ["Length", "12 m"], ["Grade", "Fe 500 / 500D"]] },
  { key: "ibeam", name: "I-Beam", tag: "ISMB", desc: "Hot-rolled structural beams for frames, bridges and heavy-load construction.", specs: [["Depth", "100–600 mm"], ["Length", "6 / 12 m"], ["Standard", "IS 2062"]] },
  { key: "pipe", name: "Steel Pipe", tag: "ERW / GI", desc: "Round hollow sections for plumbing, scaffolding and structural use.", specs: [["OD", "15–200 mm"], ["Wall", "1.6–6 mm"], ["Finish", "Black / Galvanized"]] },
  { key: "angle", name: "Angle Bar", tag: "Equal L", desc: "Versatile L-sections for towers, trusses, frames and fabrication.", specs: [["Size", "25–200 mm"], ["Thickness", "3–20 mm"], ["Length", "6 m"]] },
  { key: "channel", name: "Channel", tag: "ISMC", desc: "C-sections offering rigidity for purlins, supports and machinery bases.", specs: [["Depth", "75–400 mm"], ["Flange", "40–100 mm"], ["Length", "6 / 12 m"]] },
  { key: "sheet", name: "Roofing Sheet", tag: "CGI", desc: "Corrugated galvanized sheets that stand up to monsoon and mountain weather.", specs: [["Thickness", "0.25–0.8 mm"], ["Width", "800–1050 mm"], ["Coating", "Zn 120–275 g/m²"]] },
];

function Viewer({ kind }: { kind: ProductKey }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <SteelViewer kind={kind} />
    </Suspense>
  );
}

function Index() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active] ?? PRODUCTS[0]!;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-molten text-primary-foreground">F</span>
            FORGE<span className="text-primary">STEEL</span>
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#viewer" className="hover:text-foreground">3D Viewer</a>
            <a href="#products" className="hover:text-foreground">Products</a>
            <a href="#about" className="hover:text-foreground">About</a>
          </nav>
          <a href="#contact" className="rounded-full bg-molten px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow">Get a Quote</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative grid-lines pt-16">
        <div className="absolute inset-0 stage" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Made in Nepal · Since 1995
            </p>
            <h1 className="text-5xl font-bold leading-[0.95] md:text-7xl">
              <span className="text-steel-gradient">Strength you can</span>
              <br />
              <span className="text-molten">see from every angle.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Rebars, beams, pipes and sheets engineered for the Himalayas. Spin, zoom and inspect every product in real-time 3D.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#viewer" className="rounded-full bg-molten px-7 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">Explore in 3D</a>
              <a href="#products" className="rounded-full border border-border px-7 py-3 font-semibold hover:bg-accent">View Catalogue</a>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {[["30+", "Years"], ["1M+", "Tonnes"], ["77", "Districts"]].map(([n, l]) => (
                <div key={l}><div className="font-display text-3xl font-bold">{n}</div><div className="text-sm text-muted-foreground">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="relative h-[420px] lg:h-[560px]">
            <Viewer kind="ibeam" />
            <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-muted-foreground">Drag to rotate</span>
          </div>
        </div>
      </section>

      {/* Viewer */}
      <section id="viewer" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Interactive Showroom</p>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">The 3D product viewer</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Pick a product, drag to rotate, scroll to zoom. Every profile is modeled to its real section.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr_300px]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col">
            {PRODUCTS.map((x, i) => (
              <button
                key={x.key}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-xl px-4 py-3 text-left transition-all ${i === active ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-accent"}`}
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">0{i + 1} · {x.tag}</div>
                <div className="font-display font-semibold">{x.name}</div>
              </button>
            ))}
          </div>

          <div className="relative h-[460px] lg:h-[560px]">
            <Viewer key={p.key} kind={p.key} />
            <div className="pointer-events-none absolute left-5 top-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">Model / {p.name}</div>
          </div>

          <div className="p-1 lg:pl-6">
            <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary">{p.tag}</span>
            <h3 className="mt-4 text-3xl font-bold">{p.name}</h3>
            <p className="mt-3 text-muted-foreground">{p.desc}</p>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {p.specs.map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="font-mono">{v}</dd></div>
              ))}
            </dl>
            <a href="#contact" className="mt-6 block rounded-full bg-molten py-3 text-center font-semibold text-primary-foreground">Request Price</a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-bold md:text-5xl">Full catalogue</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((x, i) => (
              <button
                key={x.key}
                onClick={() => { setActive(i); document.getElementById("viewer")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group border-t border-border pt-6 text-left transition-colors hover:text-primary"
              >
                <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
                <h3 className="mt-6 text-2xl font-bold">{x.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{x.desc}</p>
                <div className="mt-6 text-sm font-semibold text-primary">View in 3D →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-border py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
          {[["Certified quality", "NS & IS certified mills with batch-level lab testing."], ["Seismic ready", "Fe 500D rebars engineered for high-ductility zones."], ["Nationwide delivery", "Dealer network reaching every province of Nepal."]].map(([t, d]) => (
            <div key={t}><div className="mb-4 h-1 w-12 bg-molten" /><h3 className="text-xl font-bold">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 stage" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold md:text-6xl"><span className="text-steel-gradient">Ready to build</span> <span className="text-molten">stronger?</span></h2>
          <p className="mt-4 text-muted-foreground">Talk to our sales team for bulk pricing and project supply.</p>
          <a href="mailto:sales@forgesteel.com.np" className="mt-8 inline-block rounded-full bg-molten px-8 py-4 font-semibold text-primary-foreground shadow-glow">sales@forgesteel.com.np</a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">© 2026 Forge Steel · Kathmandu, Nepal</footer>
    </div>
  );
}
