import express from "express";
import { bookEvent, getUserBookings, cancelBooking } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

// 📌 Book an Event with Seat Selection
bookingRouter.post("/book", protect, bookEvent);  // Requires { eventId, seatNumber }

// 📌 Get All Bookings for the Logged-in User
bookingRouter.get("/my-bookings", protect, getUserBookings);

// 📌 Cancel a Booking
bookingRouter.delete("/cancel/:bookingId", protect, cancelBooking);

export default bookingRouter;
