//Rest Api
//MySql Data Server
//It will work with any data server

const mySql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mySql.createConnection({
    host: 'localhost',
    user:'raj',
    password:'1234',
    database :'employeedb',
    multipleStatements: true

});
// Connect the mysql database server
mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB connection success');
    }else{
        console.log('DB connection failure');
    }

});

app.listen(3000,()=>console.log('Express server running at port no: 3000'));

//Get data in json format from mysql database
app.get('/employeedb',(req,res)=>{
    
    mysqlConnection.query('SELECT * FROM employeedb',(err,rows,fields)=>{
        if(!err){
            
            res.send(rows);
            console.log(rows);
        }else{
            console.log(err);
        }
    });
});

//Get the  particular data in json format from mysql database
app.get('/employeedb/:id',(req,res)=>{
    
    mysqlConnection.query('SELECT * FROM employeedb WHERE EmplyId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            
            res.send(rows);
            console.log(rows);
        }else{
            console.log(err);
        }
    });
});

//Delete a particular data in mysql database
app.delete('/employeedb/:id',(req,res)=>{
    
    mysqlConnection.query('DELETE FROM employeedb WHERE EmplyId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            
            res.send('Deleted Successfully');
            console.log('Deleted Successfully');
        }else{
            console.log(err);
        }
    });
});

//Writa a new data in mysql database
/* app.post('/employeedb/', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmplyID = ?;SET @Name = ?;SET @Salary = ?;SET @EmplyCODE= ?; \
    CALL EmployeeAddOrEdit(@EmplyID,@Name,@Salary,@EmplyCODE);";
    mysqlConnection.query(sql, [emp.EmplyID, emp.Name, emp.Salary, emp.EmplyCODE], (err, rows, fields) => {
        if (!err)
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send('Inserted employee id : '+element[0].EmplyID);
            res.send('Inserted employee id : '+element[1].Name);
            res.send('Inserted employee id : '+element[1].Salary);
            res.send('Inserted employee id : '+element[1].EmplyCODE);
            res.send(rows);
        });
        
        else
            console.log(err);
    })
}); */



app.post('/employeedb/:id', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO `employeedb` (`EmplyID`, `Name`, `Salary`, `EmplyCODE`) VALUES ('?', '?', '?', '?');";
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)

        res.send(rows);
        
        else
            console.log(err);
    })
});


//Update an exsiting data in mysql database
app.put('/employeedb', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmplyID = ?;SET @Name = ?;SET @Salary = ?;SET @EmplyCODE= ?; \
    CALL EmployeeAddOrEdit(@EmplyID,@Name,@Salary,@EmplyCODE);";
    mysqlConnection.query(sql, [emp.EmplyID, emp.Name, emp.Salary, emp.EmplyCODE], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
