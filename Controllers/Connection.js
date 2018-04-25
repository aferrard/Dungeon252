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

function getWeaponId(weapon, cb) {
    con.query("SELECT weapon_id FROM weapons WHERE name = '" + weapon + "'", function(err, result) {
        if(err) {
            //throw err;
            //default to fists
            cb(1);
        } else {
            var z = JSON.parse(JSON.stringify(result[0].weapon_id));
            cb(z);
        }
    });
}

function getItemId(item, cb) {
    con.query("SELECT item_id FROM items WHERE name = '" + item + "'", function(err, result) {
        if(err) {
            //throw err;
            //default to None
            cb(13);
        } else {
            var z = JSON.parse(JSON.stringify(result[0].item_id));
            cb(z);
        }
    });
}

function getMagikId(magik, cb) {
    con.query("SELECT magik_id FROM magiks WHERE name = '" + magik + "'", function(err, result) {
        if(err) {
            //throw err;
            //default to None
            cb(9);
        } else {
            var z = JSON.parse(JSON.stringify(result[0].magik_id));
            cb(z);
        }
    });
}

exports.addWinner = addWinner;
function addWinner(username, health, money, strength, weight, score, numrooms, weapon, item, magik, cb) {
    //need weapon, item, magik ID number
    getWeaponId(weapon, function(weaponid) {
        getItemId(item, function(itemid) {
            getMagikId(magik, function(magikid) {
                con.query("INSERT INTO users VALUE( NULL, '" + username + "', " + health + ", " + money + ", " + strength + ", " + weight + ", " + score + ", " + numrooms + ", 1,  " + weaponid + ", " + itemid + ", " + magikid + ")", function (err, result) {
                    if (err) {
                        cb(err);
                    } else {
                        cb("A new Hero has joined the roster!");
                    }
                });
            });
        });
    });
}

exports.getWinners = getWinners;
function getWinners(cb) {
    var async = require('async');
    con.query("SELECT * FROM users WHERE winner = 1 ORDER BY user_id DESC", function(err, winners) {
        if(err) {
            throw err;
        } else {
            var z = JSON.parse(JSON.stringify(winners));

            var counter = 0;
            async.each(z, function(row, ret) {
                convertToString(row.weapons_weapon_id, row.items_item_id, row.magiks_magik_id, function(weapon, item, magik) {
                    row.weapons_weapon_id = weapon;
                    row.items_item_id = item;
                    row.magiks_magik_id = magik;
                    counter++;
                    //console.log("row");
                    //console.log(counter);
                    //console.log(row);
                    if(counter == z.length) {
                        cb(z);
                        return;
                    }
                });
                ret();
            });

            //cb(z);
        }
    });
}

exports.addLoser = addLoser;
function addLoser (username, health, money, strength, weight, score, numrooms, weapon, item, magik, cb) {
    //need weapon, item, magik ID number
    getWeaponId(weapon, function(weaponid) {
        getItemId(item, function(itemid) {
            getMagikId(magik, function(magikid) {
                con.query("INSERT INTO users VALUE( NULL, '" + username + "', " + health + ", " + money + ", " + strength + ", " + weight + ", " + score + ", " + numrooms + ", 0,  " + weaponid + ", " + itemid + ", " + magikid + ")", function (err, result) {
                    if (err) {
                        cb(err);
                    } else {
                        cb("A new Hero has joined the roster!");
                    }
                });
            });
        });
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

function convertToString(weaponid, itemid, magikid, cb) {
    getWeaponFromId(weaponid, function(weapon) {
        getItemFromId(itemid, function(item) {
            getMagikFromId(magikid, function(magik) {
                cb(weapon, item, magik);
            });
        });
    });
}

exports.getUsers = getUsers;
function getUsers(cb) {
    var async = require('async');
    con.query("SELECT * FROM users ORDER BY score DESC", function(err, users) {
        if(err) {
            cb(err);
        } else {
            //var i = 0;
            var z = JSON.parse(JSON.stringify(users));
            //console.log("length:" + z.length);
            /*for(i; i < z.length -1; i++) {
                getWeaponFromId(z[i].weapons_weapon_id, function(weapon) {
                    getItemFromId(z[i].items_item_id, function(item) {
                        getMagikFromId(z[i].magiks_magik_id, function(magik){
                            z[i].weapons_weapon_id = weapon;
                            z[i].items_item_id = item;
                            z[i].magiks_magik_id = magik;
                            console.log("test");
                            console.log(z[i]);
                            if(i == z.length-1) {
                                console.log("cb ing");
                                cb(z);
                            }
                        });
                    });
                });
            }*/
            var counter = 0;
            async.each(z, function(row, ret) {
                convertToString(row.weapons_weapon_id, row.items_item_id, row.magiks_magik_id, function(weapon, item, magik) {
                    row.weapons_weapon_id = weapon;
                    row.items_item_id = item;
                    row.magiks_magik_id = magik;
                    counter++;
                    //console.log("row");
                    //console.log(counter);
                    //console.log(row);
                    if(counter == z.length) {
                        cb(z);
                        return;
                    }
                });
                ret();
            });


            //console.log("new z");
            //console.log(z);
            //cb(z);
        }
    });
}

exports.getBoss = getBoss;
function getBoss(cb) {
    var async = require('async');
    con.query("SELECT * FROM users WHERE winner = 1 ORDER BY user_id DESC", function(err, result) {
        if(err) {
            cb(err);
        } else {
            //console.log(result);
            //var z = JSON.parse(JSON.stringify(result[0]));
            var z = JSON.parse(JSON.stringify(result));

            var counter = 0;
            async.each(z, function(row, ret) {
                convertToString(row.weapons_weapon_id, row.items_item_id, row.magiks_magik_id, function(weapon, item, magik) {
                    row.weapons_weapon_id = weapon;
                    row.items_item_id = item;
                    row.magiks_magik_id = magik;
                    counter++;
                    //console.log("row");
                    //console.log(counter);
                    //console.log(row);
                    if(counter == z.length) {
                        cb(z[0]);
                        return;
                    }
                });
                ret();
            });

            //cb(z);
        }
    });
}

exports.addGoldToBoss = addGoldToBoss;
function addGoldToBoss(amount, cb) {
    getBoss(function(boss) {
        var gold = parseInt(boss.money);
        gold += parseInt(amount);
        con.query("UPDATE users SET money = " + gold + " WHERE username = '" + boss.username + "'", function(err, result) {
            if(err) {
                cb(err);
            } else {
                cb("Added " + amount + " gold to boss. boss gold is now " + gold);
            }
        });
    });
}

exports.getWeaponFromId = getWeaponFromId;
function getWeaponFromId(weaponid, cb) {
    //console.log(weaponid);
    con.query("SELECT name FROM weapons WHERE weapon_id = " + weaponid, function(err, result) {
        if(err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(result[0].name));
            cb(z);
        }
    });
}

exports.getItemFromId = getItemFromId;
function getItemFromId(itemid, cb) {
    //console.log(itemid);
    con.query("SELECT name FROM items WHERE item_id = " + itemid, function(err, result) {
        if(err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(result[0].name));
            cb(z);
        }
    });
}

exports.getMagikFromId = getMagikFromId;
function getMagikFromId(magikid, cb) {
    //console.log(magikid);
    con.query("SELECT name FROM magiks WHERE magik_id = " + magikid, function(err, result) {
        if(err) {
            cb(err);
        } else {
            var z = JSON.parse(JSON.stringify(result[0].name));
            cb(z);
        }
    });
}