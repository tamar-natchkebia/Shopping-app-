// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartProvider.jsx";
import { useWishlist } from "../context/WishlistProvider.jsx";

export default function ProductDetail() {
  const { id } = useParams(); // It reads parameters from the URL. if route is /products/10, then id = 10.
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantityInput] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`) // useParams gives you the id.

// useEffect uses that id to fetch the correct product from the API.
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  const increase = () => setQuantityInput((q) => q + 1);
  const decrease = () => setQuantityInput((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-md"
      />

      {/* Product Info */}
      <div className="md:w-1/2 flex flex-col">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-700 mb-4 flex-grow">{product.description}</p>
        <h2 className="text-2xl font-semibold mb-4">${product.price}</h2>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={decrease}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={increase}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              addToCart(product, quantity);
              setQuantityInput(1); // reset after adding
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Add to Cart
          </button>
          <button
            onClick={() => addToWishlist(product, quantity)}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
