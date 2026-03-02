"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, MapPin } from "lucide-react";

const mockOrder = {
  id: "GN12345",
  status: "shipped",
  items: [
    { name: "Organic Black Garlic Cloves", weight: "250g", qty: 1, price: 1299 },
    { name: "Organic Tulsi Green Tea", weight: "100g", qty: 2, price: 898 },
  ],
  total: 2197,
  estimatedDelivery: "March 5, 2026",
  steps: [
    { label: "Order Placed", date: "Mar 1, 2026", completed: true, icon: Package },
    { label: "Packed & Ready", date: "Mar 2, 2026", completed: true, icon: Package },
    { label: "Shipped", date: "Mar 3, 2026", completed: true, icon: Truck },
    { label: "Out for Delivery", date: "Mar 5, 2026", completed: false, icon: MapPin },
    { label: "Delivered", date: "Mar 5, 2026", completed: false, icon: CheckCircle },
  ],
};

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<typeof mockOrder | null>(null);
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) {
      setError("Please enter both your Order ID and email address.");
      return;
    }
    setError("");
    // Simulate order lookup
    setOrder(mockOrder);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-forest py-16 px-4 text-center">
        <h1 className="font-playfair text-4xl font-bold text-cream mb-3">
          Track Your Order
        </h1>
        <p className="text-cream/70 font-lato max-w-md mx-auto">
          Enter your order ID and email to get real-time delivery updates.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Tracking Form */}
        <div className="bg-cream-light rounded-2xl p-6 mb-8 shadow-natural">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Order ID (e.g., GN12345)"
              aria-label="Order ID"
              className="flex-1 border border-forest/20 rounded-xl px-4 py-3 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="flex-1 border border-forest/20 rounded-xl px-4 py-3 bg-cream text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-forest text-cream font-lato font-bold px-6 py-3 rounded-xl hover:bg-forest-dark transition-colors whitespace-nowrap"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Track Order
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-3 font-lato" role="alert">{error}</p>}
        </div>

        {/* Order Results */}
        {order && (
          <div className="space-y-6 animate-fade-in">
            {/* Order Header */}
            <div className="bg-cream-light rounded-2xl p-6 shadow-natural">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div>
                  <p className="font-lato text-charcoal/60 text-sm">Order #{order.id}</p>
                  <p className="font-playfair font-bold text-charcoal text-xl">
                    Estimated Delivery: {order.estimatedDelivery}
                  </p>
                </div>
                <span className="bg-turmeric/20 text-turmeric font-bold text-sm px-4 py-1.5 rounded-full font-lato capitalize">
                  {order.status}
                </span>
              </div>

              {/* Tracking Steps */}
              <ol className="relative ml-4 border-l-2 border-forest/20 space-y-6 mt-6">
                {order.steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <li key={i} className="relative pl-8">
                      <div
                        className={`absolute -left-3.5 top-0 w-7 h-7 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-forest" : "bg-cream-dark border-2 border-forest/20"
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 ${step.completed ? "text-cream" : "text-charcoal/30"}`}
                          aria-hidden="true"
                        />
                      </div>
                      <p className={`font-lato font-bold text-sm ${step.completed ? "text-charcoal" : "text-charcoal/40"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-charcoal/50 font-lato">{step.date}</p>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Order Items */}
            <div className="bg-cream-light rounded-2xl p-6 shadow-natural">
              <h2 className="font-playfair font-bold text-charcoal text-lg mb-4">
                Items in this Order
              </h2>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-forest/5 last:border-0">
                    <div>
                      <p className="font-lato font-bold text-charcoal text-sm">{item.name}</p>
                      <p className="text-xs text-charcoal/50">{item.weight} × {item.qty}</p>
                    </div>
                    <p className="font-bold text-charcoal text-sm">₹{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-charcoal mt-4 pt-3 border-t border-forest/10">
                <span>Total Paid</span>
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
