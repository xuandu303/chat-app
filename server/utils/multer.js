import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/profiles/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // ".jpg"
    cb(null, `${Date.now()}${ext}`);
  },
});

export const uploadProfileImage = multer({ storage });
