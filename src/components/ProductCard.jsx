import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded">
      <img src={product.images[0]} alt={product.title} className="h-40 w-full object-cover" />
      <h3 className="font-bold">{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`} className="text-blue-500">View</Link>
    </div>
  );
}
