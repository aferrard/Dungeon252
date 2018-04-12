var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql123",
    database: "dungeon252_data"
});

con.connect(function(err) {
    if (err) throw err;
    else {
        console.log("Connected!");
    }

});

exports.addWinner = addWinner;
function addWinner(username, health, money, weapon, item, magik, cb) {
    //need weapon, item, magik ID number
    con.query("INERT INTO users VALUE( NULL, '" + username + "', " + health + ", " + money + ", " + weapon + ", " + item + ", " + magik, function(err, result) {
        if(err) {
            cb(err);
        } else {
            cb("A new Hero has joined the roster!");
        }
    });
}