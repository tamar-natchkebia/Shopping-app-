// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaCcVisa,
  FaCcMastercard,
  FaApplePay,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import faqData from "../data/faqData"; // ✅ import FAQ data

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faqOpen, setFaqOpen] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen((recent) => ({ [index]: !recent[index] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500 text-white rounded-lg p-10 text-center shadow-lg mb-10">
        <h1 className="text-4xl font-bold mb-4">Discover Your Next Favorite Find</h1>
        <p className="mb-6 text-lg">Shop curated products and explore unique categories.</p>
        
        {/* ✅ Only one button now */}
        <Link
          to="/products"
          className="inline-block bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          Browse Products
        </Link>
      </section>

      {/* Categories Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`} // ✅ Goes to CategoryDetail
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 text-center">
                  <h5 className="text-lg font-semibold">{cat.name}</h5>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No categories found.</p>
        )}
      </section>

      {/* Footer with inline FAQ */}
      <footer className="bg-gray-100 text-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          {/* Shipping & Returns + FAQ */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Worldwide Shipping</h3>
            <p className="text-sm mb-2">
              Free shipping to mainland Portugal and islands, on purchases worth €75.
            </p>
            <p className="text-sm mb-2">For international purchases, from €250.</p>
            <a href="#" className="text-purple-600 hover:underline text-sm">
              Check shipping costs
            </a>

            <h3 className="font-semibold text-lg mt-6 mb-2">Exchanges and Returns</h3>
            <p className="text-sm mb-2">Exchanges and returns within 14 days.</p>
            <a href="#" className="text-purple-600 hover:underline text-sm">
              Access the portal
            </a>

            {/* Inline FAQ Section */}
            <h3 className="font-semibold text-lg mt-6 mb-2">FAQ'S</h3>
            {faqData.map((faq, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left text-sm font-medium p-2 bg-gray-200 rounded hover:bg-purple-100 transition-colors"
                >
                  {faq.question}
                </button>
                {faqOpen[index] && (
                  <p className="mt-1 ml-2 text-sm text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                <FaFacebookF size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700 transition-colors">
                <FaPinterest size={24} />
              </a>
            </div>

            <h3 className="font-semibold text-lg mb-2">Subscribe to Newsletter</h3>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <p className="text-sm">Landline: (+351) 214 413 631</p>
            <p className="text-sm">Mobile: (+351) 916 158 854</p>
            <p className="text-sm mt-2">
              Oeiras Parque Store: Shopping Mall Oeiras Parque | Av. António Cabral de Macedo piso 2 loja 2.019
            </p>
            <p className="text-sm">Schedule: Every day from 10am to 11pm</p>
            <p className="text-sm mt-2">Emails:</p>
            <ul className="text-sm list-none">
              <li>Information: info@missus.pt</li>
              <li>Orders: sales@missus.pt</li>
              <li>After-sale: hello@missus.pt</li>
              <li>Partnerships: marketing@missus.pt</li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Payment Methods</h3>
            <div className="flex gap-4 flex-wrap">
              <FaCcVisa size={40} className="text-blue-700" />
              <FaCcMastercard size={40} className="text-red-600" />
              <FaApplePay size={40} className="text-black" />
              <FaCcAmex size={40} className="text-blue-500" />
              <FaCcDiscover size={40} className="text-orange-500" />
            </div>
          </div>
        </div>

        <div className="text-center py-4 text-sm mt-8 border-t border-gray-300">
          © 2025, Missus - Loving Swimsuits
        </div>
      </footer>
    </div>
  );
}