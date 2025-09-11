import { createContext, useContext, useState } from "react";
import { useCart } from "./CartProvider.jsx";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  // Add product or increase quantity
  const addToWishlist = (product, quantity = 1) => {
    setWishlist((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Decrease quantity (remove if it hits 0)
  const decreaseWishlistQuantity = (id) => {
    setWishlist((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  // Remove product completely
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ Move item to cart (with exact quantity)
  const moveToCart = (id) => {
    setWishlist((prev) => {
      const product = prev.find((p) => p.id === id);
      if (product) {
        addToCart(product, product.quantity, true); // ✅ send quantity directly
        return prev.filter((p) => p.id !== id);
      }
      return prev;
    });
  };

  // Count total items for navbar badge
  const totalWishlistItems = wishlist.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        decreaseWishlistQuantity,
        removeFromWishlist,
        moveToCart, // ✅ exposed here
        totalWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
