// npm packages to use
const inquirer = require("inquirer");
const mysql = require("mysql");
const db = require("./db");
const logo = require("asciiart-logo");
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

// function to display "employee tracker logo"
function logo(){
    // setting the text to display
    const logoText = logo({name : "Employee Tracker"}).render();
    // logging it so it's visible on the command line
    console.log(logoText);
    // calling function to display questions
    init()
}

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
        // using a switch to call the appropriate function depending on what the user selected
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
            // if none of the above cases were selected, this will exit out of the established connection
            default:
                connection.end();
        }

    })
}

async function addRole() {
    // finding all departments in database
    const departments = await db.findAllDepartments();
    const deptChoices = departments.map(({id, name}) => ({
        name: name,
        value: id
    }))
    // adding role questions
    const role = await inquirer.prompt([
        {
            name: "title",
            message: "What is the name of the role?"
          },
          {
            name: "salary",
            message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does this role belong to?",
            choices: departmentChoices
          }
    ])
    await db.createRole(role)
    // success response
    console.log(`Success! Added ${role.title} to the database`)
    // display initial questions again
    init()

}