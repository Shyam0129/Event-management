import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  event: {
    eventId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    maxAttendees: { type: Number, required: true },
    eventType: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    imageUrl: { type: String },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  qrCode: { type: String, required: true },
  status: { type: String, enum: ["confirmed", "canceled"], default: "confirmed" },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
