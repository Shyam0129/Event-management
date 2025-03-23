import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You need to log in to view bookings.");
          return;
        }

        const response = await axios.get(`http://localhost:4000/api/bookings/my-bookings`, {
          headers: { Authorization: `${token}` },
        });
        setBookings(response.data.bookings);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to log in to cancel a booking.");
        return;
      }

      await axios.delete(`http://localhost:4000/api/bookings/cancel/${bookingId}`, {
        headers: { Authorization: `${token}` },
      });

      toast.success("Booking canceled successfully.");
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error canceling booking.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen p-6 flex flex-col items-center animate-fadeIn">
      <h2 className="text-4xl font-bold text-white text-center mb-8">📅 My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No bookings found.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative bg-gray-900 bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-10 rounded-xl pointer-events-none"></div>

              {/* Event Image */}
              {booking.event.imageUrl && (
                <img
                  src={booking.event.imageUrl}
                  alt="Event"
                  className="w-full h-52 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                />
              )}

              {/* Event Name & Description */}
              <h3 className="text-2xl font-semibold text-white">{booking.event.name}</h3>
              <p className="text-gray-300 mt-2">{booking.event.description}</p>

              {/* Event Details */}
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full shadow-md">
                  📅 {new Date(booking.event.date).toLocaleDateString()}
                </span>
                <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full shadow-md">
                  📍 {booking.event.location}
                </span>
                <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full shadow-md">
                  🎟️ {booking.event.ticketPrice > 0 ? `$${booking.event.ticketPrice}` : "Free"}
                </span>
                <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full shadow-md">
                  👥 Max Attendees: {booking.event.maxAttendees}
                </span>
                <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full shadow-md">
                  📌 {booking.event.eventType}
                </span>
              </div>

              {/* Contact Details */}
              <div className="mt-4">
                <p className="text-gray-300">
                  📧 <strong>Email:</strong> {booking.event.contactEmail}
                </p>
                {booking.event.contactPhone && (
                  <p className="text-gray-300">
                    📞 <strong>Phone:</strong> {booking.event.contactPhone}
                  </p>
                )}
              </div>

              {/* QR Code Section */}
              {booking.qrCode && (
                <div className="mt-6 text-center">
                  <h4 className="text-white text-lg font-semibold">📌 Your QR Code:</h4>
                  <img
                    src={booking.qrCode}
                    alt="QR Code"
                    className="mt-2 border p-2 bg-white rounded-lg transform hover:rotate-3 hover:scale-105 transition-all duration-300"
                  />
                  <a href={booking.qrCode} download={`Booking-${booking._id}-QRCode.png`}>
                    <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition">
                      Download QR Code
                    </button>
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6">
                <Link to={`/event/${booking.event.eventId}`}>
                  <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg text-white transition-all transform hover:scale-105">
                    View Event
                  </button>
                </Link>

                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg text-white transition-all transform hover:scale-105"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
