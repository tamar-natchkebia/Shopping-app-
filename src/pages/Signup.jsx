import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://warrior.ge/api";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // New state for success
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_URL}/register`, formData);

      // Trigger the modern success state
      setIsSuccess(true);
      
      // Wait 2 seconds so they can see the message, then redirect
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Create Account</h1>
        <p className="text-center text-gray-500 mb-8">Join the warrior community today.</p>

        {/* Modern Success Message */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 animate-pulse">
            <div className="bg-green-100 text-green-700 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Registration Successful!</h2>
            <p className="text-gray-500">Redirecting you to login...</p>
          </div>
        ) : (
          /* The Form - only shows if not successful */
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className={`py-3 mt-2 rounded-xl font-bold text-white shadow-lg transition-all ${
                loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700 hover:shadow-purple-200"
              }`}
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>
        )}

        {!isSuccess && (
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-600 font-bold hover:text-purple-800"
            >
              Log in here
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;