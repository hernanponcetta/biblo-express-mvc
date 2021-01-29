const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Genres";
  let cols = {
    name: {
      type: dataTypes.STRING,
      allownull: false,
    },
  };
  let config = {
    tablename: "genres",
    timestamps: false,
  };
  const Genres = sequelize.define(alias, cols, config);

  Genres.associate = function (models) {
    Genres.hasMany(models.Books, {
      as: "books",
      foreignKey: "genre_id",
    });
  };
  return Genres;
};
