const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/users_photo");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.first_name
        .toLowerCase()
        .split(" ")
        .join("")
        .replace(/[^\w\s]|_/g, "") +
        req.body.last_name
          .toLowerCase()
          .split(" ")
          .join("")
          .replace(/[^\w\s]|_/g, "") +
        path.extname(file.originalname)
    );
  },
});

exports.upload = multer({ storage: storage }).any();
