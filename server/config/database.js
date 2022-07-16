require('dotenv').config();
const Sequelize = require('sequelize');

const { DB_DIALECT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_DIALECT) throw new Error('DB_DIALECT must be set in .env')
if (!DB_HOST) throw new Error('DB_HOST must be set in .env')
if (!DB_USER) throw new Error('DB_USER must be set in .env')
if (!DB_PASSWORD) throw new Error('DB_PASSWORD must be set in .env')
if (!DB_NAME) throw new Error('DB_NAME must be set in .env')

const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    define: {
        timestamps: true,
    },
});

module.exports = sequelize;
global.sequelize = sequelize;
