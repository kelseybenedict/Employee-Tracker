// npm packages to use
const inquirer = require("inquirer");
const mysql = require("mysql");
const consTable = require("console.table");
const { exit } = require("process");

// establishing a sql connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db',
});

function init () {
    // initial question options
    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            // left to add: remove a employee, dept, or role, update an employee manager, view employees by manager 
            choices: ['Add role', 'Add department', 'Add new employee', "Update an employee's role",'View all employees', 'View all departments', 'View all roles', 'Exit']
        },

       
    ])
    .then((data) => {
        switch (data.task){
            case "Add a role":
                addRole();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee's role":
                updateRole();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            default:
                connection.end();
        }

    }
}
