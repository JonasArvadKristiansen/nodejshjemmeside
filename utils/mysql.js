const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    connectionLimit: process.env.CONNECTIONLIMIT,
});

con.on('connection', function (connection) {
    console.log('DB Connection established');

    connection.on('error', function (err) {
        console.error(new Date(), 'MySQL error', err.code);
    });
});

module.exports = con;
