var express = require("express");
var router = express.Router();
var loginAuth = require("../middlewares/loginAuth");
var adminAuth = require("../middlewares/adminAuth");
var logOff = require("../middlewares/logOff");
var users_upload = require("../middlewares/usersUpload");

const users_controller = require("../controllers/usersController");
const forms_validators = require("../middlewares/formsValidators");

router.get("/", loginAuth, adminAuth, users_controller.userList);

router.get("/create", users_controller.userCreate);
router.post(
  "/create",
  users_upload.upload,
  forms_validators.validateNewUser,
  users_controller.userCreated
);

router.get("/edit/:id", loginAuth, users_controller.userUpdate);

router.put(
  "/:id",
  loginAuth,
  users_upload.upload,
  forms_validators.validateUserEdit,
  users_controller.userUpdated
);

router.get("/logoff", logOff, users_controller.userLogOff);

router.delete("/:id", loginAuth, users_controller.userDelete);

router.get("/login", users_controller.userLogin);
router.post(
  "/login",
  forms_validators.validateLogin,
  users_controller.processLogin
);

//prueba

router.get("/check", function (req, res) {
  if (
    req.cookies.recordarme == undefined &&
    req.session.loggedUser == undefined
  ) {
    res.send("no estas logeado");
  } else if (
    req.session.loggedUser != undefined &&
    req.session.loggedUser.user_type_id == 1
  ) {
    res.send("estas logeado admin");
  } else if (
    req.cookies.recordarme != undefined ||
    req.session.loggedUser != undefined
  ) {
    res.send("estas logeado");
  }
});

router.get("/detail", users_controller.userDetail);

router.get("/adminpanel", adminAuth, users_controller.userAdmin);

router.get("/notadmin", users_controller.notAdmin);

module.exports = router;
