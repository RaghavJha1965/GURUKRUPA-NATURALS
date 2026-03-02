"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getDiscountedTotal,
    promoCode,
    discount,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoError("");
      showToast(`Promo code applied! ${discount}% off`, "success");
    } else {
      setPromoError("Invalid promo code. Try NATURAL10 or GURUKRUPA20");
    }
  };

  const subtotal = getCartTotal();
  const discountedTotal = getDiscountedTotal();
  const shipping = subtotal >= 999 ? 0 : 79;
  const savings = subtotal - discountedTotal;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/50 z-[100] backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="cart-drawer fixed right-0 top-0 h-full w-full max-w-md bg-cream z-[101] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-forest/10 bg-cream-light">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-forest" aria-hidden="true" />
            <h2 className="font-playfair font-bold text-charcoal text-lg">
              Your Cart ({items.length})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-forest/10 transition-colors text-charcoal"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < 999 && (
          <div className="px-5 py-3 bg-turmeric/10 border-b border-turmeric/20">
            <p className="text-xs text-charcoal font-lato">
              Add <strong>₹{(999 - subtotal).toFixed(0)}</strong> more for FREE shipping!
            </p>
            <div className="mt-1.5 bg-cream rounded-full h-1.5">
              <div
                className="bg-turmeric h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        {subtotal >= 999 && (
          <div className="px-5 py-2 bg-forest/10 border-b border-forest/20 text-center">
            <p className="text-xs text-forest font-bold">🎉 You&apos;ve got FREE shipping!</p>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-forest/40" aria-hidden="true" />
              </div>
              <div>
                <p className="font-playfair font-bold text-charcoal text-lg">
                  Your cart is empty
                </p>
                <p className="text-charcoal/60 text-sm mt-1">
                  Discover our organic products
                </p>
              </div>
              <Link
                href="/products"
                onClick={closeCart}
                className="bg-forest text-cream px-6 py-3 rounded-full font-lato font-bold text-sm hover:bg-forest-dark transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.weight}`}
                className="flex gap-3 bg-cream-light rounded-xl p-3"
              >
                <div className="w-16 h-16 bg-forest/5 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/64x64/2D5016/FAF7F0?text=GN";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-lato font-bold text-charcoal text-sm leading-tight line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-xs text-charcoal/50 mt-0.5">{item.weight}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-cream border border-forest/10 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.weight, item.quantity - 1)
                        }
                        className="p-1 text-charcoal hover:text-forest transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold text-charcoal w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.weight, item.quantity + 1)
                        }
                        className="p-1 text-charcoal hover:text-forest transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-charcoal text-sm">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id, item.weight)}
                        className="text-charcoal/30 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-forest/10 px-5 py-4 space-y-3 bg-cream-light">
            {/* Promo Code */}
            {!promoCode ? (
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" aria-hidden="true" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value.toUpperCase());
                      setPromoError("");
                    }}
                    placeholder="Promo code"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-forest/20 rounded-lg bg-cream text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-forest"
                    aria-label="Enter promo code"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-forest text-cream text-sm font-bold rounded-lg hover:bg-forest-dark transition-colors"
                >
                  Apply
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-forest/10 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-forest" aria-hidden="true" />
                  <span className="text-sm font-bold text-forest">{promoCode} — {discount}% off</span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-charcoal/50 hover:text-red-500"
                  aria-label="Remove promo code"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {promoError && (
              <p className="text-xs text-red-500">{promoError}</p>
            )}

            {/* Totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-forest">
                  <span>Discount ({discount}%)</span>
                  <span>-₹{savings.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal/70">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-forest font-bold" : ""}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-charcoal text-base border-t border-forest/10 pt-2 mt-2">
                <span>Total</span>
                <span>₹{(discountedTotal + shipping).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-forest text-cream text-center py-3.5 rounded-xl font-lato font-bold hover:bg-forest-dark transition-colors"
            >
              Proceed to Checkout →
            </Link>

            {/* Trust Badges */}
            <div className="flex justify-center gap-4 pt-1">
              {["🔒 Secure", "📦 Fast Delivery", "↩️ Easy Returns"].map((badge) => (
                <span key={badge} className="text-xs text-charcoal/50">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
