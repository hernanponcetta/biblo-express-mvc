const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Houses";
  let cols = {
    name: {
      type: dataTypes.STRING,
      allownull: false,
    },
  };
  let config = {
    tablename: "houses",
    timestamps: false,
  };
  const Houses = sequelize.define(alias, cols, config);

  Houses.associate = function (models) {
    Houses.hasMany(models.Books, {
      as: "books",
      foreignKey: "house_id",
    });
  };
  return Houses;
};
