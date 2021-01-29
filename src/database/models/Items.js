const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Items";
  let cols = {
    book_id: {
      type: dataTypes.INTEGER,
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
    quantity: {
      type: dataTypes.INTEGER,
    },
    state: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tablename: "items",
    timestamps: false,
  };
  const Checkout = sequelize.define(alias, cols, config);

  Checkout.associate = function (models) {
    Checkout.belongsTo(models.Books, {
      as: "books",
      foreignKey: "book_id",
    });
    Checkout.belongsTo(models.Users, {
      as: "users",
      foreignKey: "user_id",
    });
  };
  return Checkout;
};
