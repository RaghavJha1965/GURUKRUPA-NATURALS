"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/ui/ProductCard";
import { getBestsellers } from "@/lib/products";
import { useState } from "react";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getDiscountedTotal,
    clearCart,
    promoCode,
    discount,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const subtotal = getCartTotal();
  const discountedTotal = getDiscountedTotal();
  const shipping = subtotal >= 999 ? 0 : 79;
  const total = discountedTotal + shipping;
  const savings = subtotal - discountedTotal;

  const bestsellers = getBestsellers().slice(0, 4);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (!success) setPromoError("Invalid promo code. Try NATURAL10 or GURUKRUPA20");
    else setPromoError("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-forest/40" aria-hidden="true" />
        </div>
        <h1 className="font-playfair text-3xl font-bold text-charcoal mb-3">
          Your cart is empty
        </h1>
        <p className="font-lato text-charcoal/60 mb-8 max-w-sm">
          Looks like you haven&apos;t added anything yet. Explore our organic products!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-forest text-cream font-lato font-bold px-8 py-4 rounded-full hover:bg-forest-dark transition-colors"
        >
          Shop Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>

        {/* Recommendations */}
        <div className="mt-20 max-w-7xl mx-auto w-full">
          <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6 text-left">
            You Might Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-left">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-cream-dark border-b border-forest/10 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-lato text-charcoal/50 mb-2">
              <li><Link href="/" className="hover:text-forest">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-charcoal">Cart</li>
            </ol>
          </nav>
          <h1 className="font-playfair text-3xl font-bold text-charcoal">
            Shopping Cart ({items.length} item{items.length !== 1 ? "s" : ""})
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {subtotal < 999 && (
              <div className="bg-turmeric/10 border border-turmeric/20 rounded-2xl p-4">
                <p className="font-lato text-charcoal text-sm mb-2">
                  Add <strong>₹{(999 - subtotal).toFixed(0)}</strong> more for <strong>FREE shipping!</strong>
                </p>
                <div className="bg-cream rounded-full h-2">
                  <div
                    className="bg-turmeric h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
                    aria-valuenow={Math.round((subtotal / 999) * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                    aria-label="Progress to free shipping"
                  />
                </div>
              </div>
            )}

            {items.map((item) => (
              <article
                key={`${item.id}-${item.weight}`}
                className="bg-cream-light rounded-2xl p-5 flex gap-4"
              >
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-forest/5 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/96x96/2D5016/FAF7F0?text=GN";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-playfair font-bold text-charcoal hover:text-forest transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-charcoal/50 font-lato mt-0.5">
                        {item.weight}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.weight)}
                      className="text-charcoal/30 hover:text-red-500 transition-colors flex-shrink-0 p-1"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 border border-forest/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                        className="p-2 hover:bg-forest/5 transition-colors text-charcoal"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <span
                        className="w-8 text-center font-bold text-charcoal text-sm"
                        aria-live="polite"
                        aria-label={`Quantity: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                        className="p-2 hover:bg-forest/5 transition-colors text-charcoal"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="font-playfair font-bold text-charcoal text-lg">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-sm text-charcoal/50 hover:text-red-500 transition-colors font-lato"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-cream-light rounded-2xl p-6 space-y-4 sticky top-24">
              <h2 className="font-playfair font-bold text-charcoal text-xl">Order Summary</h2>

              {/* Promo Code */}
              {!promoCode ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" aria-hidden="true" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value.toUpperCase());
                          setPromoError("");
                        }}
                        placeholder="Promo code"
                        aria-label="Enter promo code"
                        className="w-full pl-9 pr-3 py-2.5 border border-forest/20 rounded-xl bg-cream text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-forest text-sm font-lato"
                      />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 bg-forest text-cream font-bold rounded-xl hover:bg-forest-dark transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-500 text-xs font-lato" role="alert">{promoError}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-forest/10 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-forest" aria-hidden="true" />
                    <span className="text-sm font-bold text-forest font-lato">
                      {promoCode} — {discount}% off
                    </span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-charcoal/50 hover:text-red-500 text-xs font-lato"
                    aria-label="Remove promo code"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2 text-sm font-lato">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-forest">
                    <span>Promo Discount ({discount}%)</span>
                    <span>-₹{savings.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-forest font-bold" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-forest/10 flex justify-between font-bold text-charcoal text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                {savings > 0 && (
                  <p className="text-center text-forest text-xs font-bold bg-forest/5 py-1.5 rounded-lg">
                    🎉 You save ₹{savings.toFixed(0)} on this order!
                  </p>
                )}
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-forest text-cream text-center py-4 rounded-xl font-lato font-bold hover:bg-forest-dark transition-colors"
              >
                Proceed to Checkout →
              </Link>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {["🔒 Secure Payment", "📦 Fast Delivery", "↩️ Easy Returns", "✅ Authentic"].map((b) => (
                  <span key={b} className="text-xs text-charcoal/50 font-lato text-center bg-cream-dark rounded-lg py-1.5">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* You Might Like */}
        <section className="mt-16" aria-labelledby="cart-recommendations-heading">
          <h2
            id="cart-recommendations-heading"
            className="font-playfair text-2xl font-bold text-charcoal mb-6"
          >
            Complete Your Order
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
