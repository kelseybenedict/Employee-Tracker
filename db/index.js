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
        // left joins to update dept table
        return this.connection.query("SELECT department.id, department.name FROM department LEFT JOIN roles ON roles.department_id = department_id LEFT JOIN employee ON employee.role_id = role_id GROUP BY department.id, department.name")
    };
    // adds a department to department table
    addDepartment(department){
        return this.connection.query("INSERT INTO department SET ?", department);
    };
    // find all employees
    findAllEmployees(){
        // join with roles table and departments table to display
        // employees' salaries, roles, depts, and managers
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    };
    // find all roles
    findAllRoles(){
        // join all roles with department to show dept name
        return this.connection.query("SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;")
    };
    // add new employee to db
    addEmployee(newEmployee){
        // add employee received from user into employee table
        return this.connection.query("INSERT INTO employee SET ?", newEmployee)
    }
    // update role of selected employee
    updateRole(id, role_id){
        // update the employee's role by the id received from user
        return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, id])
    }
};

module.exports = new DB(connection);

