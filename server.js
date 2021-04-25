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
    const query = 
    'SELECT employee.first_name, employee.last_name, employee_role.title FROM employee_role INNER JOIN employee ON employee.role_id=employee_role.title';
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
};

const viewRoles = () => {
    const query = 'SELECT * FROM employee_role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runStart();
    });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Employee's First Name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Employee's Last Name?",
            },
            {
                type: 'input',
                name: 'role',
                message: "Employee's role_id?",
            },
            {
                type: 'input',
                name: 'manager',
                message: "'Employee's Manager ID?",
            },            
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role,
                    manager_id: answer.manager,
                },
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    viewEmployees();
                }
            )
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: "What's the role title?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "What's the role salary?",
            },
            {
                type: 'input',
                name: 'department',
                message: "What's the department's id for the role?",
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee_role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department,
                },
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    viewRoles();
                })
        });
};

const addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: "What's the department's name?",
        },
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.name,
            },
            (err, res) => {
                if (err) throw err;
                console.table(res);
                viewDepartments();
            })
    });
    };

