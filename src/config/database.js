const { Sequelize } = require('sequelize');
const { dbName, dbPass, dbUser, dbHost, dbDialect } = require('./index');

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});


module.exports = db;