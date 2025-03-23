import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

const CheckIn = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [message, setMessage] = useState("");
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    // Listen for real-time check-in updates
    socket.on("updateCheckins", (data) => {
      setCheckIns((prev) => [...prev, data]);
    });

    return () => socket.off("updateCheckins");
  }, []);

  const handleCheckIn = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/bookings/check-in", {
        userId,
        eventId,
      });

      socket.emit("check-in", data.booking); // Emit event to Socket.io
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Check-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-green-400">📍 Event Check-in</h1>

      {message && <p className="mt-4 text-center text-lg">{message}</p>}

      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="mt-4 p-3 w-72 bg-gray-800 text-white rounded-lg border border-gray-600"
      />

      <input
        type="text"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="mt-4 p-3 w-72 bg-gray-800 text-white rounded-lg border border-gray-600"
      />

      <button
        onClick={handleCheckIn}
        className="mt-4 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg text-white font-semibold"
      >
        ✅ Check-In
      </button>

      <h2 className="mt-8 text-xl font-bold">🔄 Real-Time Check-ins</h2>
      <ul className="mt-4">
        {checkIns.map((item, index) => (
          <li key={index} className="text-green-400">{`User ${item.userId} checked into Event ${item.eventId}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default CheckIn;
