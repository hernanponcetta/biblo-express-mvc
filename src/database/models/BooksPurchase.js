const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "BooksPurchase";

  let cols = {
    quantity: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tablename: "books_purchase",
    timestamps: false,
    freezeTableName: true,
  };

  const BooksPurchase = sequelize.define(alias, cols, config);

  return BooksPurchase;
};
