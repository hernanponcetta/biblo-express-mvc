const { check, validationResult, body } = require("express-validator");
const fs = require("fs");
const { join } = require("path");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
const { createBrotliDecompress } = require("zlib");
const session = require("express-session");
const { RSA_NO_PADDING } = require("constants");

exports.cart = function (req, res) {
  const itemsPromise = db.Items.findAll({
    where: {
      user_id: req.session.loggedUser.id,
    },
    include: [{ association: "books", include: [{ association: "autors" }] }],
  });

  let userPromise = {};

  if (req.session.loggedUser) {
    userPromise = db.Users.findByPk(req.session.loggedUser.id);
  }

  const genresPromise = db.Genres.findAll();

  Promise.all([itemsPromise, userPromise, genresPromise]).then(function ([
    items,
    user,
    genres,
  ]) {
    res.render("cart", {
      items: items,
      user: user,
      genres: genres,
    });
  });
};

exports.buyItem = function (req, res) {
  console.log(req.body);
  db.Items.findAll({
    where: {
      book_id: req.body.book_id,
      user_id: req.session.loggedUser.id,
    },
  }).then(function (items) {
    if (items.length == 0) {
      db.Items.create({
        book_id: req.body.book_id,
        user_id: req.session.loggedUser.id,
        quantity: req.body.quantity,
      }).then(function () {
        res.redirect("/cart");
      });
    } else {
      let book = items[0];
      book.quantity = req.body.quantity;
      book.save().then(function () {
        res.redirect("/cart");
      });
    }
  });
};

exports.addItem = function (req, res) {
  db.Items.findAll({
    where: {
      book_id: req.body.book_id,
      user_id: req.session.loggedUser.id,
    },
  }).then(function (items) {
    if (items.length == 0) {
      db.Items.create({
        book_id: req.body.book_id,
        user_id: req.session.loggedUser.id,
        quantity: req.body.quantity,
      }).then(function () {
        res.redirect(`/products/${req.body.book_id}`);
      });
    } else {
      let book = items[0];
      book.quantity = req.body.quantity;
      book.save().then(function () {
        res.redirect(`/products/${req.body.book_id}`);
      });
    }
  });
};

exports.deleteItem = function (req, res) {
  db.Items.destroy({
    where: {
      book_id: req.body.item_id,
      user_id: req.session.loggedUser.id,
    },
  }).then(function () {
    res.redirect("/cart");
  });
};
