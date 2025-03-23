import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  seatNumber: { type: String, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});

const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
