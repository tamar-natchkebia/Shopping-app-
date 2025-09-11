import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import { useCart } from "../context/CartProvider.jsx";
import { useWishlist } from "../context/WishlistProvider.jsx";

export default function Navbar() {
  const { user, logout } = useAuth() || {};
  const { totalCartItems: cartCount = 0 } = useCart() || {}; // ✅ fixed
  const { wishlist = [] } = useWishlist() || {}; // Wishlist array

  const wishlistCount = wishlist.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-purple-600">
        MaisonMart
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/products" className="hover:text-purple-700">
          Products
        </Link>
        <Link to="/categories" className="hover:text-purple-700">
          Categories
        </Link>

        {/* Wishlist */}
        <Link to="/wishlist" className="relative hover:text-purple-700">
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative hover:text-purple-700">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* User / Auth */}
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-purple-700">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
