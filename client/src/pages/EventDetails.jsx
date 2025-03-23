import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeatMap3D from "../components/SeatMap3D"; // Importing the 3D Seating Component

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [qrCode, setQrCode] = useState(localStorage.getItem(`qrCode-${id}`) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/events/${id}`);
        setEvent(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBookNow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to log in to book a ticket.");
        return;
      }

      const { data } = await axios.post(
        `http://localhost:4000/api/bookings/book`,
        { eventId: id },
        { headers: { Authorization: `${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        if (data.qrCode) {
          setQrCode(data.qrCode);
          localStorage.setItem(`qrCode-${id}`, data.qrCode);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error booking ticket");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return <p className="text-center text-gray-400">Event not found.</p>;
  }

  const statusColors = {
    Upcoming: "bg-blue-500",
    Ongoing: "bg-green-500",
    Completed: "bg-gray-500",
    Cancelled: "bg-red-500",
  };

  return (
    <div className="bg-[#121212] min-h-screen p-6 flex justify-center items-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl bg-gray-900 bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md border border-gray-700 w-full">
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt="Event"
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
        )}
        <h2 className="text-3xl font-bold text-white">{event.name}</h2>
        <p className="text-gray-300 mt-2">{event.description}</p>

        <div className="flex flex-wrap gap-4 mt-4">
          <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[event.status]}`}>
            {event.status}
          </span>
          <span className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full">
            {event.eventType}
          </span>
          <span className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full">
            Max Attendees: {event.maxAttendees}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-gray-400">
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-400">
            <strong>Registration Deadline:</strong> {new Date(event.registrationDeadline).toLocaleDateString()}
          </p>
          <p className="text-gray-400">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-400">
            <strong>Ticket Price:</strong> {event.ticketPrice > 0 ? `$${event.ticketPrice}` : "Free"}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-gray-300"><strong>Contact Email:</strong> {event.contactEmail}</p>
          {event.contactPhone && (
            <p className="text-gray-300"><strong>Contact Phone:</strong> {event.contactPhone}</p>
          )}
        </div>

        {event.sponsors?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-white text-lg font-semibold mb-2">Sponsors:</h3>
            <div className="flex flex-wrap gap-4">
              {event.sponsors.map((sponsor, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                  {sponsor.logoUrl && (
                    <img src={sponsor.logoUrl} alt={sponsor.name} className="h-8 w-8 object-cover rounded" />
                  )}
                  <p className="text-gray-300">{sponsor.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3D Seating Arrangement */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white">Seating Arrangement</h3>
          <div className="w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
            <SeatMap3D eventId={id} />
          </div>
        </div>

        <button
          onClick={handleBookNow}
          className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg text-white mt-6 transition-all"
        >
          Book Now
        </button>

        {/* {qrCode && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white">Your Booking QR Code:</h3>
            <img src={qrCode} alt="QR Code" className="mt-2 border p-2 bg-white" />
            <a href={qrCode} download={`Event-${id}-QRCode.png`}>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Download QR Code
              </button>
            </a>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EventDetails;
