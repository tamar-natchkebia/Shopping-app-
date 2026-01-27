// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


// Custom hook to debounce input values
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value); // State to hold the debounced value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);// runs after delay time has passed
    }, delay); // Set a timeout to update the debounced value after the specified delay
    return () => {
      clearTimeout(handler); // We need to cancel the old timer because if we don’t, we’ll end up running multiple timers for old values — and that causes wrong updates
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [title, setTitle] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  // Debounced filters
  const debouncedTitle = useDebounce(title, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const debouncedCategoryId = useDebounce(categoryId, 500);

  // The addToWishlist function is removed from this component

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://api.escuelajs.co/api/v1/categories"
        );
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products on filter change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Before fetching products, you want to let the user know the app is busy.
      try {
        const params = {
          price_min: debouncedPriceRange[0], // API expects price_min and price_max
          price_max: debouncedPriceRange[1],
        };
        if (debouncedTitle) params.title = debouncedTitle; //Only add title into params if debouncedTitle actually has something in it
        if (debouncedCategoryId) params.categoryId = debouncedCategoryId; // Only add categoryId if it's not empty

        const res = await axios.get(
          "https://api.escuelajs.co/api/v1/products",
          { params }
        );
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [debouncedTitle, debouncedPriceRange, debouncedCategoryId]);

  const handleReset = () => {
    setTitle("");
    setPriceRange([0, 2000]);
    setCategoryId("");
  };

  // Range input styling
  const thumbClasses =
    "absolute w-full h-1 bg-transparent pointer-events-none appearance-none z-10 top-1/2 -translate-y-1/2 " +
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-blue-500 " +
    "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Products</h1>

      {/* Filter Card */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow-md border border-gray-200">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Search Input with Icon */}
          <div className="md:col-span-6 lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border-gray-300 pl-10 pr-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-6 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border-gray-300 py-2 pl-3 pr-8 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="md:col-span-10 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label> 
            <div className="relative mt-3 h-8"> 
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200"></div> 
              <div background
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-500"
                style={{
                  left: `${(priceRange[0] / 2000) * 100}%`,
                  right: `${100 - (priceRange[1] / 2000) * 100}%`,
                }} // visual representation of the state.
              ></div>
              <input // update numbers in state.
                type="range" min="0" max="2000" step="10" value={priceRange[0]}
                onChange={(e) => {
                  const newMin = Math.min(Number(e.target.value), priceRange[1] - 10);
                  setPriceRange([newMin, priceRange[1]]);
                }} //
                className={thumbClasses}
              />
              <input
                type="range" min="0" max="2000" step="10" value={priceRange[1]}
                onChange={(e) => {
                  const newMax = Math.max(Number(e.target.value), priceRange[0] + 10);
                  setPriceRange([priceRange[0], newMax]);
                }}
                className={thumbClasses}
              />
              <div className="absolute -bottom-5 flex w-full justify-between text-xs font-medium text-gray-600">
                <span>${priceRange[0]}</span> {/* show the same numbers as text, so the user knows exactly what min and max they picked. */}
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-2 lg:col-span-2 flex items-end">
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center p-10">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center text-blue-800">
          No products found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
            >
              <Link
                to={`/products/${product.id}`} // To the product details page.
                className="flex flex-grow flex-col"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="h-56 w-full object-cover"
                />
                <div className="flex flex-grow flex-col p-4">
                  <h5 className="font-semibold text-gray-800">
                    {product.title}
                  </h5>
                  <p className="mt-1 flex-grow text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-auto pt-2 text-xl font-bold text-blue-600">
                    ${product.price}
                  </p>
                </div>
              </Link>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}