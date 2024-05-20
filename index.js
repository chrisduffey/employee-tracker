const fs = require ('fs');
const { Prompt } = require("inquirer");
const db = require("./db/connection");
require("console.table");

function startUp() {
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
    ]).then((choose)=>{
        switch (choose.options){
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
    }
    
    )
}

