var express = require("express");
var router = express.Router();
var loginAuth = require("../middlewares/loginAuth");
var adminAuth = require("../middlewares/adminAuth");

var products_controller = require("../controllers/productsController");
var forms_validators = require("../middlewares/formsValidators");
var products_upload = require("../middlewares/productsUpload");

router.get("/", loginAuth, adminAuth, products_controller.productList);

// Rutas para crear producto
router.get("/create", loginAuth, adminAuth, products_controller.productCreate);

router.post(
  "/create",
  adminAuth,
  products_upload.upload,
  forms_validators.validateNewBook,
  products_controller.productCreated
);

router.get("/search", products_controller.productSearch);

// Rutas para detalle
router.get("/:id", products_controller.productDetail);

router.get("/:id/edit", adminAuth, products_controller.productUpDate);

router.put(
  "/:id",
  adminAuth,
  products_upload.upload,
  forms_validators.validateNewBook,
  products_controller.productUpdated
);

router.delete("/:id", adminAuth, products_controller.productDelete);

module.exports = router;
