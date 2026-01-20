import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const sanitizeFileName = (originalName) => {
  const ext = path.extname(originalName);
  const safeName = path
    .basename(originalName, ext)
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "");

  return {
    ext,
    name: safeName || "file",
  };
};

const profileDir = "uploads/profiles";
ensureDir(profileDir);

const profileStorage = multer.diskStorage({
  destination: profileDir,
  filename: (req, file, cb) => {
    const { name, ext } = sanitizeFileName(file.originalname);
    cb(null, `${name}_${Date.now()}${ext}`);
  },
});

export const uploadProfileImage = multer({ storage: profileStorage });

const filesDir = "uploads/files";
ensureDir(filesDir);

const fileStorage = multer.diskStorage({
  destination: filesDir,
  filename: (req, file, cb) => {
    const { name, ext } = sanitizeFileName(file.originalname);
    cb(null, `${name}_${Date.now()}${ext}`);
  },
});

export const uploadMessageFile = multer({ storage: fileStorage });
