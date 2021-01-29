const session = require("express-session");
const db = require("../database/models");

const loginAuth = function (req, res, next) {
  if (
    req.cookies.recordarme == undefined &&
    req.session.loggedUser == undefined
  ) {
    res.redirect("/users/login");
  }
  next();
};

module.exports = loginAuth;
