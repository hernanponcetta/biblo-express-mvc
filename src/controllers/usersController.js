const { check, validationResult, body } = require("express-validator");
const db = require("../database/models");
const bcrypt = require("bcrypt");
const session = require("express-session");

exports.userList = function (req, res) {
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

  const usersPromise = db.Users.findAll({
    include: { association: "userstypes" },
  });

  Promise.all([usersPromise, genresPromise, itemsPromise, userPromise]).then(
    function ([users, genres, items, user]) {
      res.render("userslist", {
        users: users,
        genres: genres,
        items: items,
        user: user,
      });
    }
  );
};

exports.userCreate = function (req, res) {
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

  const usersTypePromise = db.Userstypes.findAll();

  Promise.all([
    usersTypePromise,
    genresPromise,
    itemsPromise,
    userPromise,
  ]).then(function ([types, genres, items, user]) {
    res.render("usercreate", {
      types: types,
      errors: {},
      data: {},
      genres: genres,
      items: items,
      user: user,
    });
  });
};

exports.userCreated = function (req, res) {
  errors = validationResult(req);
  let user_photo;
  if (req.files.length > 0) {
    user_photo = req.files[0].filename;
  } else {
    user_photo = "default-avatar.png";
  }
  let passwordHash = bcrypt.hashSync(req.body.password, 10);
  if (errors.isEmpty()) {
    db.Users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dni: req.body.dni,
      birth: req.body.birth,
      address: req.body.address,
      cp: req.body.cp,
      email: req.body.email,
      user_type_id: req.body.user_type_id,
      password: passwordHash,
      user_photo: user_photo,
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

    const booksPromise = db.Books.findAll({
      include: [
        { association: "genres" },
        { association: "autors" },
        { association: "houses" },
        { association: "states" },
      ],
    });

    const genresPromise = db.Genres.findAll();

    Promise.all([genresPromise, itemsPromise, userPromise]).then(function ([
      genres,
      items,
      user,
    ]) {
      res.render("checkmark", {
        msg: "Usuario creado con éxito",
        genres: genres,
        items: items,
        user: user,
      });
    });
  } else {
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

    const usersTypePromise = db.Userstypes.findAll();

    Promise.all([
      usersTypePromise,
      genresPromise,
      itemsPromise,
      userPromise,
    ]).then(function ([types, genres, items, user]) {
      res.render("usercreate", {
        types: types,
        errors: errors.mapped(),
        data: req.body,
        genres: genres,
        items: items,
        user: user,
      });
    });
  }
};

exports.userUpdate = function (req, res) {
  let userPromise = db.Users.findByPk(req.session.loggedUser.id);

  let typesPromise = db.Userstypes.findAll();

  let itemsPromise = [];

  if (req.session.loggedUser) {
    itemsPromise = db.Items.findAll({
      where: {
        user_id: req.session.loggedUser.id,
      },
    });
  }

  const genresPromise = db.Genres.findAll();
  const userUpdatePromise = db.Users.findByPk(req.params.id);

  Promise.all([
    userPromise,
    typesPromise,
    itemsPromise,
    genresPromise,
    userUpdatePromise,
  ]).then(function ([user, types, items, genres, userUpdate]) {
    res.render("userupdate", {
      types: types,
      user: user,
      errors: {},
      items: items,
      genres: genres,
      userUpdate: userUpdate,
    });
  });
};

exports.userUpdated = function (req, res) {
  errors = validationResult(req);
  let user_photo;
  if (req.files.length > 0) {
    user_photo = req.files[0].filename;
  } else {
    user_photo = req.body.old_photo;
  }
  if (errors.isEmpty()) {
    db.Users.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dni: req.body.dni,
        email: req.body.email,
        address: req.body.address,
        birth: req.body.birth,
        user_type_id: req.body.user_type_id,
        cp: req.body.cp,
        user_photo: user_photo,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(function () {
      let userPromise = db.Users.findByPk(req.session.loggedUser.id);

      let itemsPromise = [];

      if (req.session.loggedUser) {
        itemsPromise = db.Items.findAll({
          where: {
            user_id: req.session.loggedUser.id,
          },
        });
      }

      const genresPromise = db.Genres.findAll();

      Promise.all([userPromise, itemsPromise, genresPromise]).then(function ([
        user,
        items,
        genres,
      ]) {
        res.render("checkmark", {
          msg: "Usuario modificado con éxito",
          user: user,
          items: items,
          genres: genres,
        });
      });
    });
  } else {
    let userPromise = db.Users.findByPk(req.session.loggedUser.id);
    let typesPromise = db.Userstypes.findAll();

    let itemsPromise = [];

    if (req.session.loggedUser) {
      itemsPromise = db.Items.findAll({
        where: {
          user_id: req.session.loggedUser.id,
        },
      });
    }

    const genresPromise = db.Genres.findAll();

    Promise.all([userPromise, typesPromise, itemsPromise, genresPromise]).then(
      function ([user, types, items, genres]) {
        res.render("userupdate", {
          types: types,
          user: user,
          errors: errors.mapped(),
          items: items,
          genres: genres,
          userUpdate: req.body,
        });
      }
    );
  }
};

exports.userDelete = function (req, res) {
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

  db.Users.destroy({
    where: {
      id: req.params.id,
    },
  });

  Promise.all([itemsPromise, userPromise, genresPromise]).then(function ([
    items,
    user,
    genres,
  ]) {
    res.render("checkmark", {
      msg: "Usuario eliminado con éxito",
      genres: genres,
      items: items,
      user: user,
    });
  });
};

exports.userLogin = function (req, res) {
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
    res.render("login", {
      errors: {},
      data: {},
      genres: genres,
      items: items,
      user: user,
    });
  });
};

exports.processLogin = function (req, res) {
  console.log(req.headers);
  let errors = validationResult(req);
  if (errors.isEmpty()) {
    db.Users.findOne({ where: { email: req.body.email } }).then(function (
      user
    ) {
      if (user == null) {
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
          res.render("login", {
            errors: { email: { msg: "Usuario inválido" } },
            data: {},
            genres: genres,
            items: items,
            user: user,
          });
        });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(function (result) {
            if (result) {
              req.session.loggedUser = user;
              if (req.body.rememberme != undefined) {
                res.cookie("recordarme", user.email, { maxAge: 60000 * 60 });
              }
              res.redirect("/");
            } else {
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

              Promise.all([itemsPromise, userPromise, genresPromise]).then(
                function ([items, user, genres]) {
                  res.render("login", {
                    errors: { password: { msg: "Password inválido" } },
                    data: {},
                    genres: genres,
                    items: items,
                    user: user,
                  });
                }
              );
            }
          });
      }
    });
  } else {
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
      res.render("login", {
        errors: errors.mapped(),
        data: req.body,
        genres: genres,
        items: items,
        user: user,
      });
    });
  }
};

exports.userDetail = function (req, res) {
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

  Promise.all([userPromise, genresPromise, itemsPromise]).then(function ([
    user,
    genres,
    items,
  ]) {
    res.render("userdetail", {
      genres: genres,
      items: items,
      user: user,
    });
  });
};

exports.userAdmin = function (req, res) {
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
    res.render("adminpanel", {
      genres: genres,
      items: items,
      user: user,
    });
  });
};

exports.logOff = function (req, res) {
  req.session.destroy();
  res.redirect("/logoff");
};

exports.userLogOff = function (req, res) {
  res.render("logoff");
};

exports.notAdmin = function (req, res) {
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

  Promise.all([userPromise, genresPromise, itemsPromise]).then(function ([
    user,
    genres,
    items,
  ]) {
    res.render("notadmin", {
      msg: "El usuario no tiene permiso para acceder a esta sección",
      items: items,
      genres: genres,
      user: user,
    });
  });
};
