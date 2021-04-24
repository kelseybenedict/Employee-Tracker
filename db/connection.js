// packages to require
const mysql = require("mysql");
const util = require("util");

// establishing a sql connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db',
});

connection.connect();
// setup to use async/await later 
connection.query = util.promisify(connection.query);

//exporting to access elsewhere inside file structure
module.exports = connection;