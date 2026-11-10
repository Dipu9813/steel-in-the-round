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
