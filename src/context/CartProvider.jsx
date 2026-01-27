import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product, quantity = 1, fromWishlist = false) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id); // Check if product already in cart
      if (existing) {
        return prev.map((p) => //cant directly modify existing as state should be immutable
          p.id === product.id
            ? {
                ...p, // return everything, except quantity
                // ✅ If from wishlist, add exact quantity (no double increment)
                quantity: fromWishlist
                  ? p.quantity 
                  : p.quantity+ quantity // Increment quantity
              }
            : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const setQuantity = (id, newQuantity) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: newQuantity } : p
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        setQuantity,
        totalCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
