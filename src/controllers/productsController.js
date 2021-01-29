const { check, validationResult, body } = require("express-validator");
const fs = require("fs");
const { join } = require("path");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
const { createBrotliDecompress } = require("zlib");
const session = require("express-session");

exports.productList = function (req, res) {
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

  const booksPromise = db.Books.findAll({
    include: [
      { association: "genres" },
      { association: "autors" },
      { association: "houses" },
      { association: "states" },
    ],
  });

  const genresPromise = db.Genres.findAll();

  Promise.all([booksPromise, genresPromise, itemsPromise, userPromise]).then(
    function ([books, genres, items, user]) {
      res.render("productslist", {
        books: books,
        genres: genres,
        items: items,
        user: user,
      });
    }
  );
};

exports.productDetail = function (req, res) {
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

  const bookPromise = db.Books.findByPk(req.params.id, {
    include: [
      { association: "genres" },
      { association: "autors" },
      { association: "houses" },
      { association: "states" },
    ],
  });

  Promise.all([bookPromise, genresPromise, itemsPromise, userPromise]).then(
    function ([book, genres, items, user]) {
      res.render("productdetail", {
        book: book,
        genres: genres,
        items: items,
        user: user,
      });
    }
  );
};

exports.productCreate = function (req, res) {
  let genresPromise = db.Genres.findAll();
  let autorsPromise = db.Autors.findAll();
  let housesPromise = db.Houses.findAll();
  let statesPromise = db.States.findAll();

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

  Promise.all([
    genresPromise,
    autorsPromise,
    housesPromise,
    statesPromise,
    userPromise,
    itemsPromise,
  ]).then(function ([genres, autors, houses, states, user, items]) {
    res.render("productcreate", {
      genres: genres,
      autors: autors,
      houses: houses,
      states: states,
      errors: {},
      data: {},
      user: user,
      items: items,
    });
  });
};

exports.productCreated = function (req, res) {
  errors = validationResult(req);
  let book_cover;
  if (req.files.length > 0) {
    book_cover = req.files[0].filename;
  } else {
    book_cover = null;
  }
  if (errors.isEmpty()) {
    db.Books.create({
      title: req.body.title,
      autor_id: req.body.autor_id,
      house_id: req.body.house_id,
      genre_id: req.body.genre_id,
      isbn: req.body.isbn,
      price: req.body.price,
      state_id: req.body.state_id,
      amount: req.body.amount,
      sinopsis: req.body.sinopsis,
      book_cover: book_cover,
    });

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

    Promise.all([itemsPromise, userPromise, genresPromise]).then(function ([
      items,
      user,
      genres,
    ]) {
      res.render("checkmark", {
        msg: "Libro creado con exito!",
        items: items,
        user: user,
        genres: genres,
      });
    });
  } else {
    let genresPromise = db.Genres.findAll();
    let autorsPromise = db.Autors.findAll();
    let housesPromise = db.Houses.findAll();
    let statesPromise = db.States.findAll();

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

    Promise.all([
      genresPromise,
      autorsPromise,
      housesPromise,
      statesPromise,
      userPromise,
      itemsPromise,
    ]).then(function ([genres, autors, houses, states, user, items]) {
      res.render("productcreate", {
        genres: genres,
        autors: autors,
        houses: houses,
        states: states,
        errors: errors.mapped(),
        data: req.body,
        user: user,
        items: items,
      });
    });
  }
};

exports.productUpDate = function (req, res) {
  let bookPromise = db.Books.findByPk(req.params.id);
  let genresPromise = db.Genres.findAll();
  let autorsPromise = db.Autors.findAll();
  let housesPromise = db.Houses.findAll();
  let statesPromise = db.States.findAll();

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

  Promise.all([
    bookPromise,
    genresPromise,
    autorsPromise,
    housesPromise,
    statesPromise,
    itemsPromise,
    userPromise,
  ]).then(function ([book, genres, autors, houses, states, items, user]) {
    res.render("productupdate", {
      genres: genres,
      autors: autors,
      houses: houses,
      states: states,
      errors: {},
      data: book,
      items: items,
      user: user,
    });
  });
};

exports.productUpdated = function (req, res) {
  errors = validationResult(req);
  let book_cover;
  if (req.files.length > 0) {
    book_cover = req.files[0].filename;
  } else {
    book_cover = req.body.book_cover;
  }
  if (errors.isEmpty()) {
    db.Books.update(
      {
        title: req.body.title,
        autor_id: req.body.autor_id,
        house_id: req.body.house_id,
        genre_id: req.body.genre_id,
        isbn: req.body.isbn,
        price: req.body.price,
        state_id: req.body.state_id,
        amount: req.body.amount,
        sinopsis: req.body.sinopsis,
        book_cover: book_cover,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
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

    Promise.all([itemsPromise, userPromise, genresPromise]).then(function ([
      items,
      user,
      genres,
    ]) {
      res.render("checkmark", {
        msg: "Libro modificado con exito!",
        items: items,
        genres: genres,
        user: user,
      });
    });
  } else {
    console.log(errors);
    let genresPromise = db.Genres.findAll();
    let autorsPromise = db.Autors.findAll();
    let housesPromise = db.Houses.findAll();
    let statesPromise = db.States.findAll();

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

    Promise.all([
      genresPromise,
      autorsPromise,
      housesPromise,
      statesPromise,
      itemsPromise,
      userPromise,
    ]).then(function ([genres, autors, houses, states, items, user]) {
      res.render("productcreate", {
        genres: genres,
        autors: autors,
        houses: houses,
        states: states,
        errors: errors.mapped(),
        data: req.body,
        items: items,
        user: user,
      });
    });
  }
};

exports.productDelete = function (req, res) {
  db.Books.destroy({
    where: {
      id: req.params.id,
    },
  });

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

  Promise.all([itemsPromise, userPromise, genresPromise]).then(function ([
    items,
    user,
    genres,
  ]) {
    res.render("checkmark", {
      msg: "Libro eliminado con exito!",
      items: items,
      user: user,
      genres: genres,
    });
  });
};

exports.productSearch = function (req, res) {
  const booksPromise = db.Books.findAll({
    where: {
      [Op.or]: [
        { title: { [db.Sequelize.Op.substring]: req.query.search_field } },
        { isbn: { [db.Sequelize.Op.substring]: req.query.search_field } },
        {
          "$autors.name$": {
            [db.Sequelize.Op.substring]: req.query.search_field,
          },
        },
        {
          "$houses.name$": {
            [db.Sequelize.Op.substring]: req.query.search_field,
          },
        },
        {
          "$genres.name$": {
            [db.Sequelize.Op.substring]: req.query.search_field,
          },
        },
      ],
    },
    include: [
      { association: "genres" },
      { association: "autors" },
      { association: "houses" },
      { association: "states" },
    ],
  });

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

  Promise.all([booksPromise, itemsPromise, userPromise, genresPromise]).then(
    function ([books, items, user, genres]) {
      res.render("search", {
        books: books,
        items: items,
        user: user,
        genres: genres,
      });
    }
  );
};
