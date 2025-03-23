import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/events");
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen p-8 text-white">
      <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        📅 Upcoming Events
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No events available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0, 204, 255, 0.4)" }}
              className="bg-gray-900 bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700 relative overflow-hidden"
            >
              {/* Glowing Background Effect */}
              <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-purple-500 to-blue-500 blur-lg -z-10"></div>

              {event.imageUrl && (
                <motion.img
                  src={event.imageUrl}
                  alt="Event"
                  className="w-full h-48 object-cover rounded-lg"
                  whileHover={{ scale: 1.1 }}
                />
              )}

              <h3 className="text-2xl font-bold mt-4">{event.name}</h3>
              <p className="text-gray-300 text-sm mt-2">{event.description}</p>
              <p className="text-gray-400 text-sm mt-2">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Location:</strong> {event.location}
              </p>

              <Link
                to={`/event/${event._id}`}
                className="block mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white text-center py-2 rounded-full transition-all"
              >
                View Details 🚀
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
