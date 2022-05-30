const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
let bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "form",
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  let user = { ClientEmail: req.body.email, Amount: req.body.Amount, InvoiceLink: req.body.InvoiceLink,ClientType: req.body.ClientType,Date: req.body.date, Status: req.body.status };
  db.query('INSERT INTO invoice SET?', user, (error, result) => {
      if (error) throw error;
      res.status(201).send(`User added with ID: ${result.insertid}`);
  });
});


app.post("/api", function (request, response) {
  let email = request.body.email;
  let password = request.body.password;
  if (email && password) {
    db.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          response.send(results);
        } else {
          response.send("Incorrect Email and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Email and Password!");
    response.end();
  }
});
app.post("/search", function (request, response) {
  let password = request.body.password;
  if (password) {
    db.query(
      "SELECT * FROM LIstingkey WHERE password = ?",
      [password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          response.send(results);
        } else {
          response.send("Incorrect Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Password!");
    response.end();
  }
});
app.post("/api/insert", (req, res) => {
  console.log(req.body);
  const Amount = req.body.Amount;
  const email = req.body.email;
  const InvoiceLink = req.body.InvoiceLink;
  const ClientType = req.body.ClientType;
  const Date = req.body.date;
  const Status = req.body.status;
  const sql = "INSERT INTO Invoice VALUES ?";
  const values = [[email, Amount, InvoiceLink, ClientType, Date,Status]];

  db.query(sql, [values], (err, result, fields) => {
    if (err) {
      console.log("error after insert", err);
    } else {
      console.log("done", result);
    }
    res.end();
  });
});
app.put('/update', function (req, res) {
  db.query('UPDATE `employees` SET `Amount`=?,`date`=?,`ClientType`=?,`InvoiceLink`=? where `email`=?', [req.body.Amount,req.body.date, req.body.ClientType,req.body.InvoiceLink, req.body.email], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});
app.get("/user", (req, res) => {
  db.query("SELECT * FROM Invoice", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/dashborad", function (request, response) {
  let email = request.body.email;
  if (email) {
    db.query(
      "SELECT * FROM User WHERE email = ? ",
      [email],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          response.send(results);
        } else {
          response.send("Incorrect Email");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Email and Password!");
    response.end();
  }
});
// app.put('/employees', (req, res) => {
//   let emp = req.body;
//   var sql = "SET @firstname = ?;SET @lastname = ?; \
//   CALL EmployeeAddOrEdit(@firstname,@lastname);";
//   db.query(sql, [emp.firstname, emp.lastname], (err, rows, fields) => {
//       if (!err)
//           res.send('Updated successfully');
//       else
//           console.log(err);
//   })
// });
// app.put('/api/employees/updatewithparametersandbody',updateWithParametsAndBody);
// function updateWithParametsAndBody(req, res) {
//   var body = req.body
//   var firstname = req.query.firstname
//   if(body === undefined){
//     res.statusMessage = "please send a valid body to update record";
//     res.statusCode = 400;
//     res.end();
//     return
//   }
// }
// app.delete('/employees/:firstname', (req, res) => {
//   db.query('DELETE FROM Employee WHERE firstname = ?', [req.params.firstname], (err, rows, fields) => {
//       if (!err)
//           res.send('Deleted successfully.');
//       else
//           console.log(err);
//   })
// });

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

// const mysql = require('mysql');
// const express = require('express');
// var app = express();
// const bodyparser = require('body-parser');

// app.use(bodyparser.json());

// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'manaV@',
//     database: 'from'
//     // multipleStatements: true
// });

// mysqlConnection.connect((err) => {
//     if (!err)
//         console.log('DB connection succeded.');
//     else
//         console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
// });

// app.listen(3002, () => console.log('Express server is runnig at port no : 3000'));

// //Get an employees
// app.get('/employees/:id', (req, res) => {
//     mysqlConnection.query('SELECT * FROM employees WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// //Delete an employees
// app.delete('/employees/:id', (req, res) => {
//     mysqlConnection.query('DELETE FROM employees WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send('Deleted successfully.');
//         else
//             console.log(err);
//     })
// });

// app.post('/employees', (req, res) => {
//     let emp = req.body;
//     var sql = "SET @firstname = ?;SET @lastname = ?; \
//     CALL EmployeeAddOrEdit(@firstname,@lastname);";
//     mysqlConnection.query(sql, [emp.firstname, emp.lastname], (err, rows, fields) => {
//         if (!err)
//             rows.forEach(element => {
//                 if(element.constructor == Array)
//                 res.send('Inserted employee id : '+element[0].firstname);
//             });
//         else
//             console.log(err);
//     })
// });

// app.put('/employees', (req, res) => {
//     let emp = req.body;
//     var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
//     CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
//     mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
//         if (!err)
//             res.send('Updated successfully');
//         else
//             console.log(err);
//     })
//
