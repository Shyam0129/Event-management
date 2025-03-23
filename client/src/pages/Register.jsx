import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data; // Extract actual response data
      console.log("✅ Registration Response:", data);

      if (data.success) {
        toast.success("🎉 Registration successful!", { position: "top-right", autoClose: 2000, theme: "dark" });

        // Login and navigate
        login(data.token);
        setTimeout(() => {
          navigate(data.user.role === "admin" ? "/admin" : "/");
        }, 2000);
      } else {
        toast.error(`⚠️ ${data.message}`, { position: "top-right", autoClose: 3000, theme: "dark" });
      }
    } catch (err) {
      console.error("🔴 Registration Error:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Registration failed!";
      toast.error(`🚨 ${errorMessage}`, { position: "top-right", autoClose: 3000, theme: "dark" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative px-4">
      <ToastContainer />

      {/* Glowing Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 opacity-20 blur-3xl"></div>

      <div className="relative bg-gray-800 bg-opacity-90 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full transition-all hover:shadow-blue-500/50 transform hover:scale-105 duration-300">
        {/* Neon Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 rounded-xl pointer-events-none"></div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">🚀 Register</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Role Selection */}
          <select
            name="role"
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">Attendee</option>
            <option value="admin">Event Organizer</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all hover:shadow-blue-500/50"
          >
            Register ✨
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-sm mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
