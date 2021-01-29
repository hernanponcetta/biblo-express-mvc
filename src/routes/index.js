var express = require("express");
var router = express.Router();
var indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.indexBooks);

router.get("/:id", indexController.booksByGenre);

module.exports = router;
