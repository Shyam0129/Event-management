import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
// import { upload } from "../middleware/uploadMiddleware.js";


const authRouter = express.Router();

authRouter.post("/register", registerUser);  // User Registration
authRouter.post("/login", loginUser);        // User Login
authRouter.get("/profile", protect, getUserProfile); // Get User Profile (Protected Route)

export default authRouter;
