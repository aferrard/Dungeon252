var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql123",
    database: "dungeon252_data"
});

con.connect(function (err) {
    if (err) throw err;
    else {
        console.log("Connected!");
    }
});

exports.addWinner = addWinner;
function addWinner(username, health, money, weapon, item, magik, cb) {
    //need weapon, item, magik ID number
    con.query("INERT INTO users VALUE( NULL, '" + username + "', " + health + ", " + money + ", 1,  " + weapon + ", " + item + ", " + magik, function (err, result) {
        if (err) {
            cb(err);
        } else {
            cb("A new Hero has joined the roster!");
        }
    });
}

exports.getWinners = getWinners;
function getWinners(cb) {
    con.query("SELECT * FROM users WHERE winner = 1", function(err, winners) {
        if(err) {
            throw err;
        } else {
            var z = JSON.parse(JSON.stringify(winners));
            cb(z);
        }
    });
}

exports.addLoser = addLoser;
function addLoser (username, health, money, weapon, item, magik, cb) {
    //need weapon, item, magik ID number
    con.query("INERT INTO users VALUE( NULL, '" + username + "', " + health + ", " + money + ", 0,  " + weapon + ", " + item + ", " + magik, function (err, result) {
        if (err) {
            cb(err);
        } else {
            cb("Yet another has fallen");
        }
    });
}

exports.getRoom = getRoom;
function getRoom(title, cb) {
    con.query("SELECT * FROM rooms WHERE title = '" + title + "'", function (err, room) {
        if (err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(room[0]));
            cb(z);
        }
    });
}

exports.getChoices = getChoices;
function getChoices(roomid, cb) {
    con.query("SELECT * FROM choices WHERE rooms_room_id = " + roomid, function (err, choices) {
        if (err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(choices));
            cb(z);
        }
    });
}

exports.getOutcome = getOutcome;

function getOutcome(choiceid, path, cb) {
    //console.log("choiceid: " + choiceid);
    //console.log("path: "+path);
    con.query("SELECT outcome FROM outcomes WHERE choices_choice_id = " + choiceid + " AND outcome_path = '" + path + "'", function (err, outcome) {
        if (err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(outcome[0].outcome));
            cb(z);
        }
    });
}

exports.getWeapon = getWeapon;
function getWeapon(name, cb) {
    con.query("SELECT strength, attribute, weight FROM weapons WHERE name = '" + name + "'", function (err, result) {
        if (err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(result[0]));
            cb(z);
        }
    });
}

exports.getMagik = getMagik;
function getMagik(name, cb) {
    //console.log("name: "+name);
    con.query("SELECT effect, goodagainst FROM magiks WHERE name = '" + name + "'", function (err, result) {
        if (err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(result[0]));
            cb(z);
        }
    });
}

exports.getItem = getItem;
function getItem(name, cb) {
    con.query("SELECT attribute, weight FROM items WHERE name = '" + name + "'", function (err, result) {
        if (err) {
            throw err;
        } else {
            var z = JSON.parse(JSON.stringify(result[0]));
            cb(z);
        }
    });
}

exports.getUsers = getUsers;
function getUsers(cb) {
    con.query("SELECT * FROM users", function(err, users) {
        if(err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(users));
            cb(z);
        }
    });
}