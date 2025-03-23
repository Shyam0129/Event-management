import { useState, useEffect } from "react";
import axios from "axios";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/events", {
          headers: { Authorization: `${token}` },
        });

        setEvents(response.data);
      } catch (error) {
        setError("❌ Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 📌 Handle Delete
  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setDeleting(eventId);

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/events/${eventId}`, {
        headers: { Authorization: `${token}` },
      });

      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      setError("❌ Failed to delete event. Please try again.");
    }

    setDeleting(null);
  };

  // 📌 Enable Editing Mode
  const handleEdit = (event) => {
    setEditingEventId(event._id);
    setEditedEvent(event);
  };

  // 📌 Handle Input Change
  const handleChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  // 📌 Save Edited Event
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/events/${editingEventId}`,
        editedEvent,
        {
          headers: { Authorization: `${token}` },
        }
      );

      setEvents(events.map((event) => (event._id === editingEventId ? editedEvent : event)));
      setEditingEventId(null);
    } catch (error) {
      setError("❌ Failed to update event. Please try again.");
    }
  };

  // 📌 Cancel Editing
  const handleCancel = () => {
    setEditingEventId(null);
    setEditedEvent({});
  };

  if (loading)
    return <div className="text-white text-center mt-10">Loading events...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto bg-gray-950 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-green-400 text-center">
          🎟 Manage Events
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-400 text-center">No events found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-gray-900 border border-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-green-400 text-lg">
                  <th className="p-4 text-left">Event</th>
                  <th className="p-4 text-center">Date</th>
                  <th className="p-4 text-center">Location</th>
                  <th className="p-4 text-center">Max Attendees</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event._id}
                    className="border-b border-gray-800 bg-gray-900 hover:bg-gray-800"
                  >
                    <td className="p-4 flex items-center space-x-4">
                      <img
                        src={event.imageUrl || "/default-event.jpg"}
                        alt={event.name}
                        className="w-14 h-14 object-cover rounded-md shadow-md"
                      />
                      <div className="flex flex-col">
                        {editingEventId === event._id ? (
                          <input
                            type="text"
                            name="name"
                            value={editedEvent.name}
                            onChange={handleChange}
                            className="bg-gray-800 text-white p-2 rounded w-40"
                          />
                        ) : (
                          <p className="font-semibold">{event.name}</p>
                        )}

                        <p className="text-gray-400 text-sm truncate w-60">
                          {event.description}
                        </p>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      {editingEventId === event._id ? (
                        <input
                          type="date"
                          name="date"
                          value={editedEvent.date.split("T")[0]}
                          onChange={handleChange}
                          className="bg-gray-800 text-white p-2 rounded"
                        />
                      ) : (
                        new Date(event.date).toLocaleDateString()
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {editingEventId === event._id ? (
                        <input
                          type="text"
                          name="location"
                          value={editedEvent.location}
                          onChange={handleChange}
                          className="bg-gray-800 text-white p-2 rounded"
                        />
                      ) : (
                        event.location
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {editingEventId === event._id ? (
                        <input
                          type="number"
                          name="maxAttendees"
                          value={editedEvent.maxAttendees}
                          onChange={handleChange}
                          className="bg-gray-800 text-white p-2 rounded w-20"
                        />
                      ) : (
                        event.maxAttendees
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {editingEventId === event._id ? (
                        <select
                          name="status"
                          value={editedEvent.status}
                          onChange={handleChange}
                          className="bg-gray-800 text-white p-2 rounded"
                        >
                          <option value="Upcoming">Upcoming</option>
                          <option value="Completed">Completed</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded text-sm ${event.status === "Upcoming"
                              ? "bg-blue-600 text-white"
                              : "bg-red-600 text-white"
                            }`}
                        >
                          {event.status}
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {editingEventId === event._id ? (
                        <input
                          type="number"
                          name="ticketPrice"
                          value={editedEvent.ticketPrice}
                          onChange={handleChange}
                          className="bg-gray-800 text-white p-2 rounded w-20"
                        />
                      ) : (
                        `$${event.ticketPrice}`
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex justify-center space-x-3">
                        {editingEventId === event._id ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                            >
                              ✅ Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
                            >
                              ❌ Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(event)}
                              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(event._id)}
                              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                            >
                              🗑 Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
