//Require essentials
const mysql = require('mysql');
const inquirer = require('inquirer');

//Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_DB',
});

connection.connect((err) => {
    if (err) throw err;
    runStart();
});

const runStart = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message:'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role',
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View Employees':
                    viewEmployees();
                    break;
                
                case 'View Departments':
                    viewDepartments();
                    break;

                case 'View Roles':
                    viewRoles();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
            }
        });
};

const viewEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runStart();
});
};

const viewDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runStart();
});
}

const viewRoles = () => {
    const query = 'SELECT * FROM employee_role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runStart();
    });
}
