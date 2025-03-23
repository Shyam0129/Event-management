import express from "express";
import { getSeats, resetSeats } from "../controllers/seatController.js";

const seatRouter = express.Router();

// 📌 Get All Seats for an Event
seatRouter.get("/:eventId", getSeats);

// 📌 Reset Seats (for testing)
seatRouter.post("/reset/:eventId", resetSeats);

export default seatRouter;
