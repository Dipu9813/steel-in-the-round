import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, Catalogue, Showroom, SectionHeader, furnitureHead } from "@/components/FurnitureSite";
import { siteConfig } from "@/config/site";
export const Route = createFileRoute("/")({ head: () => furnitureHead("Steel Furniture Manufacturer in Dhalkebar, Nepal | New Yes Steel Furniture Udhyog", "New Yes Steel Furniture Udhyog manufactures steel furniture for homes, offices and businesses in Dhalkebar, Nepal."), component: Home });
function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: siteConfig.businessName,
    address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressLocality: "Dhalkebar", addressCountry: "NP" },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: siteConfig.siteUrl,
    openingHours: siteConfig.openingHours,
    hasMap: siteConfig.mapsUrl,
  };
  return <SiteLayout>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <section id="home" className="site-width hero-section pt-6 pb-16">
      <div className="hero-grid">
        <div className="min-w-0"><p className="eyebrow">New Yes Steel Furniture Udhyog</p><h1 className="hero-title mt-4 font-semibold">Quality Furniture.<br /><span className="text-secondary">Designed for Everyday Living.</span></h1><div className="mt-6 flex flex-wrap items-center gap-4"><Button asChild className="shadow-none"><Link to="/" hash="products">Explore Products <ArrowRight /></Link></Button><Button asChild variant="outline" className="shadow-none"><Link to="/" hash="contact">Contact Us <ArrowUpRight /></Link></Button></div></div>
        <div className="hero-model"><Showroom hero initial="almirah1" /></div>
      </div>
    </section>
    <section id="products" className="site-width site-section border-t border-border"><SectionHeader title="The furniture collection" /><Catalogue /></section>
    <section id="about" className="site-width site-section about-section border-t border-border">
      <div className="about-panel mt-5">
        <div className="about-grid">
          <div className="about-content">
            <p className="about-kicker">Welcome to New Yes Steel</p>
            <h2 className="about-heading mt-3">Two Decades of Steel Furniture Craftsmanship</h2>
            <div className="about-copy mt-4 space-y-4">
              <p>For more than 20 years, New Yes Steel Furniture Udhyog has created durable, elegant steel furniture for homes, offices, and businesses. Our products combine practical design with dependable craftsmanship for spaces built to last.</p>
              <p>Using German powder-coating technology and specialized chemical pre-treatment, we deliver smooth finishes, stronger protection, and lasting performance across more than 100 unique designs.</p>
            </div>
            <blockquote className="about-quote">“Great furniture is not just about appearance — it is about quality that lasts.”</blockquote>
            <div className="about-stats">
              <div><p className="about-stat">20+</p><p className="about-stat-label">Years of Experience</p></div>
              <div><p className="about-stat">100+</p><p className="about-stat-label">Unique Designs</p></div>
            </div>
            <div className="about-actions">
              <Button asChild variant="link" className="about-read-more shadow-none"><Link to="/" hash="contact">Our Story <ArrowUpRight /></Link></Button>
              <Button asChild className="about-catalogue shadow-none"><Link to="/" hash="products">Request a Catalogue <ArrowRight /></Link></Button>
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
    <section id="contact" className="contact-section site-width site-section border-t border-border">
      <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8">
        <div className="md:pt-1">
          <p className="contact-label">Contact</p>
          <h2 className="contact-heading mt-3">Visit our showroom</h2>
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="contact-name">New Yes Steel Furniture Udhyog</h3>
            <p className="contact-body mt-2">{siteConfig.address}</p>
            <p className="contact-body contact-muted mt-5 max-w-sm">Find the showroom on the map, or open it in Google Maps for directions.</p>
            <div className="mt-5 space-y-2">
              <p className="contact-body">Open {siteConfig.openingHours}</p>
              <p className="contact-body"><a className="contact-link" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a> · <a className="contact-link break-all" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
              <a className="contact-link inline-block" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps →</a>
            </div>
          </div>
        </div>
        <div className="showroom-map"><iframe src="https://www.google.com/maps?q=26.9294622,85.9543608&z=19&output=embed" title="Google Map showing the precise location of New Yes Steel Furniture Udhyog" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
      </div>
    </section>
  </SiteLayout>;
}
