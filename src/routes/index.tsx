import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Clock3, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, Catalogue, Showroom, SectionHeader, furnitureHead } from "@/components/FurnitureSite";
import { siteConfig } from "@/config/site";
import { PRODUCTS } from "@/lib/furniture";
export const Route = createFileRoute("/")({ head: () => furnitureHead("Steel Furniture Manufacturer in Dhalkebar, Nepal | New Yes Steel Furniture Udhyog", "New Yes Steel Furniture Udhyog manufactures steel almirahs, wardrobes, beds, chairs, office furniture and storage products in Dhalkebar, Dhanusha, Nepal."), component: Home });
function Home() {
  const businessId = `${siteConfig.siteUrl}/#business`;
  const productList = PRODUCTS.map((product) => ({
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => `${siteConfig.siteUrl}${image}`),
    category: product.category,
    brand: { "@type": "Brand", name: siteConfig.businessName },
    manufacturer: { "@id": businessId },
    url: `${siteConfig.siteUrl}/#products`,
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["FurnitureStore", "LocalBusiness"],
        "@id": businessId,
        name: siteConfig.businessName,
        description: "Steel furniture manufacturer and showroom in Dhalkebar, Dhanusha, Nepal.",
        image: `${siteConfig.siteUrl}/new-yes-steel-logo.png`,
        logo: `${siteConfig.siteUrl}/new-yes-steel-logo.png`,
        address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressLocality: "Dhalkebar", addressRegion: "Dhanusha", addressCountry: "NP" },
        geo: { "@type": "GeoCoordinates", latitude: siteConfig.latitude, longitude: siteConfig.longitude },
        telephone: siteConfig.phone,
        email: siteConfig.email,
        url: siteConfig.siteUrl,
        sameAs: [siteConfig.mapsUrl],
        openingHours: siteConfig.openingHours,
        hasMap: siteConfig.mapsUrl,
        areaServed: { "@type": "Country", name: "Nepal" },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.businessName,
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}/new-yes-steel-logo.png`,
        contactPoint: { "@type": "ContactPoint", telephone: siteConfig.phone, contactType: "sales", areaServed: "NP" },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        name: siteConfig.businessName,
        url: siteConfig.siteUrl,
        publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
        inLanguage: "en-NP",
      },
      {
        "@type": "ItemList",
        name: "Steel furniture collection",
        itemListElement: productList.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: product,
        })),
      },
    ],
  };
  return <SiteLayout>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <section id="home" className="site-width hero-section pt-6 pb-8">
      <div className="hero-grid">
        <div className="min-w-0"><p className="eyebrow">Steel furniture manufacturer in Nepal</p><h1 className="hero-title mt-4 font-semibold">New Yes Steel Furniture Udhyog</h1><p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">Quality steel furniture designed for everyday living, made in Dhalkebar for homes, offices and businesses.</p><div className="mt-6 flex flex-wrap items-center gap-4"><Button asChild className="shadow-none"><Link to="/" hash="products">Explore Products <ArrowRight /></Link></Button><Button asChild variant="outline" className="shadow-none"><Link to="/" hash="contact">Contact Us <ArrowUpRight /></Link></Button></div></div>
        <div className="hero-model"><Showroom hero initial="almirah1" /></div>
      </div>
    </section>
    <section id="products" className="site-width site-section border-t border-border"><SectionHeader title="New Yes Steel Furniture collection" lead="Explore steel almirahs, wardrobes, beds, seating, office furniture and storage designs from our Nepal catalogue." /><Catalogue /></section>
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
              <Button asChild variant="outline" className="about-read-more shadow-none"><Link to="/" hash="contact">Our Story <ArrowUpRight /></Link></Button>
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
    <section className="site-width site-section powder-section border-t border-border">
      <div className="powder-hero">
        <div className="powder-content">
          <p className="about-kicker">Our finishing process</p>
          <h2 className="section-title mt-3">The Benefits of Powder Coating for Steel Products</h2>
          <p className="powder-copy mt-5">At New Yes Steel Furniture Udhyog, we pride ourselves on the quality and durability of our steel products. One of the key processes that ensure our steel almirahs and other furniture stand the test of time is powder coating. But what exactly is powder coating, and why do we use it? Let's dive into the benefits of this superior finishing technique.</p>
        </div>
        <figure className="powder-figure">
          <div className="powder-image-frame">
            <img src="/images/powder-coating.jpe" alt="Powder-coated steel furniture finish" width={1151} height={768} loading="lazy" decoding="async" />
          </div>
          <figcaption>Illustrative powder-coating finish</figcaption>
        </figure>
      </div>
      <div className="powder-definition">
        <h2 className="section-title">What is Powder Coating?</h2>
        <p className="powder-copy mt-5">Powder coating is a dry finishing process that involves applying a fine powder of resin and pigment to a metal surface. Unlike traditional liquid paint, powder coating is applied electrostatically and then cured under heat. This process creates a hard, smooth, and durable finish that is both protective and aesthetically pleasing.</p>
      </div>
    </section>
    <section id="contact" className="contact-section site-width site-section border-t border-border">
      <div className="contact-grid">
        <div className="contact-info">
          <p className="contact-label">Contact</p>
          <h2 className="section-title contact-heading">Visit Our Showroom</h2>
          <div className="contact-details">
            <h3 className="contact-name">New Yes Steel Furniture Udhyog</h3>
            <p className="contact-intro">Visit us to explore durable steel furniture, practical designs, and finishes made for everyday living.</p>
            <div className="contact-links">
              <div className="contact-item"><MapPin aria-hidden="true" /><p>{siteConfig.address}</p></div>
              <div className="contact-item"><Clock3 aria-hidden="true" /><p>Sunday–Friday, 9:00 AM – 6:00 PM</p></div>
              <div className="contact-item"><Phone aria-hidden="true" /><a className="contact-link" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></div>
              <div className="contact-item"><Mail aria-hidden="true" /><a className="contact-link break-all" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
            </div>
            <Button asChild className="contact-directions shadow-none"><a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">Get Directions <Navigation aria-hidden="true" /></a></Button>
          </div>
        </div>
        <div className="showroom-map contact-map"><iframe src="https://www.google.com/maps?q=26.9294622,85.9543608&z=19&output=embed" title="Google Map showing the precise location of New Yes Steel Furniture Udhyog" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
      </div>
    </section>
  </SiteLayout>;
}
