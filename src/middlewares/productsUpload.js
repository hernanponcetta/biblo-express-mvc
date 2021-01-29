// https://www.npmjs.com/package/multer

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "portada") {
      cb(null, "public/portadas");
    } else {
      cb(null, "public/fotos_autores");
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname == "portada") {
      cb(
        null,
        req.body.title
          .toLowerCase()
          .split(" ")
          .join("")
          .replace(/[^\w\s]|_/g, "") + path.extname(file.originalname)
      );
    } else {
      cb(
        null,
        req.body.autor.toLowerCase().split(" ").join("") +
          path.extname(file.originalname)
      );
    }
  },
});

exports.upload = multer({ storage: storage }).any();
