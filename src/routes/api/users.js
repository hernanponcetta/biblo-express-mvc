var express = require("express");
var router = express.Router();
var apiController = require("./../../controllers/api/apiController");

router.get("/users", apiController.userList);
router.get('/users/:id', apiController.userDetail);

module.exports = router;
