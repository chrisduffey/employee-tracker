const fs = require('fs');
const { prompt } = require("inquirer");
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
                "Update an employee role",
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

            case "Add a department":
                addDept();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an employee":
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
    const depts = await db.query("SELECT * FROM department")
    console.table(depts.rows)
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
    db.query("INSERT INTO department (name) VALUES ($1) RETURNING *", [dept], (err, { rows }) => {
        if (err) console.log(err.message);
        else {
            console.log("Insert complete");
            console.table(rows)
            startApp();
        }
    });
}

async function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS department, role.salary, manager.first_name || ' ' || manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`;
      db.query(sql, (err, { rows }) => {
        if (err) console.log(err.message);
        else {
            
            console.table(rows)
            startApp();
        }
    },
    )
}

async function addEmployee() {
    const roles = await db.query("SELECT id AS value, title AS name from role")
    const employees = await db.query("SELECT id AS value, first_name|| ' ' || last_name as name from employee ")
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
            type: "list",
            message: "What is the employess role?",
            name: "addEmployeeRoleId",
            choices: roles.rows
        },
        {
            type: "list",
            message: "Who is the manager of this employee?",
            name: "addEmployeeManager",
            choices: employees.rows
        },

    ]);
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
        [
            addEmployee.addEmployeeFirstName,
            addEmployee.addEmployeeLastName,
            addEmployee.addEmployeeRoleId,
            addEmployee.addEmployeeManager,
        ],
        (err,) => {
            if (err) console.log(err.message);
            else {
                console.log("Employee added");
                
                startApp();
            }
        })
};
async function addRole() {
    const departments = await db.query ("select id as value, name as name from department")
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
            type: "list",
            message: "Which department does this role go in?",
            name: "addDepartment",
            choices: departments.rows
        },

    ]);
    db.query(`INSERT INTO role(title,salary, department_id) VALUES ($1, $2, $3)`,
        [
            addRole.addNewTitle,
            addRole.addNewSalary,
            addRole.addDepartment,

        ],
        (err,) => {
            if (err) console.log(err.message);
            else {
                console.log("Role added");
                
                startApp();
            }
        })
};

async function viewRoles() {
    const roles = await db.query("SELECT role.title, role.salary, department.name FROM role join department on department.id=role.department_id")
    console.table(roles.rows)
    startApp()
};




async function updateEmployee() {
    const roles = await db.query("SELECT id AS value, title AS name from role")
    const employees = await db.query("SELECT id AS value, first_name|| ' '|| last_name as name from employee ")
    const {employee_id, role_id }= await prompt([
        {
            type: "list",
            message: "Which employee ID would you like to update the role for?",
            name: "employee_id",
            choices: employees.rows
            
        },
        {
            type: "list",
            message: "What is the role ID you want to choose?",
            name: "role_id",
            choices: roles.rows
            
        }
        
    ]);
    await db.query("UPDATE employee SET role_id = $1 where id = $2", [role_id, employee_id])
    console.log ("Employee was updated"),




    startApp();
};




startApp();

