const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

/**
 * file storage
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/../../public/images"));
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + uuid.v1() + file.originalname;
    cb(null, filename);
    req.filename = filename;
  },
});

/**
 * Filters for the file
 * restrictions: type - JPEG, PNG or GIF
 * @param file file sent by user
 * @param cb callback fn
 */
const filter = (req, file, cb) => {
  try {
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
      ? cb(null, true)
      : cb(null, false);
  } catch (err) {
    cb(new Error(err));
  }
};

module.exports = multer({
  storage: storage,
  /**
   * file size limit - 4 MB
   */
  limits: {
    fileSize: 4194304,
  },
  fileFilter: filter,
  onError: (err) => {
    res.status(500).json({ err: err });
  },
});
