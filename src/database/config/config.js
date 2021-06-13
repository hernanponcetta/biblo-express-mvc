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
    username: 'root',
    password: 'root',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
