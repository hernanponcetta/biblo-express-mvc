var express = require("express");
var router = express.Router();
var apiController = require("./../../controllers/api/apiController");

router.get("/products", apiController.productList);
router.get('/products/:id', apiController.productDetail);

module.exports = router;
