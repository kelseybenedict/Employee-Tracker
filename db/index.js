// requiring connection from connection.js
const connection = require("./connection");

class DB {
    // establishing a reference to the connection
    // to access it later in file structure
    constructor(connection) {
        this.connection = connection
    };

    // adding a new role 
    addRole(role) {
        return this.connection.query("INSERT INTO roles SET ?", role);
    };
};

module.exports = new DB(connection);

