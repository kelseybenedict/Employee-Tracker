INSERT INTO department(name)
VALUES ("Human Resources"), ("Information Technology"), ("Information Security"), ("eCommerce"), ("Innovation"), ("Member Solutions");

INSERT INTO roles(title, salary, department_id)
VALUES ("Human Resources Specialist", 60000.00, 1),
("Junior Developer", 70000.00, 2),
("Senior Developer", 90000.00, 2),
("Security Analyst", 100000.00, 3),
("eCommerce Manager", 80000.00, 4),
("Innovation Specialist", 75000.00, 5),
("Member Advocate", 65000.00, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Rachel", "Green", 2, 3), 
("Monica", "Geller", 3, null),
("Chandler", "Bing", 4, null),
("Ross", "Geller", 1, 1),
("Joey", "Tribbiani", 5, 5),
("Phoebe", "Buffay", 6, 6);

