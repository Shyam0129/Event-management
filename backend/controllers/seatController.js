import Seat from "../models/Seat.js";
import Event from "../models/Event.js";

// 📌 Get All Seats for an Event
export const getSeats = async (req, res) => {
  try {
    const { eventId } = req.params;
    const seats = await Seat.find({ event: eventId });
    res.status(200).json({ success: true, seats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching seats" });
  }
};

// 📌 Reset Seats (for Testing)
export const resetSeats = async (req, res) => {
  try {
    const { eventId } = req.params;
    await Seat.updateMany({ event: eventId }, { status: "available", bookedBy: null });
    res.status(200).json({ success: true, message: "Seats reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error resetting seats" });
  }
};
