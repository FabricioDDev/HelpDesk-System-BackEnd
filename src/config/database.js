const { Sequelize } = require('sequelize');
const { dbName, dbPass, dbUser, dbHost, dbDialect, dbPort } = require('./index');

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: dbDialect, 
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging: false,
});


module.exports = db;