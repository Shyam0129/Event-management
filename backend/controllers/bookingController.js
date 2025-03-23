import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import QRCode from "qrcode";

export const bookEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id; // Get user ID from authenticated token

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if the user already booked the event
    const existingBooking = await Booking.findOne({ user: userId, "event.eventId": eventId });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "You have already booked this event" });
    }

    // Generate a Unique QR Code (contains user ID + event ID)
    const qrData = `User: ${userId}, Event: ${eventId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    // Create and save booking with full event details
    const booking = new Booking({
      event: {
        eventId: event._id,
        name: event.name,
        description: event.description,
        date: event.date,
        location: event.location,
        ticketPrice: event.ticketPrice,
        maxAttendees: event.maxAttendees,
        eventType: event.eventType,
        contactEmail: event.contactEmail,
        contactPhone: event.contactPhone || "N/A", // Handle undefined phone number
        imageUrl: event.imageUrl,
      },
      user: userId,
      qrCode,
      status: "confirmed",
    });

    await booking.save();
    res.status(201).json({ success: true, message: "Booking successful", qrCode });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// 📌 Get User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate("event", "title date location");
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Fetch Bookings Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id; // Extracted from the `protect` middleware

    // Find the booking and ensure it belongs to the logged-in user
    const booking = await Booking.findOne({ _id: bookingId, user: userId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or unauthorized." });
    }

    // Delete the booking
    await Booking.deleteOne({ _id: bookingId });

    // Increment the available seats for the event
    await Event.findByIdAndUpdate(booking.event, { $inc: { availableSeats: 1 } });

    res.json({ success: true, message: "Booking canceled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error canceling booking", error: error.message });
  }
};