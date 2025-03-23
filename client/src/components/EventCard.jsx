import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl font-semibold">{event.name}</h2>
      <p className="text-gray-600">{event.date}</p>
      <Link to={`/event/${event._id}`} className="mt-2 block bg-blue-500 text-white px-4 py-2 rounded text-center">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
