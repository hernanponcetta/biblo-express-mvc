const { check, validationResult, body } = require("express-validator");
const fs = require("fs");
const { join } = require("path");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
const { createBrotliDecompress } = require("zlib");
const session = require("express-session");

exports.newPurchase = function (req, res) {
  db.Purchase.create({
    user_id: req.session.loggedUser.id,
    total: req.body.total,
  }).then((purchase) => {
    Object.entries(req.body.detail).forEach((ent) => {
      db.BooksPurchase.create({
        purchase_id: purchase.id,
        book_id: ent[0],
        quantity: ent[1],
      });
    });
    db.Items.destroy({
      where: {
        user_id: req.session.loggedUser.id,
      },
    });
  });
};

exports.checkMark = function (req, res) {
  let itemsPromise = [];
  let userPromise = {};

  if (req.session.loggedUser) {
    itemsPromise = db.Items.findAll({
      where: {
        user_id: req.session.loggedUser.id,
      },
    });
    userPromise = db.Users.findByPk(req.session.loggedUser.id);
  }

  const genresPromise = db.Genres.findAll();

  Promise.all([genresPromise, itemsPromise, userPromise]).then(function ([
    genres,
    items,
    user,
  ]) {
    res.render("checkmark", {
      msg: "Compra realizada con exito",
      genres: genres,
      items: items,
      user: user,
    });
  });
};
