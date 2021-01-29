var express = require("express");
var router = express.Router();
var loginAuth = require("../middlewares/loginAuth");
var adminAuth = require("../middlewares/adminAuth");
var users_upload = require("../middlewares/usersUpload");

const purchaseController = require("../controllers/purchaseController");
const forms_validators = require("../middlewares/formsValidators");

router.post("/", purchaseController.newPurchase);

router.get("/checkmark", purchaseController.checkMark);

module.exports = router;
