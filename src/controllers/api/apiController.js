const { check, validationResult, body } = require("express-validator");
const fs = require("fs");
const { join } = require("path");
const path = require("path");
const db = require("../../database/models");
const { Op } = require("sequelize");

exports.productList = function (req, res) {
  db.Books.findAll({
    attributes: ["id", "title", "sinopsis", "genre_id", "price", "book_cover"],
    include: [
      { association: "genres", attributes: ["name"] }
    ],
  }).then(function (books) {
    let response = {
      meta: {
        status: 200,
        count: books.length,
        url: "/api/products",
      },
      data: books
    };
    res.json(response);
  });
};

exports.productDetail = function (req, res) {
  db.Books.findByPk(req.params.id, {
    include: [
      { association: "genres" },
      { association: "autors" },
      { association: "houses" },
      { association: "states" },
    ],
  }).then(function (books) {
    let response = {
      meta: {
        status: 200,
        url: "/api/products/" + req.params.id,
      },
      data: [{img: '/public/portadas/' + books.book_cover,
              properties: books
      }]
    };
    res.json(response);
  });
};

exports.userList = function (req, res) {
  db.Users.findAll({
    attributes: ["id", "first_name", "email", "user_type_id"],
  }).then(function (users) {
    let response = {
      meta: {
        status: 200,
        count: users.length,
        url: "/api/users"
      },
      data: users
    };
    res.json(response);
  });
};

exports.userDetail = function (req, res) {
  db.Users.findByPk(req.params.id, {
    attributes: ["id", "first_name", "email", "user_photo"],
  }).then(function (users) {
    let response = {
      meta: {
        status: 200,
        url: "/api/users/" + req.params.id,
        profile_pic: '/public/users_photo/' + users.user_photo
      },
      data: users
    };
    res.json(response);
  });
};


