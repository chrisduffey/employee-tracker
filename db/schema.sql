DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

-- use command

CREATE TABLE department (
    id: SERIAL PRIMARY KEY.
    name: VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id: SERIAL PRIMARY KEY,
    -- to hold role title
    title: VARCHAR(30) UNIQUE NOT NULL ,
    -- to hold role salary
    salary: DECIMAL NOT NULL ,
-- to hold reference to department role belongs to
    department_id: INTEGER NOT NULL 

);

CREATE TABLE employee (
    id: SERIAL PRIMARY KEY,
    -- to hold employee first name
    first_name: VARCHAR(30) NOT NULL,
    --  to hold employee last name
    last_name: VARCHAR(30) NOT NULL,
-- to hold reference to employee role
    role_id: INTEGER NOT NULL,
    -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
    manager_id: INTEGER 

);