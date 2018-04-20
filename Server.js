//load necessities
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql123",
    database: "dungeon252_data"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected with Database");
});
//set the view engine to ejs
app.set('view engine', 'ejs');
//user res.render to load up an ejs view file

app.get('/', function (req, res) {
    res.cookie('hero', '', {expires: new Date(0)}); // remove user from the cookie
    res.cookie('health', '', {expires: new Date(0)}); // remove pass from the cookie
    res.cookie('gold', '', {expires: new Date(0)});
    res.cookie('weapon', '', {expires: new Date(0)});
    res.cookie('item', '', {expires: new Date(0)});
    res.cookie('magik', '', {expires: new Date(0)});
    res.cookie('roomsCopy', '', {expires: new Date(0)});
    //console.log(req.cookies);
    res.render('pages/home');
});

app.get('/leaderboard', function (req, res) {
    res.render('pages/leaderboard');
});

app.get('/champ', function (req, res) {
    res.render('pages/champ');
});
var roomsMaster = ["GNOME", "DOG", "HOLE", "CHEST", "POTIONS", "DARKWIZARD", "SEASHELL", "CAMPFIRE", "HELICOPTER", "SALESMAN", "FEAST", "CHOOSEAROOM", "LADDERS"];

app.get('/start', function (req, res) {
    res.cookie('hero', req.query.hero, {maxAge: 9000000});
    res.cookie('health', 50, {maxAge: 9000000});
    res.cookie('gold', 50, {maxAge: 9000000});
    res.cookie('weapon', "Stick", {maxAge: 9000000});
    res.cookie('item', "None", {maxAge: 9000000});
    res.cookie('magik', "None", {maxAge: 9000000});
    res.cookie('roomsCopy', roomsMaster, {maxAge: 9000000});
    res.cookie('roomCounter', 0, {maxAge: 9000000});
    res.render('pages/start');
});

app.get('/room', function (req, res) {
    console.log(req.cookies);
    var roomsCopy = req.cookies.roomsCopy;
    var roomPick = Math.round((parseInt(roomsCopy.length)-1) * Math.random());
    var room = roomsCopy[roomPick];
    var roomCounter = parseInt(req.cookies.roomCounter) + 1;
    roomsCopy.splice(roomPick, 1);
    console.log(roomPick);
    console.log(room);
    res.cookie('roomsCopy', roomsCopy, {maxAge: 9000000});
    res.cookie('room', room, {maxAge: 9000000});
    res.cookie('roomCounter', roomCounter, {maxAge: 9000000});
    res.render('pages/room', {
        hero: req.cookies.hero,
        health: req.cookies.health,
        gold: req.cookies.gold,
        weapon: req.cookies.weapon,
        item: req.cookies.item,
        magik: req.cookies.magik,
        room: room,
        roomCounter: roomCounter
    });
});
app.get('/outcome', function (req, res) {
    var roomCounter = req.cookies.roomCounter;
    res.render('pages/outcome', {
        hero: req.cookies.hero,
        health: req.cookies.health,
        gold: req.cookies.gold,
        weapon: req.cookies.weapon,
        item: req.cookies.item,
        magik: req.cookies.magik,
        roomCounter: roomCounter
    });
});

app.listen(5252);
console.log('5252 is the magic port');