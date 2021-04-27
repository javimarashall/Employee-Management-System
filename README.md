# Employee-Management-System

## Summary 
This software contains a command line application meant to better organize employees within a company. The application stores employees in a table, the roles in another table, and department in another table. Using this application, the user is able formulate new tables using the given data already stored in those tables. The user is able to start this application from the command line by running the command: node server.js. Once the application is started, the user encounters a prompt asking, "what would you like to do?" The user can then select an option from a list of choices, for example: view employees, view departments, add employee, etc. For example, if the user selects to add employee, then the application will populate prompts asking the user to input the new employee's first name, last name, role id, and department id. After the user is done entering the information, then the application reloads the newly updated employee table. Currently, the application has 11 options to select from of things to do with employees data. 

## Site
![site](./assets/site.gif)

## Technologies Used
* Javascript - Used to write in Node
* Package.json - Used to identify the project and the dependencies
* Package-lock.json - Automatically created for operations where npm modifies  package.json
* Node.js - Used to to write server-side application
* Npm - Used to obtain software packages
* GitHub - Used as the repository
* MySQL - A database management system

## Code Snippet
This code snippet represents the code that runs the function to be able to view employees. Just as important, this code also represents the query used to be able to join the employee table, the role table, and the department table. 

```javascript
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
```

## Starting the Application
In order to start the application from the command line, the user needs to run: node server.js

## Repository Link
https://github.com/javimarashall/Employee-Management-System

## Video Link
https://drive.google.com/file/d/1gRLCINZI5QFbGv9AMPGNnGhS-M6HJqVR/view

## Personal Links
[Github](https://github.com/javimarashall)<br>
[Linkedin](https://www.linkedin.com/in/javier-mondragon-7b471719b/)
