--Drop an existing database
DROP DATABASE IF EXISTS employee_DB;
--Create new database
CREATE DATABASE employee_DB;
--Use this database
USE employee_DB;

--create department table
CREATE TABLE department (
    id INT(10) NOT NULL,
    name VARCHAR(30) NOT NULL, --Hold department name
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT(10) NOT NULL,
    title VARCHAR(30), --hold role title
    salary DECIMAL(10,2), --hold role salary
    department_id INT(10), --to hold reference to department role belongs to
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT(10),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(10),
    manager_id INT(10), -- to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
    PRIMARY KEY(id)
);
