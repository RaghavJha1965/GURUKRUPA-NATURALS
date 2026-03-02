"use client";

export default function FreeshippingBanner() {
  return (
    <div
      className="bg-forest text-cream text-center py-2 px-4 text-sm font-lato"
      role="banner"
      aria-label="Free shipping offer"
    >
      <span className="font-bold">🌿 FREE SHIPPING</span> on orders above ₹999 &nbsp;|&nbsp;
      <span className="font-bold">🇮🇳 100% Indian Organic</span> &nbsp;|&nbsp;
      <span className="font-bold">✅ Lab Tested</span>
    </div>
  );
}
