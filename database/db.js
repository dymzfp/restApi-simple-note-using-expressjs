
const mysql = require('mysql');
// import env
const env = require('../config/config-env');

const conn = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    dateStrings: true
});

conn.connect(err => {
    if(err) throw err;
    console.log('connection to database success');
});

module.exports = conn;