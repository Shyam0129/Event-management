import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
    eventType: "Conference",
    status: "Upcoming",
    registrationDeadline: "",
    ticketPrice: "",
    contactEmail: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/events", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });

      setMessage("✅ Event created successfully!");
      setFormData({
        name: "",
        description: "",
        date: "",
        location: "",
        maxAttendees: "",
        eventType: "Conference",
        status: "Upcoming",
        registrationDeadline: "",
        ticketPrice: "",
        contactEmail: "",
        image: null,
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error creating event");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="mt-8 max-w-3xl w-full mx-4 p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">🎟️ Create Event</h2>

        {message && (
          <p className={`mb-4 text-center font-medium ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-400">Event Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter event name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white placeholder-gray-500 hover:bg-gray-700 transition duration-200 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-400">Description</label>
            <textarea
              name="description"
              placeholder="Brief event description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white placeholder-gray-500 hover:bg-gray-700 transition duration-200 focus:ring-2 focus:ring-green-400 outline-none"
              rows="4"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-400">Event Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white hover:bg-gray-700 transition duration-200 focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400">Registration Deadline</label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white hover:bg-gray-700 transition duration-200 focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-400">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Event location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white placeholder-gray-500 hover:bg-gray-700 transition duration-200 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-400">Max Attendees</label>
              <input
                type="number"
                name="maxAttendees"
                placeholder="Number of attendees"
                value={formData.maxAttendees}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white placeholder-gray-500 hover:bg-gray-700 transition duration-200 focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400">Ticket Price ($)</label>
              <input
                type="number"
                name="ticketPrice"
                placeholder="Enter price"
                value={formData.ticketPrice}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white placeholder-gray-500 hover:bg-gray-700 transition duration-200 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-400">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              placeholder="Enter contact email"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white placeholder-gray-500 hover:bg-gray-700 transition duration-200 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-400">Upload Event Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 rounded border border-gray-600 text-white focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 p-3 rounded text-white font-semibold transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating Event..." : "🚀 Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

