import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, prodRes] = await Promise.all([ // Parallel requests for efficiency
          axios.get(`https://api.escuelajs.co/api/v1/categories/${id}`),
          axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`) 
        ]);
        setCategory(catRes.data);
        setProducts(prodRes.data || []);
      } catch (err) {
        console.error("Error fetching category detail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Loading category...</p>;
  if (!category) return <p className="p-6">Category not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={category.image}
          alt={category.name}
          className="w-24 h-24 rounded-lg object-cover shadow"
        />
        <h1 className="text-3xl font-bold">{category.name}</h1>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)} // link is better because of SEO, but this is ok for now. 
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 overflow-hidden"
            >
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h5 className="text-lg font-semibold">{product.title}</h5>
                <p className="text-blue-600 font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
