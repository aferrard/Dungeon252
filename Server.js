//load necessities
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var Connection = require(__dirname + "/Controllers/Connection.js");
var path = require('path');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '')));

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

var roomsMaster = ["GNOME", "DOG", "HOLE", "CHEST", "POTIONS", "DARKWIZARD", "SEASHELL", "CAMPFIRE", "HELICOPTER", "SALESMAN", "FEAST", "CHOOSEAROOM", "LADDERS", "DRYAD"];

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
    var roomPick = Math.round((parseInt(roomsCopy.length) - 1) * Math.random());
    var room = roomsCopy[roomPick];
    var roomCounter = parseInt(req.cookies.roomCounter) + 1;
    var poem = "";
    if (room == "CHOOSEAROOM") {
        poem = "Double my number, I’m less than a score,\n" +
            "Half of my number is less than four.\n" +
            "Add one to my double when bakers are near,\n" +
            "Days of the week are still greater, I fear.";
    } else if (room == "GNOME") {
        poem = "Stronger than steel,\n" +
            "And older than time;\n" +
            "They are more patient than death\n" +
            "and shall stand even when the stars have ceased to shine.\n" +
            "Their strength is embedded\n" +
            "in roots buried deep\n" +
            "Where the sands and frosts of ages\n" +
            "can never hope to touch or reach.";
    }
    if (roomCounter % 10 != 0) {
        roomsCopy.splice(roomPick, 1);
        //console.log(roomPick);
        console.log("picked room: " + room);
        res.cookie('curRoom', room, {maxAge: 9000000});
        res.cookie('roomsCopy', roomsCopy, {maxAge: 9000000});
        res.cookie('roomCounter', roomCounter, {maxAge: 9000000});
        Connection.getRoom(room, function (roomInfo) {
            console.log(roomInfo.image);
            Connection.getChoices(roomInfo.room_id, function (choices) {
                //console.log(choices);
                res.render('pages/room', {
                    hero: req.cookies.hero,
                    health: req.cookies.health,
                    gold: req.cookies.gold,
                    weapon: req.cookies.weapon,
                    item: req.cookies.item,
                    magik: req.cookies.magik,
                    room: room,
                    roomCounter: roomCounter,
                    event: roomInfo.event,
                    choices: choices,
                    poem: poem,
                    image: roomInfo.image
                });
            });
        });
    } else {
        //do room 10 things.
        res.cookie('roomsCopy', roomsMaster, {maxAge: 9000000});
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
    }
});

function getStrength(cookie, cb) {
    var strength = 0;
    if (cookie.item == "Dog tooth") {
        strength += 3;
    }
    console.log(cookie);
    Connection.getWeapon(cookie.weapon, function (wep) {
        strength += wep.strength;
        if (cookie.magik != null && cookie.magik != "None") {
            Connection.getMagik(cookie.magik, function (mag) {
                strength += mag.effect;
            });
        }
    });
    strength += parseInt(cookie.health / 10);
    cb(strength);
}

function getWeight(cookie, cb) {
    var weight = 0;
    console.log(cookie);
    Connection.getWeapon(cookie.weapon, function (wep) {
        weight += wep.weight;
        if (cookie.item != null && cookie.item != "None") {
            Connection.getItem(cookie.item, function (item) {
                weight += item.weight;
            })
        }
        cb(weight);
    })

}

function getRandom(type, cb) {
    var weapons = ["Stick", "Sword", "Whip", "Fish", "Basic staff"];
    var items = ["Chain mail", "Sandwich", "Smoke machine", "Stress ball", "Dog tooth"];
    var magiks = ["Fire", "Water", "Nature", "Air", "Light", "Dark", "Explosion"];
    if (type == "item") {
        var pick = Math.round((parseInt(items.length) - 1) * Math.random());
        cb(items[pick]);
    } else if (type == "magik") {
        var pick = Math.round((parseInt(magiks.length) - 1) * Math.random());
        cb(magiks[pick]);
    } else if (type == "weapon") {
        var pick = Math.round((parseInt(weapons.length) - 1) * Math.random());
        cb(weapons[pick]);
    }
}

app.get('/outcome', function (req, res) {
    console.log(req.query);
    var roomCounter = req.cookies.roomCounter;
    var option = "a";
    var effects = "";
    getStrength(req.cookies, function (str) {
        getWeight(req.cookies, function (weight) {
            if (req.cookies.curRoom == "GNOME") {
                if (req.query.a != undefined) {
                    if (req.query.solution == "Mountain" || "mountain" || "Mountains" || "mountains") {
                        option = "a";
                        effects = "Gain 15 gold";
                        res.cookie('gold', parseInt(req.cookies.gold) + 15, {maxAge: 9000000});
                    } else {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            effects = "Lose 2 HP.";
                            res.cookie('health', parseInt(req.cookies.health) - 2, {maxAge: 9000000});
                        } else {
                            effects = "Lose 3 HP.";
                            res.cookie('health', parseInt(req.cookies.health) - 3, {maxAge: 9000000});
                        }
                    }
                } else if (req.query.b != undefined) {
                    option = "a";
                } else if (req.query.c != undefined) {
                    if (str >= 10) {
                        option = "a";
                        res.cookie('gold', parseInt(req.cookies.gold) + 55, {maxAge: 9000000});
                        if (req.cookies.item == "Chain mail") {
                            effects = ("Gain 55 gold. Lose 2 HP.");
                            res.cookie('health', parseInt(req.cookies.health) - 2, {maxAge: 9000000});
                        } else {
                            effects = ("Gain 55 gold. Lose 3 HP.");
                            res.cookie('health', parseInt(req.cookies.health) - 3, {maxAge: 9000000});
                        }
                    } else {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            effects = ("Lose 10 HP.");
                            res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                        } else {
                            effects = ("Lose 15 HP.");
                            res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                        }
                    }
                } else if (req.query.d != undefined) {
                    if (req.cookies.item == "Smoke machine") {
                        option = "a";
                    } else {
                        option = "b";
                    }
                }
            } else if (req.cookies.curRoom == "DOG") {
                if (req.query.a != undefined) {
                    Connection.getWeapon(req.cookies.weapon, function (wep) {
                        if (wep.attribute.includes("wood")) {
                            option = "a";
                            effects = "Lose your weapon. Gain magik: Familiar.";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            res.cookie('magik', "Familiar", {maxAge: 9000000});
                        } else if (wep.attribute.includes("food")) {
                            option = "b";
                            effects = "Lose your weapon. Gain magik: Familiar.";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            res.cookie('magik', "Familiar", {maxAge: 9000000});
                        } else {
                            option = "c";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            res.cookie('item', "Dog tooth", {maxAge: 9000000});
                            if (req.cookies.item == "Chain mail") {
                                effects = "Lose your weapon. Gain item: Dog tooth. Lose 5 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                            } else {
                                effects = "Lose your weapon. Gain item: Dog tooth. Lose 7 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 7, {maxAge: 9000000});
                            }
                        }
                    });
                } else if (req.query.b != undefined) {
                    getStrength(req.cookies, function (str) {
                        if (str >= 8) {
                            option = "a";
                        } else {
                            option = "b";
                            res.cookie('item', "Dog tooth", {maxAge: 9000000});
                            if (req.cookies.item == "Chain mail") {
                                effects = "Gain item: Dog tooth. Lose 5 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                            } else {
                                effects = "Gain item: Dog tooth. Lose 7 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 7, {maxAge: 9000000});
                            }
                        }
                    })
                } else if (req.query.c != undefined) {
                    if (req.cookies.item == "Smoke machine") {
                        option = "a";
                    } else if (weight > 2) {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            effects = "Lose 3 HP.";
                            res.cookie('health', parseInt(req.cookies.health) - 3, {maxAge: 9000000});
                        } else {
                            effects = "Lose 4 HP.";
                            res.cookie('health', parseInt(req.cookies.health) - 4, {maxAge: 9000000});
                        }
                    } else {
                        option = "c";
                    }
                } else if (req.query.d != undefined) {
                    option = "a";
                    effects = "Lose item. Gain magik: Familiar.";
                    res.cookie('item', "", {maxAge: 9000000});
                    res.cookie('magik', "Familiar", {maxAge: 9000000});
                }
            } else if (req.cookies.curRoom == "HOLE") {
                if (req.query.a != undefined) {
                    if (weight > 3) {
                        option = "a";
                        res.cookie('health', req.cookies.health - 15, {maxAge: 9000000});
                        res.cookie('gold', req.cookies.gold + 10, {maxAge: 9000000});
                    } else {
                        option = "b";
                        res.cookie('health', req.cookies.health + 2, {maxAge: 9000000});
                    }
                } else if (req.query.b != undefined) {
                    if (weight > 2) {
                        option = "a";
                        res.cookie('health', req.cookies.health - 15, {maxAge: 9000000});
                        res.cookie('gold', req.cookies.gold + 10, {maxAge: 9000000});
                    } else {
                        option = "b";
                        res.cookie('health', req.cookies.health + 2, {maxAge: 9000000});
                    }
                } else if (req.query.c != undefined) {
                    Connection.getWeapon(req.cookies.weapon, function (wep) {
                        if (wep.attribute.includes("long")) {
                            option = "a";
                        } else {
                            option = "b";
                        }
                    });
                } else if (req.query.d != undefined) {
                    if (req.cookies.magik == "Earth") {
                        option = "a";
                        res.cookie('health', req.cookies.health + 2, {maxAge: 9000000});
                    } else if (req.cookies.magik == "Fire" || req.cookies.magik == "Air") {
                        option = "b";
                        res.cookie('health', req.cookies.health + 2, {maxAge: 9000000});
                    } else if (req.cookies.magik == "Explosion") {
                        option = "c";
                        res.cookie('health', req.cookies.health - 2, {maxAge: 9000000});
                    } else if (req.cookies.magik == "Familiar") {
                        option = "d";
                        res.cookie('magik', "", {maxAge: 9000000});
                    } else {
                        option = "e";
                        res.cookie('health', req.cookies.health - 15, {maxAge: 9000000});
                        res.cookie('gold', req.cookies.gold + 10, {maxAge: 9000000});
                    }
                }
            } else if (req.cookies.curRoom == "CHEST") {
                if (req.query.a != undefined) {
                    Connection.getWeapon(req.cookies.weapon, function (wep) {
                        if (wep.name != "Fists") {
                            option = "a";
                            getRandom("item", function (item) {
                                res.cookie('item', item, {maxAge: 9000000});
                                effects = ("Gain item: " + item);
                            })
                        } else {
                            option = "b";
                            res.cookie('weapon', "??? Staff", {maxAge: 9000000});
                            effects = ("Gain weapon: ??? Staff");
                        }
                    });
                } else if (req.query.b != undefined) {
                    option = "a";
                } else if (req.query.c != undefined) {
                    if (str < 10) {
                        option = "a";
                        getRandom("item", function (item) {
                            res.cookie('gold', req.cookies.gold + 50, {maxAge: 9000000});
                            res.cookie('item', item, {maxAge: 9000000});
                            effects = ("Gain item: " + item + " and 50 gold.");
                        });
                    } else {
                        res.cookie('gold', req.cookies.gold + 50, {maxAge: 9000000});
                        effects = ("Gain 50 gold.");
                    }
                } else if (req.query.d != undefined) {
                    getRandom("item", function (item) {
                        res.cookie('gold', req.cookies.gold + 50, {maxAge: 9000000});
                        res.cookie('item', item, {maxAge: 9000000});
                        effects = ("Gain item: " + item + " and 50 gold.");
                    });
                }
            } else if (req.cookies.curRoom == "POTIONS") {
                if (req.query.a != undefined) {
                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "DARKWIZARD") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "SEASHELL") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "CAMPFIRE") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "HELICOPTER") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "SALESMAN") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "DRYAD") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "FEAST") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "CHOOSEAROOM") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "LADDERS") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            } else if (req.cookies.curRoom == "ROOM10") {
                if (req.query.a != undefined) {

                } else if (req.query.b != undefined) {

                } else if (req.query.c != undefined) {

                } else if (req.query.d != undefined) {

                }
            }

        });
    });
    Connection.getRoom(req.cookies.curRoom, function (roomInfo) {
        Connection.getOutcome(req.query.choice_id, option, function (outcome) {
            res.render('pages/outcome', {
                hero: req.cookies.hero,
                health: req.cookies.health,
                gold: req.cookies.gold,
                weapon: req.cookies.weapon,
                item: req.cookies.item,
                magik: req.cookies.magik,
                roomCounter: roomCounter,
                curRoom: req.cookies.curRoom,
                outcome: outcome,
                image: roomInfo.image,
            });
        });
    });
});

app.get('/end', function (req, res) {
    res.render('pages/end');
});

app.listen(5252);
console.log('5252 is the magic port');