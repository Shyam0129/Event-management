import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (data.token) {
        toast.success("✅ Login successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });

        // Store token & redirect after short delay
        login(data.token);
        setTimeout(() => {
          navigate(data.role === "admin" ? "/admin" : "/");
        }, 2000);
      } else {
        toast.error(`❌ ${data.message || "Login failed!"}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed!";
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] relative">
      <ToastContainer />

      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-20 blur-3xl"></div>

      <div className="relative bg-gray-900 bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full transition-all hover:shadow-3xl transform hover:scale-105 duration-300">
        {/* Neon Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 rounded-xl pointer-events-none"></div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">🚀 Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition-all"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-500 transform hover:scale-105 transition-all hover:shadow-blue-400/50"
          >
            Login 🔐
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
