require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '3000',
    dbName: process.env.DB_NAME || 'helpdeskdb',
    dbUser: process.env.DB_USER || 'root',
    dbPass: process.env.DB_PASS || '',
    dbHost: process.env.DB_HOST || 'localhost',
    dbDialect: process.env.DIALECT || 'mysql'
}

module.exports = config;