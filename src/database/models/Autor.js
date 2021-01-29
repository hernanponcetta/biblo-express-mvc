const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Autors";
  let cols = {
    name: {
      type: dataTypes.STRING,
      allownull: false,
    },
    bio: {
      type: dataTypes.STRING,
    },
    autor_photo: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tablename: "autors",
    timestamps: false,
  };
  const Autors = sequelize.define(alias, cols, config);

  Autors.associate = function (models) {
    Autors.hasMany(models.Books, {
      as: "books",
      foreignKey: "autor_id",
    });
  };
  return Autors;
};
