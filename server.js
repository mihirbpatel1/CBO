

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



app.listen(PORT, HOST);