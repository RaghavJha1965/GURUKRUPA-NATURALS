"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  weight: string;
  quantity: number;
  slug: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  weight: string;
}

interface CartState {
  items: CartItem[];
  wishlist: WishlistItem[];
  isCartOpen: boolean;
  promoCode: string;
  discount: number;
  recentlyViewed: string[];

  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, weight: string) => void;
  updateQuantity: (id: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Wishlist actions
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;

  // Promo code
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  // Recently viewed
  addToRecentlyViewed: (slug: string) => void;

  // Computed
  getCartTotal: () => number;
  getCartCount: () => number;
  getDiscountedTotal: () => number;
}

const PROMO_CODES: Record<string, number> = {
  NATURAL10: 10,
  ORGANIC15: 15,
  GURUKRUPA20: 20,
  FIRST15: 15,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isCartOpen: false,
      promoCode: "",
      discount: 0,
      recentlyViewed: [],

      addToCart: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.id === newItem.id && item.weight === newItem.weight
          );
          if (existingIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + newItem.quantity,
            };
            return { items: updatedItems };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeFromCart: (id, weight) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.weight === weight)
          ),
        }));
      },

      updateQuantity: (id, weight, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id, weight);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.weight === weight
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: "", discount: 0 }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToWishlist: (item) => {
        set((state) => {
          if (state.wishlist.find((w) => w.id === item.id)) return state;
          return { wishlist: [...state.wishlist, item] };
        });
      },

      removeFromWishlist: (id) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        }));
      },

      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },

      applyPromoCode: (code) => {
        const upper = code.toUpperCase().trim();
        const discountPercent = PROMO_CODES[upper];
        if (discountPercent) {
          set({ promoCode: upper, discount: discountPercent });
          return true;
        }
        return false;
      },

      removePromoCode: () => set({ promoCode: "", discount: 0 }),

      addToRecentlyViewed: (slug) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter((s) => s !== slug);
          return { recentlyViewed: [slug, ...filtered].slice(0, 8) };
        });
      },

      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getDiscountedTotal: () => {
        const total = get().getCartTotal();
        const discount = get().discount;
        return total - (total * discount) / 100;
      },
    }),
    {
      name: "gurukrupa-cart",
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
        promoCode: state.promoCode,
        discount: state.discount,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);
