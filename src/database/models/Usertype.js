const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Userstypes";
  let cols = {
    name: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tablename: "userstypes",
    timestamps: false,
  };
  const Userstypes = sequelize.define(alias, cols, config);

  Userstypes.associate = function (models) {
    Userstypes.hasMany(models.Users, {
      as: "users",
      foreignKey: "user_type_id",
    });
  };
  return Userstypes;
};
