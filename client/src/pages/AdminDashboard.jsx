import { useState, useEffect } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 15,
    totalAttendees: 1200,
    revenue: 8500,
    upcomingEvents: 5,
  });

  const [recentRegistrations, setRecentRegistrations] = useState([
    { attendeeName: "John Doe", eventName: "Tech Conference 2025", date: "2025-03-21" },
    { attendeeName: "Alice Smith", eventName: "AI Workshop", date: "2025-03-20" },
    { attendeeName: "Bob Johnson", eventName: "Startup Meetup", date: "2025-03-19" },
    { attendeeName: "Emily Davis", eventName: "Cloud Computing Bootcamp", date: "2025-03-18" },
    { attendeeName: "Michael Brown", eventName: "Cybersecurity Summit", date: "2025-03-17" },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-green-400 text-center">📊 Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-lg">Loading stats...</p>
      ) : (
        <>
          {/* 🔹 Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Events" value={stats.totalEvents} icon="🎟️" />
            <StatCard title="Total Attendees" value={stats.totalAttendees} icon="👥" />
            <StatCard title="Revenue" value={`$${stats.revenue}`} icon="💰" />
            <StatCard title="Upcoming Events" value={stats.upcomingEvents} icon="📅" />
          </div>

          {/* 🔹 Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-5 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-3">📈 Event Registrations Trend</h2>
              <Line data={eventTrendData} />
            </div>

            <div className="bg-gray-900 p-5 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-3">📊 Ticket Sales Breakdown</h2>
              <Doughnut data={ticketSalesData} />
            </div>
          </div>

          {/* 🔹 Recent Registrations */}
          <div className="bg-gray-900 p-5 mt-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">🆕 Recent Registrations</h2>
            <table className="w-full text-left border border-gray-700">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="p-3">Attendee</th>
                  <th className="p-3">Event</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.map((reg, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="p-3">{reg.attendeeName}</td>
                    <td className="p-3">{reg.eventName}</td>
                    <td className="p-3">{new Date(reg.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

/* 🔹 Stats Card Component */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
    <span className="text-4xl">{icon}</span>
    <h3 className="text-lg font-semibold mt-2">{title}</h3>
    <p className="text-2xl font-bold text-green-400">{value}</p>
  </div>
);

/* 🔹 Sample Chart Data */
const eventTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Registrations",
      data: [50, 80, 120, 180, 200, 250],
      borderColor: "green",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      tension: 0.4,
    },
  ],
};

const ticketSalesData = {
  labels: ["Standard", "VIP", "Premium"],
  datasets: [
    {
      label: "Tickets Sold",
      data: [300, 150, 80],
      backgroundColor: ["#34D399", "#10B981", "#059669"],
    },
  ],
};

export default AdminDashboard;
