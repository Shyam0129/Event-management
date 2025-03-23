import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Navbar = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:4000/api/auth/profile", {
          headers: { Authorization: `${token}` },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center space-x-2 text-3xl font-bold text-[#A855F7] font-orbitron tracking-widest">
          <span>EventSphere</span>
        </Link>

        {/* 🔹 Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-green-400 transition">Home</Link>

          {!user || user.role !== "admin" ? (
            <Link to="/events" className="hover:text-green-400 transition">Events</Link>
          ) : null}

          {token && user ? (
            <>
              {user.role === "user" && (
                <Link to="/my-bookings" className="hover:text-green-400 transition">
                  My Bookings
                </Link>
              )}

              {user.role === "admin" && (
                <>
                  <Link to="/admin" className="hover:text-yellow-400 transition">Admin Dashboard</Link>
                  <Link to="/admin/create-events" className="hover:text-yellow-400 transition">
                    Create Event
                  </Link>
                  <Link to="/admin/manage-events" className="hover:text-yellow-400 transition">
                    Manage Events
                  </Link>
                </>
              )}

              {/* 🔹 Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  <img
                    src={user.image || "/default-profile.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-green-400"
                  />
                  <span>{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                    <p className="px-4 py-2 text-gray-300">{user.role === "admin" ? "👑 Admin" : "👤 User"}</p>

                    <Link
                      to={user.role === "admin" ? "/admin-profile" : "/user-profile"}
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-500 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* 🔹 LOGIN BUTTON - Neon Blue */}
              <Link
                to="/login"
                className="px-5 py-2 text-white bg-blue-500 rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-blue-500/50 hover:scale-105"
              >
                Login
              </Link>

              {/* 🔹 REGISTER BUTTON - Purple-Pink Gradient */}
              <Link
                to="/register"
                className="px-5 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-purple-500/50 hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
