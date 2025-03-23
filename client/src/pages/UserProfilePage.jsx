import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 987 654 3210",
    membership: "Premium",
    eventsAttended: 12,
    imageUrl: "/default-profile.png",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/auth/profile", {
          headers: { Authorization: `${token}` },
        });
        
        setUser(response.data.user);
      } catch (error) {
        setError("❌ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen flex justify-center items-center p-6 animate-fadeIn">
      <div className="relative bg-gray-900 bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-gray-700 max-w-lg w-full transition-all hover:shadow-2xl transform hover:scale-105 duration-300">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-10 rounded-xl pointer-events-none"></div>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.image}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg transform hover:scale-110 transition duration-300"
            />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400 text-lg">{user.email}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            <span className="text-gray-300">📞 Phone:</span>
            <span className="text-white font-medium">{user.phone}</span>
          </div>

          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            <span className="text-gray-300">🎟️ Membership:</span>
            <span className="text-white font-medium">{user.membership}</span>
          </div>

          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            <span className="text-gray-300">🎉 Events Attended:</span>
            <span className="text-white font-medium">{user.eventsAttended}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-between">
          <Link to="/edit-profile">
            <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg text-white transition-all transform hover:scale-105">
              ✏️ Edit Profile
            </button>
          </Link>
          <button className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg text-white transition-all transform hover:scale-105">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
