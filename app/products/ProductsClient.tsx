"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Grid, List } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/lib/products";

const priceRanges = [
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 — ₹600", min: 300, max: 600 },
  { label: "₹600 — ₹1000", min: 600, max: 1000 },
  { label: "Above ₹1000", min: 1000, max: Infinity },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest First", value: "new" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const filterParam = searchParams.get("filter") || "";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam.replace("-", " ")] : []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by special filters
    if (filterParam === "bestseller") {
      result = result.filter((p) => p.isBestseller);
    } else if (filterParam === "new") {
      result = result.filter((p) => p.isNew);
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some(
          (cat) =>
            p.category.toLowerCase().replace(/ /g, "-") === cat ||
            p.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }

    // Filter by price range
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(
        (p) => p.price >= range.min && p.price < range.max
      );
    }

    // Sort
    switch (sortBy) {
      case "new":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [selectedCategories, selectedPriceRange, sortBy, filterParam, searchParam]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedPriceRange !== null;

  const pageTitle = filterParam === "bestseller"
    ? "Bestsellers"
    : filterParam === "new"
    ? "New Arrivals"
    : searchParam
    ? `Search results for "${searchParam}"`
    : "All Products";

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Header */}
      <div className="bg-forest py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-cream/60 text-sm font-lato mb-3">
              <li><a href="/" className="hover:text-cream">Home</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-cream">Products</li>
            </ol>
          </nav>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-cream">
            {pageTitle}
          </h1>
          <p className="text-cream/70 font-lato mt-2">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Product filters">
            <div className="sticky top-24 space-y-6">
              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-earth hover:text-earth-dark font-lato font-bold"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                  Clear all filters
                </button>
              )}

              {/* Category Filter */}
              <div>
                <h3 className="font-playfair font-bold text-charcoal text-base mb-3">
                  Category
                </h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => toggleCategory(cat.slug)}
                          className="w-4 h-4 rounded border-forest/30 text-forest focus:ring-forest"
                          aria-label={`Filter by ${cat.name}`}
                        />
                        <span className="font-lato text-sm text-charcoal group-hover:text-forest transition-colors">
                          {cat.name}
                        </span>
                        <span className="ml-auto text-xs text-charcoal/40">
                          ({cat.count})
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-playfair font-bold text-charcoal text-base mb-3">
                  Price Range
                </h3>
                <ul className="space-y-2">
                  {priceRanges.map((range, i) => (
                    <li key={i}>
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="radio"
                          name="price-range"
                          checked={selectedPriceRange === i}
                          onChange={() =>
                            setSelectedPriceRange(
                              selectedPriceRange === i ? null : i
                            )
                          }
                          className="w-4 h-4 border-forest/30 text-forest focus:ring-forest"
                          aria-label={range.label}
                        />
                        <span className="font-lato text-sm text-charcoal group-hover:text-forest transition-colors">
                          {range.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* In Stock Only */}
              <div>
                <h3 className="font-playfair font-bold text-charcoal text-base mb-3">
                  Availability
                </h3>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-forest/30 text-forest"
                    aria-label="Show only in-stock products"
                  />
                  <span className="font-lato text-sm text-charcoal">In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-forest/20 rounded-lg px-3 py-2 text-sm font-lato text-charcoal hover:border-forest hover:text-forest transition-colors"
                  aria-expanded={isFilterOpen}
                  aria-controls="mobile-filters"
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-5 h-5 bg-forest text-cream text-xs rounded-full flex items-center justify-center">
                      {selectedCategories.length + (selectedPriceRange !== null ? 1 : 0)}
                    </span>
                  )}
                </button>

                {/* Active Filter Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="flex items-center gap-1 bg-forest/10 text-forest text-xs font-bold px-2.5 py-1 rounded-full"
                    >
                      {cat}
                      <button
                        onClick={() => toggleCategory(cat)}
                        className="hover:text-forest-dark"
                        aria-label={`Remove ${cat} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                {/* View Mode */}
                <div className="hidden sm:flex border border-forest/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-forest text-cream" : "text-charcoal hover:bg-forest/5"} transition-colors`}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <Grid className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-forest text-cream" : "text-charcoal hover:bg-forest/5"} transition-colors`}
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                  >
                    <List className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-cream-light border border-forest/10 rounded-lg pl-3 pr-8 py-2 text-sm font-lato text-charcoal focus:outline-none focus:border-forest cursor-pointer"
                    aria-label="Sort products"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/50 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-playfair text-2xl font-bold text-charcoal mb-3">
                  No products found
                </p>
                <p className="text-charcoal/60 font-lato mb-6">
                  Try adjusting your filters or search query.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-forest text-cream px-6 py-3 rounded-full font-lato font-bold hover:bg-forest-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 gap-5"
                    : "flex flex-col gap-4"
                }
                role="list"
                aria-label={`${pageTitle} — ${filteredProducts.length} products`}
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} role="listitem">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-charcoal/50 z-40"
            onClick={() => setIsFilterOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-filters"
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="fixed left-0 top-0 h-full w-80 bg-cream z-50 overflow-y-auto p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair font-bold text-charcoal text-xl">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-full hover:bg-forest/10 text-charcoal"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile filter categories */}
            <div className="space-y-6">
              <div>
                <h3 className="font-playfair font-bold text-charcoal text-base mb-3">Category</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => toggleCategory(cat.slug)}
                          className="w-4 h-4 rounded border-forest/30 text-forest"
                        />
                        <span className="font-lato text-sm text-charcoal">{cat.name}</span>
                        <span className="ml-auto text-xs text-charcoal/40">({cat.count})</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-playfair font-bold text-charcoal text-base mb-3">Price Range</h3>
                <ul className="space-y-2">
                  {priceRanges.map((range, i) => (
                    <li key={i}>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="price-range-mobile"
                          checked={selectedPriceRange === i}
                          onChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                          className="w-4 h-4 border-forest/30 text-forest"
                        />
                        <span className="font-lato text-sm text-charcoal">{range.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={clearFilters}
                className="flex-1 border border-forest text-forest py-3 rounded-xl font-lato font-bold hover:bg-forest/5 transition-colors text-sm"
              >
                Clear
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 bg-forest text-cream py-3 rounded-xl font-lato font-bold hover:bg-forest-dark transition-colors text-sm"
              >
                Apply ({filteredProducts.length} products)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
