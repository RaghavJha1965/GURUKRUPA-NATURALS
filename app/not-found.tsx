import Link from "next/link";
import { Leaf, ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Decorative */}
        <div className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-12 h-12 text-forest/40" aria-hidden="true" />
        </div>

        <h1 className="font-playfair text-8xl font-bold text-forest/20 mb-2">404</h1>
        <h2 className="font-playfair text-2xl font-bold text-charcoal mb-3">
          Page Not Found
        </h2>
        <p className="font-lato text-charcoal/60 mb-8">
          The page you&apos;re looking for seems to have wandered off into the forest.
          Let&apos;s guide you back!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-forest text-cream font-lato font-bold px-6 py-3 rounded-full hover:bg-forest-dark transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border-2 border-forest text-forest font-lato font-bold px-6 py-3 rounded-full hover:bg-forest/5 transition-colors"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Browse Products
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-10 text-left">
          <p className="font-lato font-bold text-charcoal text-sm uppercase tracking-wider mb-3">
            Popular Pages
          </p>
          <ul className="space-y-2">
            {[
              { label: "Shop All Products", href: "/products" },
              { label: "About GURUKRUPA NATURALS", href: "/about" },
              { label: "Health Tips & Blog", href: "/blog" },
              { label: "Contact Support", href: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-charcoal/60 hover:text-forest transition-colors font-lato text-sm"
                >
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
