import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import AdminProfilePage from "./pages/AdminProfilePage";
import Navbar from "./components/Navbar";
import ManageEvents from "./pages/ManageEvents";
import UserProfile from "./pages/UserProfilePage";
import MyBookings from "./pages/MyBookings";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Event Management */}
          <Route path="/events" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />

          {/* Profile Route (Handles Authentication Inside) */}
          <Route path="/admin-profile" element={<AdminProfilePage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/my-bookings" element={<MyBookings />} />



          {/* Admin Routes (Handles Role-Based Access Inside the Page) */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-events" element={<CreateEvent />} />
          <Route path="/admin/manage-events" element={<ManageEvents />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
