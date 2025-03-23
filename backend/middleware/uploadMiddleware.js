import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage (Temporary Storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // Store temporarily before Cloudinary upload
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

// Multer Middleware (Only for "image" field)
export const upload = multer({ storage }).single("image");

// Upload to Cloudinary
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    // console.log("Uploading file:", localFilePath);
    
    if (!localFilePath) {
      throw new Error("Invalid file path!");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    // console.log("Upload successful:", response.secure_url);

    fs.unlinkSync(localFilePath); // Remove local file after upload
    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Cleanup failed uploads
    }
    throw new Error("Cloudinary upload failed");
  }
};

