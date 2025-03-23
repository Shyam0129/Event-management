import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    maxAttendees: { type: Number, required: true },
    eventType: {
      type: String,
      enum: ["Conference", "Workshop", "Meetup", "Seminar", "Hackathon", "Concert", "Other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },
    registrationDeadline: { type: Date, required: true },
    ticketPrice: { type: Number, default: 0 },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    
    // 🔹 New Image Field
    imageUrl: { type: String }, // Stores Cloudinary URL
    
    sponsors: [{ name: String, logoUrl: String }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
