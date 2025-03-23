import { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "John Doe",
    email: "admin@example.com",
    role: "Super Admin",
    phone: "+1 234 567 890",
    imageUrl: "/default-profile.png",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/auth/profile", {
          headers: { Authorization: `${token}` },
        });
        console.log(response);
        
        setAdmin(response.data.user);
      } catch (error) {
        setError("❌ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center p-6">
      <div className="glassmorphism-container max-w-2xl w-full p-8 rounded-2xl shadow-xl border border-gray-700">
        {loading ? (
          <p className="text-center text-gray-400">Loading profile...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Profile Image with Gradient Border */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
                <img
                  src={admin.image}
                  alt="Admin"
                  className="w-full h-full object-cover rounded-full border-4 border-gray-800"
                />
              </div>

              {/* Admin Info */}
              <h3 className="text-2xl font-bold mt-4">{admin.name}</h3>
              <p className="text-sm text-gray-400">{admin.role}</p>

              {/* Admin Details */}
              <div className="mt-6 w-full flex flex-col gap-4">
                <ProfileDetail title="📧 Email" value={admin.email} />
                <ProfileDetail title="📞 Phone" value={admin.phone} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg text-white shadow-md transition-all duration-200 hover:scale-105">
                  ✏️ Update Profile
                </button>
                <button className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-2 rounded-lg text-white shadow-md transition-all duration-200 hover:scale-105">
                  🔑 Change Password
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ProfileDetail = ({ title, value }) => (
  <div className="bg-gray-900 bg-opacity-40 p-4 rounded-lg border border-gray-700 shadow-md flex justify-between items-center">
    <h4 className="text-gray-400">{title}</h4>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);

export default AdminProfile;
