const mysql = require('mysql');
require('dotenv').config();
const DB_HOST_db = process.env.DB_HOST;
const DB_USER_db = process.env.DB_USER;
const DB_PASSWORD_db = process.env.DB_PASSWORD;
const DB_NAME_db = process.env.DB_NAME;

const db = mysql.createPool({
    connectionLimit: 100,

    host: DB_HOST_db,
    user: DB_USER_db,
    password: DB_PASSWORD_db,
    database: DB_NAME_db,

    /*
        host: "localhost",
        user: "root",
        password: "",
        database: "bgai",
    */
    /*
        host: 'sql11.freemysqlhosting.net',
        user: 'sql11654310',
        password: 'YsBySaS6vu',
        database: 'sql11654310',
    */
    /*
   host: 'bgaigen.mysql.database.azure.com',
   user: 'bgai',
   password: 'Sql11653990',
   database: 'bgai',
*/


});

module.exports = db;
