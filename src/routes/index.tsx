import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout, Catalogue, furnitureHead } from "@/components/FurnitureSite";
export const Route = createFileRoute("/")({ head: () => furnitureHead("New Yes Steel Furniture Udhyog", "Explore steel furniture for homes, offices and businesses in Nepal through the New Yes Steel interactive furniture catalogue."), component: Home });
function Home() {
  return <SiteLayout>
    <section id="home" className="site-width hero-section py-16">
      <div className="min-w-0"><p className="eyebrow">New Yes Steel Furniture Udhyog</p><h1 className="hero-title mt-4 font-semibold">Quality Furniture.<br /><span className="text-secondary">Designed for Everyday Living.</span></h1><div className="mt-6 flex flex-wrap items-center gap-4"><Button asChild className="shadow-none"><Link to="/" hash="products">Explore Products <ArrowRight /></Link></Button><Button asChild variant="outline" className="shadow-none"><Link to="/" hash="contact">Contact Us <ArrowUpRight /></Link></Button></div></div>
    </section>
    <section id="products" className="site-width border-t border-border py-14"><p className="eyebrow">The furniture collection</p><Catalogue /></section>
    <section id="about" className="site-width border-t border-border py-14"><p className="eyebrow">About Us</p><div className="mt-5 grid gap-8 md:grid-cols-2"><h2 className="text-3xl font-semibold leading-snug">New Yes Steel<br /><span className="text-secondary">Furniture Udhyog</span></h2><div className="space-y-5 text-sm leading-7 text-muted-foreground"><p>New Yes Steel Furniture Udhyog is a steel furniture business in Nepal for homes and workplaces.</p><p>Our collection includes storage, beds, seating and office furniture.</p><Button asChild variant="link" className="px-0 text-secondary"><Link to="/" hash="contact">Talk to us <ArrowUpRight /></Link></Button></div></div></section>
    <section id="contact" className="contact-section site-width border-t border-border py-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
        <div className="md:pt-1">
          <p className="contact-label">Contact</p>
          <h2 className="contact-heading mt-3">Visit our showroom</h2>
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="contact-name">New Yes Steel Furniture Udhyog</h3>
            <p className="contact-body mt-2">Dhalebar, Madhesh Province, Nepal</p>
            <p className="contact-body contact-muted mt-5 max-w-sm">Find the showroom on the map, or open it in Google Maps for directions.</p>
            <a className="contact-link mt-5 inline-block" href="https://maps.app.goo.gl/7T6zVyuDT5pT1pAM7" target="_blank" rel="noreferrer">Open in Google Maps →</a>
          </div>
        </div>
        <div className="showroom-map"><iframe src="https://www.google.com/maps?q=26.9294622,85.9543608&z=19&output=embed" title="Google Map showing the precise location of New Yes Steel Furniture Udhyog" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
      </div>
    </section>
  </SiteLayout>;
}
