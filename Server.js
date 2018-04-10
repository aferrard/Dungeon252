//load necessities
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
//var cookieParser = require('cookie-parser');

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql123",
    database: "dungeon252"
});
con.connect(function(err) {
    if(err) throw err;
    console.log("Connected with Database");
});
//set the view engine to ejs
app.set('view engine', 'ejs');
//user res.render to load up an ejs view file

app.get('/', function(req,res){
    res.render('pages/home');
});

app.listen(5252);
console.log('5252 is the magic port');