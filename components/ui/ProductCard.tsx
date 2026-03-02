"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/components/ui/ToastProvider";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

export default function ProductCard({ product, showQuickView = true }: ProductCardProps) {
  const { addToCart, openCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useCartStore();
  const { showToast } = useToast();

  const defaultWeight = product.weights[0];
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: defaultWeight.price,
      originalPrice: defaultWeight.originalPrice,
      image: product.images[0],
      weight: defaultWeight.label,
      quantity: 1,
      slug: product.slug,
    });
    openCart();
    showToast(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const inWishlist = isInWishlist(product.id);
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
        weight: defaultWeight.label,
      });
      showToast("Added to wishlist ❤️");
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <article className="group bg-cream-light rounded-2xl overflow-hidden shadow-product hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              product.badge === "Bestseller"
                ? "bg-turmeric text-charcoal"
                : product.badge === "New Arrival"
                ? "bg-forest text-cream"
                : product.badge === "Top Rated"
                ? "bg-earth text-cream"
                : "bg-charcoal text-cream"
            }`}
          >
            {product.badge}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center hover:bg-cream shadow-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            inWishlist ? "fill-red-500 text-red-500" : "text-charcoal/60"
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="block"
        aria-label={`View ${product.name} details`}
      >
        <div className="product-img-container relative aspect-square bg-forest/5">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/400x400/2D5016/FAF7F0?text=GN";
            }}
          />

          {/* Quick view overlay */}
          {showQuickView && (
            <div className="absolute inset-0 bg-charcoal/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="flex items-center gap-2 bg-cream/90 backdrop-blur-sm text-charcoal text-xs font-bold px-4 py-2 rounded-full">
                <Eye className="w-3 h-3" aria-hidden="true" />
                Quick View
              </span>
            </div>
          )}

          {/* Stock indicator */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-cream/70 flex items-center justify-center">
              <span className="bg-charcoal text-cream text-sm font-bold px-4 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-earth font-lato font-bold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-playfair font-bold text-charcoal text-base leading-tight line-clamp-2 hover:text-forest transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-charcoal/50 font-lato mb-2">
          {defaultWeight.label}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3" aria-label={`Rating: ${product.rating} out of 5`}>
          <div className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-turmeric text-turmeric"
                    : "text-charcoal/20"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-charcoal/50 font-lato">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="font-playfair font-bold text-charcoal text-lg">
              ₹{defaultWeight.price.toLocaleString("en-IN")}
            </span>
            {defaultWeight.originalPrice && (
              <span className="text-xs text-charcoal/40 line-through ml-1.5">
                ₹{defaultWeight.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-1.5 bg-forest text-cream text-xs font-bold px-3 py-2 rounded-full hover:bg-forest-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
