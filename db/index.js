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
    
    // find all departments
    findAllDepartments(){
        return this.connection.query("SELECT department.id, department.name FROM department LEFT JOIN roles ON roles.department_id = department_id LEFT JOIN employee ON employee.role_id = role_id GROUP BY department.id, department.name")
    }
    addDepartment(department){
        return this.connection.query("INSERT INTO department SET ?", department);
    }
};

module.exports = new DB(connection);

