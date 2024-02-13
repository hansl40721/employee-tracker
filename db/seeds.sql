INSERT INTO department (id, name) VALUES
(1, "HUMAN RESOURCES"),
(2, "CUSTOMER SERVICE"),
(3, "SALES"), 
(4, "INFORMATION TECHNOLOGY");

INSERT INTO role (id, title, salary, department_id) VALUES
(1, "HR REPRESENTATIVE", 55000, 1),
(2, "CS REPRESENTATIVE", 50000, 2),
(3, "SALES ASSOCIATE", 60000, 3),
(4, "IT SPECIALIST", 65000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES 
(1, "Jack", "Jackson", 3, 4),
(2, "Diane", "Smith", 1, 2),
(3, "Molly", "Llama", 2, 3),
(4, "Brandon", "Routh", 4, NULL);