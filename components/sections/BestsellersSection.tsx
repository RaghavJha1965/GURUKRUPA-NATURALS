import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { getBestsellers } from "@/lib/products";

export default function BestsellersSection() {
  const bestsellers = getBestsellers();

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-cream"
      aria-labelledby="bestsellers-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-2">
              Customer Favourites
            </p>
            <h2
              id="bestsellers-heading"
              className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal heading-underline"
            >
              Bestsellers
            </h2>
          </div>
          <Link
            href="/products?filter=bestseller"
            className="hidden sm:flex items-center gap-1 text-forest font-lato font-bold text-sm hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Products Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          role="list"
          aria-label="Bestselling products"
        >
          {bestsellers.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products?filter=bestseller"
            className="inline-flex items-center gap-2 text-forest font-lato font-bold border-2 border-forest px-6 py-3 rounded-full hover:bg-forest hover:text-cream transition-colors"
          >
            View All Bestsellers <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
