"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/components/ui/ToastProvider";
import { products } from "@/lib/products";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, openCart } = useCartStore();
  const { showToast } = useToast();

  const handleMoveToCart = (item: (typeof wishlist)[0]) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.weights[0].price,
      image: product.images[0],
      weight: product.weights[0].label,
      quantity: 1,
      slug: product.slug,
    });
    removeFromWishlist(item.id);
    openCart();
    showToast(`${item.name} moved to cart!`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-red-200" aria-hidden="true" />
        </div>
        <h1 className="font-playfair text-3xl font-bold text-charcoal mb-3">
          Your Wishlist is Empty
        </h1>
        <p className="font-lato text-charcoal/60 mb-8">
          Save products you love by clicking the heart icon.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-forest text-cream font-lato font-bold px-8 py-4 rounded-full hover:bg-forest-dark transition-colors"
        >
          Explore Products <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-forest py-12 px-4 text-center">
        <h1 className="font-playfair text-4xl font-bold text-cream">
          My Wishlist ({wishlist.length})
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlist.map((item) => (
            <article
              key={item.id}
              className="bg-cream-light rounded-2xl overflow-hidden shadow-product hover:shadow-card-hover transition-all duration-300"
            >
              <div className="relative aspect-square bg-forest/5">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x400/2D5016/FAF7F0?text=GN";
                  }}
                />
                <button
                  onClick={() => {
                    removeFromWishlist(item.id);
                    showToast("Removed from wishlist", "info");
                  }}
                  className="absolute top-3 right-3 w-9 h-9 bg-cream/80 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors text-charcoal/60"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="p-4">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-playfair font-bold text-charcoal hover:text-forest transition-colors line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-xs text-charcoal/50 font-lato mb-3">{item.weight}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-playfair font-bold text-charcoal text-lg">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex items-center gap-1.5 bg-forest text-cream text-xs font-bold px-3 py-2 rounded-full hover:bg-forest-dark transition-colors"
                    aria-label={`Move ${item.name} to cart`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
