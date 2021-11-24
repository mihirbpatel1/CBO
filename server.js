

'use strict';
var http = require('http');
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "CBO"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   
   
  });


const PORT = 8080
const HOST = '0.0.0.0';
const PATH = __dirname + '';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static("client",{"index":"index.html"}));

app.get('/staff', (req,res)=>{
  res.sendFile(path.join(__dirname + '/staff.html'));
} );
app.get('/person', (req,res)=>{
  res.sendFile(path.join(__dirname + '/person.html'));
} );

app.get('/staffList' , (req, res)=> {
  var viewDB = 'SELECT * FROM staff';
  con.query(viewDB,(err, result )=>{
   res.json(result);
  });
})
app.get('/personList' , (req, res)=> {
  var viewDB = 'SELECT * FROM person';
  con.query(viewDB,(err, result )=>{
   res.json(result);
  });
})

app.post('/add', function(req, res){
    var name= req.body.name;
    var phoneNum= req.body.phone;
    
    var addNew = "INSERT INTO staff (StaffName, StaffPhone) VALUES('" + name + "', '"+ phoneNum + "')";
    
    con.query(addNew,(err, result)=>{
     if(err){
      console.log(err)
     };
    });
    console.log(req.body);
    
} );
app.post('/addPerson', function(req, res){
  var name= req.body.name;
  var phoneNum= req.body.phone;
  
  var addNew = "INSERT INTO person (personName, personPhone) VALUES('" + name + "', '"+ phoneNum + "')";
  
  con.query(addNew,(err, result)=>{
   if(err){
    console.log(err)
   };
  });
  console.log(req.body);
  
} );
app.post('/removeItem', (req, res) =>{
  var Item = req.body.name.trim();

  var sql = 'DELETE FROM staff WHERE StaffName = ?'
  console.log(Item);
  con.query(sql, Item, (err, result) =>{
    if (err) {
      console.log(err)

    };
     
  });
  
})
app.post('/removePerson', (req, res) =>{
  var Item = req.body.name.trim();

  var sql = 'DELETE FROM person WHERE personName = ?'
  console.log(Item);
  con.query(sql, Item, (err, result) =>{
    if (err) {
      console.log(err)

    };
     
  });
  
})
app.post('/addReport', function(req, res){
  var name= req.body.name;
  var addReport= req.body.report;
  
  // var addNew = "INSERT INTO person (personName = ? ) VALUES('','','" + addReport + "'); "

  
  con.query("UPDATE person SET des = ?   WHERE Personid = ? " , [addReport,name] ,(err, result)=>{
   if(err){
    console.log(err)
   };
  });
  console.log(req.body);
  
} );

app.post('/getReport' , (req, res)=> {
  var name = req.body.name;
  
  
  console.log(req.body)
  con.query('SELECT * FROM person WHERE personName = ?', [name], (err, result )=>{
   res.json(result);
  });
 
})
app.post('/update', (req, res) =>{
  var Item = req.body.number;
  var newName = req.body.newName
  var phoneNum = req.body.phoneNum;

  
  console.log(Item);
  con.query("UPDATE  staff SET staffName = ? ,  staffPhone = ? WHERE Personid = ? " , [newName, phoneNum,Item] ,(err, result) =>{
    if (err) {
      console.log(err)

    };
     
  });
  
})



app.listen(PORT, HOST);