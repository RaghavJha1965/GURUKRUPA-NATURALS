"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  CreditCard,
  Smartphone,
  Package,
  CheckCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const paymentMethods = [
  { id: "razorpay", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI Payment", icon: Smartphone },
  { id: "cod", label: "Cash on Delivery", icon: Package },
];

export default function CheckoutPage() {
  const { items, getDiscountedTotal, discount, clearCart } = useCartStore();
  type CheckoutStep = "details" | "payment" | "confirmation";
  const [step, setStep] = useState<CheckoutStep>("details");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);

  const subtotal = getDiscountedTotal();
  const shipping = subtotal >= 999 ? 0 : 79;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + gst;

  const checkPincode = (pin: string) => {
    setPincode(pin);
    if (pin.length === 6) {
      const validPincodes = ["400001", "560001", "411001", "600001", "110001"];
      setPincodeValid(validPincodes.includes(pin) || (parseInt(pin) > 100000 && parseInt(pin) < 999999));
    } else {
      setPincodeValid(null);
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsPlacingOrder(false);
    setStep("confirmation");
    clearCart();
  };

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-forest" aria-hidden="true" />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-charcoal mb-3">
            Order Placed Successfully!
          </h1>
          <p className="font-lato text-charcoal/60 mb-2">
            Your order #GN{Math.floor(Math.random() * 90000) + 10000} has been placed.
          </p>
          <p className="font-lato text-charcoal/60 mb-8">
            You&apos;ll receive a confirmation email and WhatsApp message shortly.
            Expected delivery: <strong>3-5 business days</strong>.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/order-tracking"
              className="bg-forest text-cream px-6 py-3 rounded-full font-lato font-bold hover:bg-forest-dark transition-colors text-sm"
            >
              Track Order
            </Link>
            <Link
              href="/products"
              className="border border-forest text-forest px-6 py-3 rounded-full font-lato font-bold hover:bg-forest/5 transition-colors text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && (step as string) !== "confirmation") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-playfair text-2xl font-bold text-charcoal mb-4">Your cart is empty</p>
          <Link href="/products" className="bg-forest text-cream px-6 py-3 rounded-full font-lato font-bold hover:bg-forest-dark transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-cream-dark border-b border-forest/10 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-playfair font-bold text-forest text-xl">
            GURUKRUPA NATURALS
          </Link>
          <div className="flex items-center gap-2 text-sm text-charcoal/60 font-lato">
            <Lock className="w-4 h-4 text-forest" aria-hidden="true" />
            Secure Checkout
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <nav aria-label="Checkout steps">
          <ol className="flex items-center gap-4 mb-8">
            {[
              { id: "details", label: "1. Delivery" },
              { id: "payment", label: "2. Payment" },
            ].map((s) => (
              <li
                key={s.id}
                className={`font-lato font-bold text-sm ${
                  step === s.id ? "text-forest" : "text-charcoal/40"
                }`}
                aria-current={step === s.id ? "step" : undefined}
              >
                {s.label}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: Form */}
          <div className="space-y-6">
            {step === "details" && (
              <>
                <div className="bg-cream-light rounded-2xl p-6">
                  <h2 className="font-playfair font-bold text-charcoal text-xl mb-5">
                    Delivery Details
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">
                          First Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Priya"
                          className="w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm"
                          aria-label="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Sharma"
                          className="w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm"
                          aria-label="Last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm"
                        aria-label="Mobile number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="priya@email.com"
                        className="w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm"
                        aria-label="Email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">
                        Delivery Address *
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Flat/House No., Street, Locality"
                        className="w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm resize-none"
                        aria-label="Delivery address"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">
                          Pincode *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={pincode}
                            onChange={(e) => checkPincode(e.target.value.replace(/\D/, "").slice(0, 6))}
                            placeholder="411001"
                            className={`w-full border rounded-xl px-4 py-2.5 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none font-lato text-sm ${
                              pincodeValid === false ? "border-red-400" : pincodeValid === true ? "border-forest" : "border-forest/20 focus:border-forest"
                            }`}
                            aria-label="Pincode"
                            aria-describedby={pincodeValid === false ? "pincode-msg" : undefined}
                          />
                        </div>
                        {pincode.length === 6 && (
                          <p
                            id="pincode-msg"
                            className={`text-xs mt-1 font-lato ${pincodeValid ? "text-forest" : "text-red-500"}`}
                          >
                            {pincodeValid ? "✓ Delivery available" : "✗ Not serviceable"}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">City *</label>
                        <input
                          type="text"
                          placeholder="Pune"
                          className="w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm"
                          aria-label="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">State *</label>
                        <select
                          className="w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-cream text-charcoal focus:outline-none focus:border-forest font-lato text-sm"
                          aria-label="State"
                        >
                          <option value="">Select</option>
                          <option>Maharashtra</option>
                          <option>Delhi</option>
                          <option>Karnataka</option>
                          <option>Tamil Nadu</option>
                          <option>Gujarat</option>
                          <option>Rajasthan</option>
                          <option>Kerala</option>
                          <option>West Bengal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep("payment")}
                  className="w-full bg-forest text-cream py-4 rounded-xl font-lato font-bold hover:bg-forest-dark transition-colors"
                >
                  Continue to Payment →
                </button>
              </>
            )}

            {step === "payment" && (
              <>
                <div className="bg-cream-light rounded-2xl p-6">
                  <h2 className="font-playfair font-bold text-charcoal text-xl mb-5">
                    Payment Method
                  </h2>
                  <div className="space-y-3" role="radiogroup" aria-label="Payment method">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-forest bg-forest/5"
                              : "border-forest/10 hover:border-forest/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-forest"
                            aria-label={method.label}
                          />
                          <Icon className="w-5 h-5 text-forest" aria-hidden="true" />
                          <span className="font-lato font-bold text-charcoal">{method.label}</span>
                          {method.id === "razorpay" && (
                            <span className="ml-auto text-xs bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                              Razorpay
                            </span>
                          )}
                          {method.id === "upi" && (
                            <span className="ml-auto text-xs bg-purple-100 text-purple-600 font-bold px-2 py-0.5 rounded-full">
                              UPI / BHIM
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mt-4">
                      <label className="block text-sm font-bold font-lato text-charcoal mb-1.5">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        className="w-full border border-forest/20 rounded-xl px-4 py-2.5 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm"
                        aria-label="UPI ID"
                      />
                    </div>
                  )}
                </div>

                {/* GST Invoice */}
                <div className="bg-cream-light rounded-2xl p-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 text-forest" aria-label="Request GST invoice" />
                    <div>
                      <p className="font-lato font-bold text-charcoal text-sm">Request GST Invoice</p>
                      <p className="text-xs text-charcoal/50 font-lato">Enter your GSTIN for business purchase</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("details")}
                    className="flex-1 border border-forest text-forest py-4 rounded-xl font-lato font-bold hover:bg-forest/5 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="flex-1 bg-forest text-cream py-4 rounded-xl font-lato font-bold hover:bg-forest-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    aria-busy={isPlacingOrder}
                  >
                    {isPlacingOrder ? (
                      <>
                        <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" aria-hidden="true" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" aria-hidden="true" />
                        Place Order — ₹{total.toLocaleString("en-IN")}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-cream-light rounded-2xl p-6 sticky top-24">
              <h2 className="font-playfair font-bold text-charcoal text-xl mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={`${item.id}-${item.weight}`} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-forest/5 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/56x56/2D5016/FAF7F0?text=GN";
                        }}
                      />
                      <span className="absolute -top-1 -right-1 bg-forest text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-lato font-bold text-charcoal text-sm truncate">{item.name}</p>
                      <p className="text-xs text-charcoal/50">{item.weight}</p>
                    </div>
                    <p className="font-lato font-bold text-charcoal text-sm">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm font-lato border-t border-forest/10 pt-4">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-forest">
                    <span>Discount Applied</span>
                    <span>-{discount}%</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-forest font-bold" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between font-bold text-charcoal text-base border-t border-forest/10 pt-2 mt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Security badges */}
              <div className="mt-5 pt-4 border-t border-forest/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-charcoal/50 font-lato">
                  <Lock className="w-3 h-3 text-forest" aria-hidden="true" />
                  SSL encrypted secure checkout
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal/50 font-lato">
                  <CheckCircle className="w-3 h-3 text-forest" aria-hidden="true" />
                  Payment data never stored
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
