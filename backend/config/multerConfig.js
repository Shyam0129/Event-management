// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

// // 🔹 Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // 🔹 Configure Multer Storage with Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "./event-images", // Cloudinary folder name
//     format: async (req, file) => "jpg", // Convert to JPG
//     public_id: (req, file) => file.originalname.split(".")[0], // Use original filename
//   },
// });

// const upload = multer({ storage });

// export default upload;
