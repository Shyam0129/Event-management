import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect Routes Middleware
export const protect = async (req, res, next) => {
  let token = req.headers.authorization; // Get the token directly

  if (token) {
    try {
      // console.log("Received Token:", token);

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(decoded);
      
      // Fetch user without password
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user; // Attach user data to request
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only" });
  }
};
