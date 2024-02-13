const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'testpassword1',
    database: 'staff_db'
});

const navMenu = async () => {
    try {
        const { selection } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selection',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ],
            },
        ]);

        switch (selection) {
            case 'View All Employees': await viewEmployees(); break;
            case 'Add Employee': await addEmployee(); break;
            case 'Update Employee Role': updateEmployeeRole(); break;
            case 'View All Roles': await viewRoles(); break;
            case 'Add Role': await addRole(); break;
            case 'View All Departments': await viewAllDepartments(); break;
            case 'Add Department': await addDepartment(); break;
            case 'Quit': console.log('Goodbye'); return;
            default: console.log('Please enter a valid input'); break;
        };
    } catch (err) {
        console.error(err);
        console.error('There was a problem retrieving your data');
    }
};

const viewEmployees = async () => {
    try {
        const query = "SELECT * FROM employee";
        const results = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.table(results);
        navMenu();

    } catch (err) {
        console.error('There was a problem retrieving your data');
        console.log(err);
    }
};

const addEmployee = async () => {
    try {
        const newEmployee = await inquirer.prompt([
            {
                name: 'first',
                type: 'input',
                message: 'Enter new employee\'s first name:'
            },
            {
                name: 'last',
                type: 'input',
                message: 'Enter new employee\'s last name:'
            },
            {
                name: 'role',
                type: 'input',
                message: 'Enter new employee\'s role ID:',
            },
            {
                name: 'manager',
                type: 'input',
                message: 'Enter new employee\'s manager ID:',
            }
        ]);

        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const results = await new Promise((resolve, reject) => {
            db.query(query, [newEmployee.first, newEmployee.last, newEmployee.role, newEmployee.manager], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.log("Employee sucessfully added!");
        navMenu();

    } catch (err) {
        console.log(err);
        console.error('There was a problem adding your employee');
    }
}

const updateEmployeeRole = async () => {
    try {
        const { employeeId, roleToUpdate } = await inquirer.prompt([
            {
                name: 'employeeId',
                type: 'input',
                message: 'Enter the ID of the employee to update:'
            },
            {
                name: 'roleToUpdate',
                type: 'input',
                message: 'Enter the ID for the role you would like to assign this employee',
            }
        ]);

        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const values = [roleToUpdate, employeeId];

        const results = await new Promise((resolve, reject) => {
            db.query(query, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        console.log("Employee sucessfully updated!");
        navMenu();

    } catch (err) {
        console.error(err);
        console.error('There was a problem updating your employee');
    }
}

const viewRoles = async () => {
    try {
        const query = "SELECT * FROM role";
        const results = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.table(results);
        navMenu();

    } catch (err) {
        console.error('There was a problem retrieving your data');
        console.log(err);
    }
};

const addRole = async () => {
    try {
        const newRole = await inquirer.prompt([
            {
                name: 'roleTitle',
                type: 'input',
                message: 'Enter the title of the new role'
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'Enter the annual salary of the new role'
            },
            {
                name: 'roleDept',
                type: 'input',
                message: 'Enter the id for the new role\'s department'
            }
        ]);

        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const results = await new Promise((resolve, reject) => {
            db.query(query, [newRole.roleTitle, newRole.roleSalary, newRole.roleDept], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.log("Role sucessfully added!");
        navMenu();
    } catch (err) {
        console.error(err);
        console.error('There was a problem adding your role');
    }
}

const viewAllDepartments = async () => {
    try {
        const query = "SELECT * FROM department";
        const results = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.table(results);
        navMenu();

    } catch (err) {
        console.error(err);
        console.error('There was a problem retrieving your data');
        throw err;
    }
}

const addDepartment = async () => {
    try {
        const newDepartment = await inquirer.prompt(
            {
                name: 'name',
                type: 'input',
                message: 'Enter the title of the new department'
            }
        );

        const query = 'INSERT INTO department (name) VALUES (?)';
        const results = await new Promise((resolve, reject) => {
            db.query(query, newDepartment.name, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.log("Department sucessfully added!");
        navMenu();
    } catch (err) {
        console.error(err);
        console.error('There was a problem adding your department');
    }
}

navMenu();