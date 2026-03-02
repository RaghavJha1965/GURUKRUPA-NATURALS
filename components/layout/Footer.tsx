"use client";

import Link from "next/link";
import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Black Garlic", href: "/products?category=black-garlic" },
    { label: "Herbal Teas", href: "/products?category=herbal-teas" },
    { label: "Ayurvedic", href: "/products?category=ayurvedic" },
    { label: "Bestsellers", href: "/products?filter=bestseller" },
    { label: "New Arrivals", href: "/products?filter=new" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#story" },
    { label: "Certifications", href: "/about#certifications" },
    { label: "Blog & Health Tips", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Return & Refund", href: "/return-policy" },
    { label: "Track Order", href: "/order-tracking" },
    { label: "WhatsApp Support", href: "https://wa.me/919999999999" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const certifications = [
  { label: "FSSAI Certified", icon: "🏛️" },
  { label: "Organic India", icon: "🌿" },
  { label: "Non-GMO", icon: "✅" },
  { label: "Lab Tested", icon: "🔬" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 font-lato" role="contentinfo">
      {/* Newsletter Section */}
      <div className="bg-forest py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl text-cream font-bold">
              Join the Natural Living Community
            </h2>
            <p className="text-cream/70 mt-1 text-sm">
              Get wellness tips, exclusive offers, and early access to new products.
            </p>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              aria-label="Email address for newsletter"
              className="px-4 py-3 rounded-full bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:border-turmeric w-full sm:w-72 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-turmeric text-charcoal font-bold rounded-full hover:bg-turmeric-dark transition-colors whitespace-nowrap text-sm"
            >
              Subscribe Free
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="GURUKRUPA NATURALS">
              <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center">
                <Leaf className="w-7 h-7 text-cream" aria-hidden="true" />
              </div>
              <div>
                <p className="font-playfair font-bold text-cream text-xl leading-tight">
                  GURUKRUPA
                </p>
                <p className="font-lato text-turmeric text-xs tracking-widest uppercase">
                  Naturals
                </p>
              </div>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed mb-6 max-w-xs">
              Rooted in nature, guided by tradition. We bring you the purest
              organic superfoods, sourced directly from Indian farms with love
              and respect for the Earth.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2 text-cream/60 hover:text-turmeric transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                +91 99999 99999
              </a>
              <a
                href="mailto:hello@gurukrupanaturals.com"
                className="flex items-center gap-2 text-cream/60 hover:text-turmeric transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                hello@gurukrupanaturals.com
              </a>
              <p className="flex items-start gap-2 text-cream/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                123 Organic Valley, Pune, Maharashtra 411001
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {[
                { href: "#", Icon: Instagram, label: "Instagram" },
                { href: "#", Icon: Facebook, label: "Facebook" },
                { href: "#", Icon: Youtube, label: "YouTube" },
                { href: "#", Icon: Twitter, label: "Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-forest transition-colors"
                  aria-label={`Follow us on ${label}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-lato font-bold text-cream text-sm uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-turmeric transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-lato font-bold text-cream text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-turmeric transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-lato font-bold text-cream text-sm uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-turmeric transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <p className="text-xs text-cream/40 uppercase tracking-wider mb-4 font-bold">
            Certifications & Trust
          </p>
          <div className="flex flex-wrap gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.label}
                className="flex items-center gap-2 bg-cream/5 border border-cream/10 rounded-lg px-3 py-2"
              >
                <span aria-hidden="true">{cert.icon}</span>
                <span className="text-xs text-cream/60 font-medium">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-cream/10">
          <div className="flex flex-wrap gap-4 text-xs text-cream/40">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-cream/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} GURUKRUPA NATURALS. All rights reserved.
            <span className="ml-2">Made with ❤️ in India 🇮🇳</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
