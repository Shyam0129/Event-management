import Event from "../models/Event.js";
import { uploadOnCloudinary } from "../middleware/uploadMiddleware.js";

// ✅ Create Event (Admin Only)
export const createEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      location,
      maxAttendees,
      eventType,
      status,
      registrationDeadline,
      ticketPrice,
      contactEmail,
    } = req.body;

    // Validate status enum
    const validStatus = ["Upcoming", "Ongoing", "Completed", "Cancelled"];
    if (status && !validStatus.includes(status.trim())) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    // Upload image to Cloudinary
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    // Create new event
    const event = new Event({
      name,
      description,
      date,
      location,
      maxAttendees,
      eventType,
      status: status.trim(),
      registrationDeadline,
      ticketPrice,
      contactEmail,
      imageUrl,
      organizer: req.user._id,
    });

    await event.save();

    res.status(201).json({ success: true, message: "Event created successfully!", event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while creating event", error: error.message });
  }
};

// ✅ Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// ✅ Get Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// ✅ Update Event (Admin Only)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can update events." });
    }

    // Upload new image if provided
    let imageUrl = event.imageUrl;
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    // Update event fields
    Object.assign(event, req.body, { imageUrl });
    await event.save();
    res.status(200).json({ success: true, message: "Event updated successfully!", event });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

// ✅ Delete Event (Admin Only)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete events." });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

// ✅ Register User for an Event
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: "You are already registered for this event." });
    }

    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ message: "Event registration is full." });
    }

    event.attendees.push(req.user._id);
    await event.save();
    res.status(200).json({ message: "Successfully registered for the event." });
  } catch (error) {
    res.status(500).json({ message: "Error registering for event", error: error.message });
  }
};