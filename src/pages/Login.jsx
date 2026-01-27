// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import axios from "axios";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://warrior.ge/api/login", { 
        email,
        password,
      });

      // Example: API returns { name, email }
      login(res.data); // if we dont store the date  we will be logged out on refresh
      navigate("/"); // Redirect to home after login
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Login
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* New text for sign up */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-600 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
