const fs = require('fs');
const { Prompt } = require("inquirer");
const db = require("./db/connection");
require("console.table");

function startApp() {
    // how would I insert the users name in the log? ($username)?
    console.log("Welcome!");
    prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update and employee role",
                "Exit app",
            ],
        },
    ]).then((choose) => {
        switch (choose.options) {
            case "View all departments":
                viewDepts();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "View all employees":
                viewEmployees();
                break;

            case "Add a departments":
                addDept();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an Employee":
                addEmployee();
                break;

            case "Update an employee role":
                updateEmployee();
                break;
            case "Exit":
                db.end();
        }
    });
}

async function viewDepts() {
    const depts = await db.query("SELECT * FROM departments")
    console.log(depts)
    startApp()

}

async function addDept() {
    const { dept } = await prompt([
        {
            type: "input",
            message: "What is the department name?",
            name: "dept",
        },
    ]);
    db.query("INSERT INTO department (name) VALUES ()", [dept], (err, { rows }) => {
        if (err) console.log(err.message);
        else {
            console.log("Insert complete");
            console.table(rows)
            startApp();
        }
    });
}

async function viewEmployees() {
    const profile = await db.query("SELECT * FROM employee", (err, { rows }) => {
        if (err) console.log(err.message);
        else {
            console.log("Insert complete");
            console.table(rows)
            startApp();
        }
    },
    )
}

async function addEmployee() {
    const addEmployee = await prompt([
        {
            type: "input",
            message: "What is the employees first name?",
            name: "addEmployeeFirstName",
        },
        {
            type: "input",
            message: "What is the employess last name?",
            name: "addEmployeeLastName",
        },
        {
            type: "input",
            message: "What is the employess role?",
            name: "addEmployeeRoleId",
        },
        {
            type: "input",
            message: "Who is the manager of this employee?",
            name: "addEmployeeManager",
        },

    ]);
    await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [
            addEmployee.addEmployeeFirstName,
            addEmployee.addEmployeeLastName,
            addEmployee.addEmployeeRoleId,
            addEmployee.addEmployeeManager,
        ]),
        (err,) => {
            if (err) console.log(err.message);
            else {
                console.log("Employee added");
                console.table(rows)
                startApp();
            }
        }
        async function addRole() {
            const addRole = await prompt([
                {
                    type: "input",
                    message: "What is the title of this role you want to add?",
                    name: "addNewTitle",
                },
                {
                    type: "input",
                    message: "What is the salary of the role you are adding?",
                    name: "addNewSalary",
                },
                {
                    type: "input",
                    message: "Which department does this role go in?",
                    name: "addDepartment",
                },
        
            ]);
            await db.query(`INSERT INTO role(title,salary, department_id) VALUES (?, ?, ?)`,
                [
                    addRole.addNewTitle,
                    addRole.addNewSalary,
                    addRole.addDepartment,
                    
                ]),
                (err,) => {
                    if (err) console.log(err.message);
                    else {
                        console.log("Role added");
                        console.table(rows)
                        startApp();
                    }
                }





    async function updateEmployee() {
        const [role] = await db.query("SELECT department_id, title FROM employees_db.role");





        startApp();
    }
}



