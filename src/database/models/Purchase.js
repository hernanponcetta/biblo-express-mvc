const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Purchase";
  let cols = {
    total: {
      type: dataTypes.INTEGER,
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tablename: "purchase",
    timestamps: false,
    freezeTableName: true,
  };
  const Purchase = sequelize.define(alias, cols, config);

  Purchase.associate = function (models) {
    Purchase.belongsToMany(models.Books, {
      as: "books",
      through: "BooksPurchase",
      foreignKey: "purchase_id",
      timestamps: false,
    });
  };

  return Purchase;
};
