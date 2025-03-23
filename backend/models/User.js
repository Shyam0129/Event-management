import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Role-based access
  // image_id: { type: String, default: "https://example.com/default-profile.png" }, // Profile Image
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
