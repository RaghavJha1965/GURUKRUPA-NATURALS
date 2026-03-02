"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle,
  Package,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  ChevronUp,
  Share2,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/components/ui/ToastProvider";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

const reviews = [
  {
    id: "1",
    author: "Priya S.",
    rating: 5,
    date: "Dec 12, 2024",
    title: "Exceptional quality!",
    text: "I've tried many brands but GURUKRUPA's quality is unmatched. You can taste the purity.",
    verified: true,
  },
  {
    id: "2",
    author: "Rajesh M.",
    rating: 5,
    date: "Nov 28, 2024",
    title: "Highly recommend",
    text: "Noticeable improvement in my energy levels within 3 weeks. Will definitely reorder.",
    verified: true,
  },
  {
    id: "3",
    author: "Ananya K.",
    rating: 4,
    date: "Nov 15, 2024",
    title: "Good product",
    text: "Great quality and fast delivery. The packaging is also very premium and eco-friendly.",
    verified: true,
  },
];

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "reviews">("description");
  const [expandedSection, setExpandedSection] = useState<string | null>("benefits");

  const { addToCart, openCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useCartStore();
  const { showToast } = useToast();

  const inWishlist = isInWishlist(product.id);
  const discountPercent = selectedWeight.originalPrice
    ? Math.round(((selectedWeight.originalPrice - selectedWeight.price) / selectedWeight.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedWeight.inStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: selectedWeight.price,
      originalPrice: selectedWeight.originalPrice,
      image: product.images[0],
      weight: selectedWeight.label,
      quantity,
      slug: product.slug,
    });
    openCart();
    showToast(`${product.name} (${selectedWeight.label}) added to cart!`);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: selectedWeight.price,
        image: product.images[0],
        slug: product.slug,
        weight: selectedWeight.label,
      });
      showToast("Added to wishlist ❤️");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "info");
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const imageSrc = (img: string) =>
    img.startsWith("http") ? img : `https://placehold.co/600x600/2D5016/FAF7F0?text=${encodeURIComponent(product.name.substring(0, 2))}`;

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-cream-dark py-3 px-4 border-b border-forest/5">
        <nav className="max-w-7xl mx-auto" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm font-lato text-charcoal/50">
            <li><Link href="/" className="hover:text-forest">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/products" className="hover:text-forest">Products</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/products?category=${product.category.toLowerCase().replace(/ /g, "-")}`} className="hover:text-forest">{product.category}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-charcoal truncate max-w-xs">{product.name}</li>
          </ol>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-forest/5">
              <Image
                src={imageSrc(product.images[selectedImage])}
                alt={`${product.name} — image ${selectedImage + 1}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-turmeric text-charcoal text-xs font-bold px-3 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3" role="tablist" aria-label="Product images">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    role="tab"
                    aria-selected={selectedImage === i}
                    aria-label={`View image ${i + 1}`}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-forest shadow-natural"
                        : "border-forest/10 hover:border-forest/30"
                    }`}
                  >
                    <Image
                      src={imageSrc(img)}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            {/* Category & Name */}
            <div>
              <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-2">
                {product.category}
              </p>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div
                className="flex gap-0.5"
                aria-label={`Rated ${product.rating} out of 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-turmeric text-turmeric"
                        : "text-charcoal/20"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-lato text-sm text-charcoal font-bold">
                {product.rating}
              </span>
              <span className="text-charcoal/40 text-sm">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Short Description */}
            <p className="font-lato text-charcoal/70 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Weight Options */}
            <div>
              <p className="font-lato font-bold text-charcoal text-sm mb-2">
                Size / Weight:
                <span className="font-normal text-charcoal/60 ml-2">
                  {selectedWeight.label}
                </span>
              </p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select weight">
                {product.weights.map((weight) => (
                  <button
                    key={weight.value}
                    onClick={() => setSelectedWeight(weight)}
                    role="radio"
                    aria-checked={selectedWeight.value === weight.value}
                    disabled={!weight.inStock}
                    className={`px-4 py-2 rounded-lg border-2 font-lato text-sm font-bold transition-all ${
                      selectedWeight.value === weight.value
                        ? "border-forest bg-forest text-cream"
                        : weight.inStock
                        ? "border-forest/20 text-charcoal hover:border-forest/50"
                        : "border-charcoal/10 text-charcoal/30 cursor-not-allowed line-through"
                    }`}
                  >
                    {weight.label}
                    {!weight.inStock && (
                      <span className="block text-xs font-normal">Out of stock</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-playfair text-4xl font-bold text-charcoal">
                ₹{selectedWeight.price.toLocaleString("en-IN")}
              </span>
              {selectedWeight.originalPrice && (
                <span className="font-lato text-xl text-charcoal/40 line-through">
                  ₹{selectedWeight.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2.5 py-0.5 rounded-full">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {selectedWeight.inStock ? (
                <>
                  <CheckCircle className="w-4 h-4 text-forest" aria-hidden="true" />
                  <span className="text-forest font-lato font-bold text-sm">In Stock</span>
                </>
              ) : (
                <span className="text-red-500 font-lato font-bold text-sm">Out of Stock</span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 flex-wrap">
              {/* Quantity */}
              <div className="flex items-center border border-forest/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-charcoal hover:bg-forest/5 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" aria-hidden="true" />
                </button>
                <span
                  className="px-4 py-3 font-bold text-charcoal text-base min-w-[3rem] text-center"
                  aria-live="polite"
                  aria-label={`Quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-charcoal hover:bg-forest/5 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedWeight.inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-forest text-cream font-lato font-bold py-3 px-6 rounded-xl hover:bg-forest-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                aria-label={`Add ${product.name} ${selectedWeight.label} to cart`}
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-xl border-2 transition-all ${
                  inWishlist
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-forest/20 text-charcoal hover:border-forest/50"
                }`}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={inWishlist}
              >
                <Heart
                  className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="p-3 rounded-xl border-2 border-forest/20 text-charcoal hover:border-forest/50 transition-colors"
                aria-label="Share product"
              >
                <Share2 className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-forest/10">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Above ₹999" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                { icon: Shield, label: "Secure Payment", sub: "Razorpay / UPI" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 text-forest mx-auto mb-1" aria-hidden="true" />
                  <p className="font-lato font-bold text-charcoal text-xs">{label}</p>
                  <p className="font-lato text-charcoal/50 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Info Tabs */}
        <div className="mt-16">
          {/* Tab Navigation */}
          <div
            className="flex gap-1 bg-cream-dark rounded-xl p-1 max-w-lg mb-8"
            role="tablist"
            aria-label="Product information"
          >
            {(["description", "nutrition", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`tab-${tab}`}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-lato font-bold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-forest text-cream shadow-sm"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                {tab === "nutrition" ? "Nutrition" : tab === "reviews" ? `Reviews (${product.reviewCount})` : "Details"}
              </button>
            ))}
          </div>

          {/* Description Tab */}
          {activeTab === "description" && (
            <div
              id="tab-description"
              role="tabpanel"
              aria-label="Product details"
              className="space-y-6"
            >
              {/* Description */}
              <div className="bg-cream-light rounded-2xl p-6">
                <h2 className="font-playfair font-bold text-charcoal text-xl mb-3">About this product</h2>
                <p className="font-lato text-charcoal/70 leading-relaxed">{product.description}</p>
              </div>

              {/* Benefits Accordion */}
              {[
                {
                  id: "benefits",
                  title: "Health Benefits",
                  content: (
                    <ul className="space-y-2">
                      {product.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="font-lato text-charcoal/70 text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  id: "ingredients",
                  title: "Ingredients",
                  content: (
                    <p className="font-lato text-charcoal/70 text-sm leading-relaxed">{product.ingredients}</p>
                  ),
                },
                {
                  id: "howToUse",
                  title: "How to Use",
                  content: (
                    <div className="flex gap-3">
                      <Package className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="font-lato text-charcoal/70 text-sm leading-relaxed">{product.howToUse}</p>
                    </div>
                  ),
                },
              ].map(({ id, title, content }) => (
                <div
                  key={id}
                  className="bg-cream-light rounded-2xl overflow-hidden border border-forest/5"
                >
                  <button
                    onClick={() => toggleSection(id)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                    aria-expanded={expandedSection === id}
                    aria-controls={`section-${id}`}
                  >
                    <h3 className="font-playfair font-bold text-charcoal text-base">{title}</h3>
                    {expandedSection === id ? (
                      <ChevronUp className="w-5 h-5 text-forest" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-charcoal/40" aria-hidden="true" />
                    )}
                  </button>
                  {expandedSection === id && (
                    <div
                      id={`section-${id}`}
                      className="px-6 pb-5"
                    >
                      {content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Nutrition Tab */}
          {activeTab === "nutrition" && (
            <div
              id="tab-nutrition"
              role="tabpanel"
              aria-label="Nutritional information"
              className="bg-cream-light rounded-2xl p-6 max-w-lg"
            >
              <h2 className="font-playfair font-bold text-charcoal text-xl mb-4">
                Nutritional Information
              </h2>
              <p className="text-sm text-charcoal/60 font-lato mb-4">
                Serving size: {product.nutritionalInfo.servingSize}
              </p>
              <table className="w-full" aria-label="Nutritional values">
                <tbody className="divide-y divide-forest/5">
                  {Object.entries(product.nutritionalInfo)
                    .filter(([key]) => key !== "servingSize")
                    .map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-2.5 font-lato text-sm text-charcoal capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </td>
                        <td className="py-2.5 font-lato font-bold text-sm text-charcoal text-right">
                          {value}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <p className="text-xs text-charcoal/40 mt-4 font-lato">
                *Approximate values. Actual nutritional content may vary by batch.
              </p>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div
              id="tab-reviews"
              role="tabpanel"
              aria-label="Customer reviews"
              className="space-y-4"
            >
              {/* Rating Summary */}
              <div className="bg-cream-light rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-6">
                <div className="text-center">
                  <p className="font-playfair text-6xl font-bold text-charcoal">{product.rating}</p>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-turmeric text-turmeric" : "text-charcoal/20"}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-charcoal/50 text-sm mt-1 font-lato">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3 mb-1.5">
                      <span className="text-xs font-lato text-charcoal/60 w-3">{star}</span>
                      <Star className="w-3 h-3 fill-turmeric text-turmeric" aria-hidden="true" />
                      <div className="flex-1 bg-cream-dark rounded-full h-2">
                        <div
                          className="bg-turmeric h-2 rounded-full"
                          style={{ width: `${star === 5 ? 75 : star === 4 ? 15 : 5}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              {reviews.map((review) => (
                <article key={review.id} className="bg-cream-light rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-lato font-bold text-charcoal">{review.author}</p>
                      {review.verified && (
                        <p className="text-xs text-forest font-lato flex items-center gap-1 mt-0.5">
                          <CheckCircle className="w-3 h-3" aria-hidden="true" />
                          Verified Purchase
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-charcoal/40 font-lato">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5 mb-2" aria-label={`Rated ${review.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-turmeric text-turmeric" : "text-charcoal/20"}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="font-playfair font-bold text-charcoal mb-1">{review.title}</p>
                  <p className="font-lato text-charcoal/70 text-sm leading-relaxed">{review.text}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16" aria-labelledby="related-products-heading">
            <h2
              id="related-products-heading"
              className="font-playfair text-3xl font-bold text-charcoal mb-8"
            >
              You May Also Like
            </h2>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
              role="list"
            >
              {relatedProducts.map((p) => (
                <div key={p.id} role="listitem">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-cream border-t border-forest/10 px-4 py-3 flex gap-3 z-50 shadow-lg">
        <button
          onClick={handleWishlist}
          className={`p-3 rounded-xl border-2 ${inWishlist ? "border-red-400 bg-red-50 text-red-500" : "border-forest/20 text-charcoal"}`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`} aria-hidden="true" />
        </button>
        <button
          onClick={handleAddToCart}
          disabled={!selectedWeight.inStock}
          className="flex-1 flex items-center justify-center gap-2 bg-forest text-cream font-lato font-bold py-3 rounded-xl hover:bg-forest-dark transition-colors disabled:opacity-50"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="w-5 h-5" aria-hidden="true" />
          Add to Cart — ₹{selectedWeight.price.toLocaleString("en-IN")}
        </button>
      </div>
    </div>
  );
}
