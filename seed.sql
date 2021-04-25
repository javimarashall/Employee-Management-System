
-- Insert employees to employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES ("Javier", "Mondragon", 1, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES ("Andrew", "Luck", 2, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES ("Aaron", "Rodgers", 3, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES ("Patrick", "Mahomes", 4, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES ("Tom", "Brady", 5, 6);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES ("Russel", "Wilson", 6, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES ("Dereck", "Carr", 7, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES ("Drew", "Brees", 1, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES ("Lamar", "Jackson", 3, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES ("Matt", "Stafford", 5, 6);

-- Insert titles into role table
INSERT INTO employee_role(title, salary, department_id)
    VALUES("Sales", 60000, 1);
INSERT INTO employee_role(title, salary, department_id)
    VALUES("Sales Lead", 80000, 1);
INSERT INTO employee_role(title, salary, department_id)
    VALUES("Engineer", 90000, 2);
INSERT INTO employee_role(title, salary, department_id)
    VALUES("Engineer Lead", 100000, 2);
INSERT INTO employee_role(title, salary, department_id)
    VALUES("Accountant", 70000, 3);
INSERT INTO employee_role(title, salary, department_id)
    VALUES("Accounting Lead", 80000, 3);
INSERT INTO employee_role(title, salary, department_id)
    VALUES("Lawyer", 90000, 4);

-- Insert departments into department table
INSERT INTO department(name)
    VALUES("sales");
INSERT INTO department(name)
    VALUES("Engineering");
INSERT INTO department(name)
    VALUES("Accounting");
INSERT INTO department(name)
    VALUES("Legal");