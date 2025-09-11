// src/pages/Wishlist.jsx
import { useWishlist } from "../context/WishlistProvider.jsx";

export default function Wishlist() {
  const {
    wishlist,
    addToWishlist,
    decreaseWishlistQuantity,
    removeFromWishlist,
    moveToCart,
  } = useWishlist();

  // ✅ Calculate total cost of all items
  const totalCost = wishlist.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border rounded"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseWishlistQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => addToWishlist(item, 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
                <button
  onClick={() => moveToCart(item.id)}
  className="text-green-600 hover:underline"
>
  Move to Cart
</button>

                
              </li>
            ))}
          </ul>

          {/* ✅ Total cost */}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">
              Total: ${totalCost.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}
