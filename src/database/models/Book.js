const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Books";
  let cols = {
    title: {
      type: dataTypes.STRING,
    },
    isbn: {
      type: dataTypes.INTEGER,
    },
    sinopsis: {
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.INTEGER,
    },
    amount: {
      type: dataTypes.INTEGER,
    },
    book_cover: {
      type: dataTypes.STRING,
    },
    autor_id: {
      type: dataTypes.INTEGER,
    },
    genre_id: {
      type: dataTypes.INTEGER,
    },
    house_id: {
      type: dataTypes.INTEGER,
    },
    state_id: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tablename: "books",
    timestamps: false,
  };
  const Books = sequelize.define(alias, cols, config);

  Books.associate = function (models) {
    Books.belongsToMany(models.Purchase, {
      as: "purchase",
      through: "BooksPurchase",
      foreignKey: "book_id",
      timestamps: false,
    });
    Books.belongsToMany(models.Users, {
      as: "books",
      through: "Items",
      foreignKey: "book_id",
      timestamps: false,
    });
    Books.belongsTo(models.Autors, {
      as: "autors",
      foreignKey: "autor_id",
    });
    Books.belongsTo(models.Genres, {
      as: "genres",
      foreignKey: "genre_id",
    });
    Books.belongsTo(models.Houses, {
      as: "houses",
      foreignKey: "house_id",
    });
    Books.belongsTo(models.States, {
      as: "states",
      foreignKey: "state_id",
    });
  };

  return Books;
};
