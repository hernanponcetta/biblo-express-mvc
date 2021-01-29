var express = require("express");
var router = express.Router();
var loginAuth = require("../middlewares/loginAuth");
var adminAuth = require("../middlewares/adminAuth");
var users_upload = require("../middlewares/usersUpload");

const cartController = require("../controllers/cartController");
const forms_validators = require("../middlewares/formsValidators");

router.get("/", loginAuth, cartController.cart);

router.post("/", cartController.buyItem);

router.put("/", loginAuth, cartController.addItem);

router.delete("/", cartController.deleteItem);

module.exports = router;
