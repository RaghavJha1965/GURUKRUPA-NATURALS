import { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organic Products — GURUKRUPA NATURALS",
  description:
    "Browse our full range of organic superfoods, black garlic, herbal teas, Ayurvedic products and natural wellness foods. Lab tested, farm fresh.",
};

function ProductsLoading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-forest py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 skeleton rounded-lg mb-3" />
          <div className="h-5 w-32 skeleton rounded-lg" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-cream-light rounded-2xl overflow-hidden">
              <div className="aspect-square skeleton" />
              <div className="p-4 space-y-2">
                <div className="h-4 skeleton rounded" />
                <div className="h-3 skeleton rounded w-3/4" />
                <div className="h-5 skeleton rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}
