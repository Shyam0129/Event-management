import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
} from "../controllers/eventController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const eventRouter = express.Router();

eventRouter.post("/", protect, isAdmin, upload, createEvent); // Upload image inside controller
eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventById);
eventRouter.put("/:id", protect, isAdmin, upload, updateEvent); // Update event with image
eventRouter.delete("/:id", protect, isAdmin, deleteEvent);
// eventRouter.post("/:id/register", protect, registerForEvent);

export default eventRouter;
