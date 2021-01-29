const { sequelize, dataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Users";
  let cols = {
    email: {
      type: dataTypes.STRING,
      allownull: false,
    },
    first_name: {
      type: dataTypes.STRING,
      allownull: false,
    },
    last_name: {
      type: dataTypes.STRING,
      allownull: false,
    },
    dni: {
      type: dataTypes.INTEGER,
      allownull: false,
    },
    address: {
      type: dataTypes.STRING,
      allownull: false,
    },
    cp: {
      type: dataTypes.STRING,
      allownull: false,
    },
    password: {
      type: dataTypes.STRING,
      allownull: false,
    },
    birth: {
      type: dataTypes.DATEONLY,
      allownull: false,
    },
    user_type_id: {
      type: dataTypes.INTEGER,
      defaultValue: "2",
    },
    user_photo: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tablename: "users",
    timestamps: false,
  };
  const Users = sequelize.define(alias, cols, config);

  Users.associate = function (models) {
    Users.belongsTo(models.Userstypes, {
      as: "userstypes",
      foreignKey: "user_type_id",
    });

    Users.belongsToMany(models.Books, {
      as: "books",
      through: "Items",
      foreignKey: "user_id",
      timestamps: false,
    });
  };

  return Users;
};
