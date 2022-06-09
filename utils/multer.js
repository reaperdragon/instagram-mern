import multer from "multer";
import path from "path";

const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, res, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".svg" &&
      ext !== ".webp"
    ) {
      cb(new Error("File type is not Supported"), false);
      return;
    }
    cb(null, true);
  },
});

export default multerConfig;
