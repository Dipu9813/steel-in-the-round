import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, Catalogue, Showroom, furnitureHead } from "@/components/FurnitureSite";
export const Route = createFileRoute("/")({ head: () => furnitureHead("New Yes Steel Furniture Udhyog", "Explore steel furniture for homes, offices and businesses in Nepal through the New Yes Steel interactive furniture catalogue."), component: Home });
function Home() {
  return <SiteLayout>
    <section id="home" className="site-width hero-section py-16">
      <div className="hero-grid">
        <div className="min-w-0"><p className="eyebrow">New Yes Steel Furniture Udhyog</p><h1 className="hero-title mt-4 font-semibold">Quality Furniture.<br /><span className="text-secondary">Designed for Everyday Living.</span></h1><div className="mt-6 flex flex-wrap items-center gap-4"><Button asChild className="shadow-none"><Link to="/" hash="products">Explore Products <ArrowRight /></Link></Button><Button asChild variant="outline" className="shadow-none"><Link to="/" hash="contact">Contact Us <ArrowUpRight /></Link></Button></div></div>
        <div className="hero-model"><Showroom hero initial="almirah" /></div>
      </div>
    </section>
    <section id="products" className="site-width border-t border-border py-14"><p className="eyebrow">The furniture collection</p><Catalogue /></section>
    <section id="about" className="about-section site-width border-t border-border py-14">
      <div className="about-panel mt-5">
        <div className="about-grid">
          <div className="about-content">
            <p className="about-kicker">Welcome to New Yes Steel</p>
            <h2 className="about-heading mt-3">Two Decades of Steel Furniture Craftsmanship</h2>
            <div className="about-copy mt-5 space-y-4">
              <p>For more than 20 years, New Yes Steel Furniture Udhyog has created durable, elegant steel furniture for homes, offices, and businesses. Our products combine practical design with dependable craftsmanship for spaces built to last.</p>
              <p>Using German powder-coating technology and specialized chemical pre-treatment, we deliver smooth finishes, stronger protection, and lasting performance across more than 100 unique designs.</p>
            </div>
            <blockquote className="about-quote">“Great furniture is not just about appearance — it is about quality that lasts.”</blockquote>
            <div className="about-stats">
              <div><p className="about-stat">20+</p><p className="about-stat-label">Years of Experience</p></div>
              <div><p className="about-stat">100+</p><p className="about-stat-label">Unique Designs</p></div>
            </div>
            <div className="about-actions">
              <Button asChild className="about-read-more shadow-none"><Link to="/" hash="contact">Our Story <ArrowUpRight /></Link></Button>
              <Button asChild variant="outline" className="about-catalogue shadow-none"><Link to="/" hash="products">Request a Catalogue <ArrowRight /></Link></Button>
            </div>
          </div>
          <figure className="about-figure">
            <div className="about-image-frame">
              <img src="/images/about-storefront-1300x440.webp" alt="New Yes Steel Furniture Udhyog showroom storefront" width={1300} height={440} loading="lazy" decoding="async" />
            </div>
            <figcaption>Our showroom and factory outlet</figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section id="contact" className="contact-section site-width border-t border-border py-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
        <div className="md:pt-1">
          <p className="contact-label">Contact</p>
          <h2 className="contact-heading mt-3">Visit our showroom</h2>
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="contact-name">New Yes Steel Furniture Udhyog</h3>
            <p className="contact-body mt-2">Dhalkebar, Madhesh Province, Nepal</p>
            <p className="contact-body contact-muted mt-5 max-w-sm">Find the showroom on the map, or open it in Google Maps for directions.</p>
            <a className="contact-link mt-5 inline-block" href="https://maps.app.goo.gl/7T6zVyuDT5pT1pAM7" target="_blank" rel="noreferrer">Open in Google Maps →</a>
          </div>
        </div>
        <div className="showroom-map"><iframe src="https://www.google.com/maps?q=26.9294622,85.9543608&z=19&output=embed" title="Google Map showing the precise location of New Yes Steel Furniture Udhyog" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
      </div>
    </section>
  </SiteLayout>;
}
