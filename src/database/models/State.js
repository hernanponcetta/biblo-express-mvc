const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "States";
  let cols = {
    name: {
      type: dataTypes.STRING,
      allownull: false,
    },
  };
  let config = {
    tablename: "states",
    timestamps: false,
  };
  const States = sequelize.define(alias, cols, config);

  States.associate = function (models) {
    States.hasMany(models.Books, {
      as: "states",
      foreignKey: "state_id",
    });
  };
  return States;
};
