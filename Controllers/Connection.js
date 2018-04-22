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

exports.getRoom = getRoom;
function getRoom(title, cb) {
    con.query("SELECT * FROM rooms WHERE title = '" + title + "'", function(err, room) {
        if(err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(room[0]));
            cb(z);
        }
    });
}

exports.getChoices = getChoices;
function getChoices(roomid, cb) {
    con.query("SELECT * FROM choices WHERE rooms_room_id = " + roomid, function(err, choices) {
        if(err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(choices));
            cb(z);
        }
    });
}

exports.getOutcome = getOutcome;
function getOutcome(choiceid, path, cb) {
    con.query("SELECT outcome FROM outcomes WHERE choices_choice_id = " + choiceid + " AND outcome_path = '" + path + "'", function(err, outcome) {
        if(err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(outcome[0].outcome));
            cb(z);
        }
    });
}

exports.getWeaponStr = getWeaponStr;
function getWeaponStr(name, cb) {
    if(name == null || name == "") {
        cb(0);
    } else {
        con.query("SELECT strength FROM weapons WHERE name = '" + name + "'", function (err, result) {
            if (err) {
                cb(err);
            } else {
                var z = JSON.parse(JSON.stringify(result[0].strength));
                cb(z);
            }
        });
    }
}

exports.getMagicStr = getMagicStr;
function getMagicStr(name, cb) {
    if(name == null || name == "") {
        cb(0);
    } else {
        con.query("SELECT effect FROM magiks WHERE name = '" + name + "'", function(err, result) {
            if(err) {
                cb(err);
            } else {
                var z = JSON.parse(JSON.stringify(result[0].effect));
                cb(z);
            }
        });
    }
}