const config = require('config');

module.exports = {
  development: {
    username: 'admin',
    password: config.get('dbConfig.password'),
    database: 'biblo-database',
    host: 'biblo-database.cf56unoyaeaf.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
      underscored: true,
      paranoid: true,
    },
  },
  test: {
    username: 'admin',
    password: config.get('dbConfig.password'),
    database: 'biblo-database',
    host: 'biblo-database.cf56unoyaeaf.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
      underscored: true,
      paranoid: true,
    },
  },
  production: {
    username: 'admin',
    password: config.get('dbConfig.password'),
    database: 'biblo-database',
    host: 'biblo-database.cf56unoyaeaf.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
      underscored: true,
      paranoid: true,
    },
  },
};
