import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading categories...</p>;
  if (!categories.length) return <p className="p-6">No categories found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.id}`} //will navigate to category detail page
            className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 overflow-hidden"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h5 className="text-lg font-semibold">{cat.name}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
