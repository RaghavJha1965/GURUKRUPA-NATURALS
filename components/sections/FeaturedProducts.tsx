"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const products = getFeaturedProducts();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-cream"
      aria-labelledby="featured-products-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-2">
              Featured Collection
            </p>
            <h2
              id="featured-products-heading"
              className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal heading-underline"
            >
              Nature&apos;s Finest
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Navigation arrows */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-cream-dark border border-forest/10 flex items-center justify-center text-charcoal hover:bg-forest hover:text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed hidden sm:flex"
              aria-label="Scroll products left"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-cream-dark border border-forest/10 flex items-center justify-center text-charcoal hover:bg-forest hover:text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed hidden sm:flex"
              aria-label="Scroll products right"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-forest font-lato font-bold text-sm hover:underline"
              aria-label="View all products"
            >
              View All <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="list"
          aria-label="Featured products"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="scroll-snap-start flex-shrink-0 w-64 sm:w-72"
              role="listitem"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-forest font-lato font-bold border-2 border-forest px-6 py-3 rounded-full hover:bg-forest hover:text-cream transition-colors"
          >
            View All Products <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
