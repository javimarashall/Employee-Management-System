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
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role',
                'Delete Employee',
                'Delete Role',
                'Delete Department',
                'Update Employee Managers',
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

                case 'Delete Employee':
                    deleteEmployee();
                    break;

                case 'Delete Role':
                    deleteRole();
                    break;

                case 'Delete Department':
                    deleteDepartment();
                    break;

                case 'Update Employee Managers':
                    updateEmployeeManagers();
                    break;
            }
        });
};

const viewEmployees = () => {
    const query =
        `
    SELECT
		employee.id,
        employee.first_name,
        employee.last_name,
        employee_role.title,
        employee_role.salary,
        department.name AS department,
        CONCAT(manager.first_name," ",manager.last_name) AS manager
    FROM
		employee 
	LEFT JOIN employee_role ON employee.role_id = employee_role.id
    LEFT JOIN department ON employee_role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    `;
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

const updateEmployeeRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeid',
                message: "Please enter employee's ID to update role?",
            },
            {
                type: 'input',
                name: 'roleid',
                message: "Please enter the role's ID?",
            },
        ])
        .then((answer) => {
            connection.query(
                `UPDATE employee SET role_id = ${answer.roleid} WHERE id = ${answer.employeeid}`,

                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    viewEmployees();
                })
        });
};


//Bonus

const deleteDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'delete',
                message: "Please enter department's ID to update role?",
            },
        ])
        .then((answer) => {
            connection.query(
                `DELETE FROM department WHERE id = ${answer.delete}`,

                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    viewDepartments();
                })
        });
};

const deleteEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'delete',
                message: "Please enter employee's ID to delete employee.",
            },
        ])
        .then((answer) => {
            connection.query(
                `DELETE FROM employee WHERE id = ${answer.delete}`,

                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    viewEmployees();
                })
        });
};
const updateEmployeeManagers = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'updateManager',
                message: "Please enter employee ID to update manager:",
            },
            {
                type: 'input',
                name: 'update',
                message: "Please enter new manager's ID:",
            },
        ])
        .then((answer) => {
            connection.query(
                `UPDATE employee SET employee.manager_id =${answer.update} WHERE id =${answer.updateManager}`,

                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    viewEmployees();
                })
        });
};

const deleteRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Enter role ID to be deleted:',
            },
        ])
        .then((answer) => {
            connection.query(
                `DELETE FROM employee_role WHERE id =${answer.role}`,
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    viewRoles();
                }
            )
        }
)}