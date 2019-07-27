//Example
// Use this for Add and Edit the values from the client side
BEGIN
IF  = 0 THEN
INSERT INTO employeedb(Name, Salary, EmplyCODE)
VALUES(, ,);
SET  = LAST_INSERT_ID();
ELSE
UPDATE employeedb
SET Name = ,
Salary = ,
EmplyCODE = 
WHERE EmplyID = ;
END IF;
SELECT  AS 'EmplyID';
END