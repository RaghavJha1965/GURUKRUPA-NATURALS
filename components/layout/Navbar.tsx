"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import {
  ShoppingCart,
  Search,
  Heart,
  Menu,
  X,
  ChevronDown,
  Leaf,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Black Garlic", href: "/products?category=black-garlic" },
      { label: "Herbal Teas", href: "/products?category=herbal-teas" },
      { label: "Ayurvedic", href: "/products?category=ayurvedic" },
      { label: "Superfoods", href: "/products?category=superfoods" },
      { label: "Bestsellers", href: "/products?filter=bestseller" },
      { label: "New Arrivals", href: "/products?filter=new" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { getCartCount, toggleCart, wishlist } = useCartStore();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-natural border-b border-forest/10"
          : "bg-cream"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
            aria-label="GURUKRUPA NATURALS - Home"
          >
            <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center group-hover:bg-forest-dark transition-colors">
              <Leaf className="w-6 h-6 text-cream" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <p className="font-playfair font-bold text-forest text-lg leading-tight">
                GURUKRUPA
              </p>
              <p className="font-lato text-earth text-xs tracking-widest uppercase">
                Naturals
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.label} className="relative">
                {link.children ? (
                  <div
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-charcoal hover:text-forest font-lato text-sm font-medium transition-colors rounded-lg hover:bg-forest/5"
                      aria-expanded={activeDropdown === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {activeDropdown === link.label && (
                      <ul
                        className="absolute top-full left-0 mt-1 bg-cream-light border border-forest/10 rounded-xl shadow-product py-2 min-w-[200px]"
                        role="menu"
                      >
                        {link.children.map((child) => (
                          <li key={child.label} role="none">
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-charcoal hover:text-forest hover:bg-forest/5 transition-colors font-lato"
                              role="menuitem"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-charcoal hover:text-forest font-lato text-sm font-medium transition-colors rounded-lg hover:bg-forest/5 block"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-cream-light border border-forest/20 rounded-full overflow-hidden shadow-natural"
                  style={{ width: "280px" }}
                >
                  <input
                    ref={searchRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2 text-sm bg-transparent text-charcoal placeholder-charcoal/40 outline-none font-lato"
                    aria-label="Search products"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="px-3 py-2 text-charcoal/60 hover:text-forest"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              )}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-charcoal hover:text-forest hover:bg-forest/5 transition-colors"
                aria-label="Search"
                aria-expanded={isSearchOpen}
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full text-charcoal hover:text-forest hover:bg-forest/5 transition-colors"
              aria-label={`Wishlist (${wishlist.length} items)`}
            >
              <Heart className="w-5 h-5" aria-hidden="true" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-earth text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full text-charcoal hover:text-forest hover:bg-forest/5 transition-colors"
              aria-label={`Shopping cart (${cartCount} items)`}
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-forest text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-charcoal hover:text-forest hover:bg-forest/5 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-forest/10 py-4 animate-fade-in"
          >
            <ul className="space-y-1" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.children ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-charcoal hover:text-forest hover:bg-forest/5 rounded-lg cursor-pointer font-lato font-medium">
                        {link.label}
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" aria-hidden="true" />
                      </summary>
                      <ul className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-charcoal/70 hover:text-forest font-lato"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-charcoal hover:text-forest hover:bg-forest/5 rounded-lg font-lato font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
