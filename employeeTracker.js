// npm packages to use
const inquirer = require("inquirer");
const mysql = require("mysql");
const db = require("./db");
const logo = require("asciiart-logo");
const consTable = require("console.table");
const { exit } = require("process");

// call logo function right away
displayLogo();

// function to display "employee tracker logo"
function displayLogo(){
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
            case "Add role":
                addRole();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add new employee":
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
                db.connection.end();
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
            type: "input",
            name: "title",
            message: "What is the name of the role?"
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does this role belong to?",
            choices: deptChoices
          }
    ])
    await db.addRole(role)
    // success response
    console.log(`Success! Added ${role.title} to the database`)
    // display initial questions again
    init()

}

// function to add department 
async function addDepartment(){
    // prompt for adding dept
    const department = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department?"
          }
    ])
    // adding dept to database
    await db.addDepartment(department)
    console.log(`Success! Added ${department.name} to the database`);
    // display initial questions again
    init()
}
