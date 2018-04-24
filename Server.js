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
    Connection.getUsers(function (userInfo) {
        res.render('pages/leaderboard', {
            username: userInfo.username,
            money: userInfo.money,

        });

    });
});

app.get('/champ', function (req, res) {
    Connection.getWinners(function (winnerInfo) {
        res.render('pages/champ', {
            username: winnerInfo.username,
            money: winnerInfo.money
        });

    });
});

var roomsMaster = ["GNOME", "DOG", "HOLE", "CHEST", "POTIONS", "DARKWIZARD", "SEASHELL", "CAMPFIRE", "HELICOPTER", "SALESMAN", "FEAST", "CHOOSEAROOM", "LADDERS", "DRYAD"];

app.get('/start', function (req, res) {
    res.cookie('hero', req.query.hero, {maxAge: 9000000});
    res.cookie('health', 20, {maxAge: 9000000});
    res.cookie('gold', 50, {maxAge: 9000000});
    res.cookie('weapon', "Stick", {maxAge: 9000000});
    res.cookie('item', "None", {maxAge: 9000000});
    res.cookie('magik', "None", {maxAge: 9000000});
    res.cookie('str', 10, {maxAge: 9000000});
    res.cookie('weight', 1, {maxAge: 9000000});
    res.cookie('roomsCopy', roomsMaster, {maxAge: 9000000});
    res.cookie('roomCounter', 0, {maxAge: 9000000});
    res.render('pages/start');
});

var nextRoom = "0";
app.get('/room', function (req, res) {
    console.log(req.cookies);
    var roomsCopy = req.cookies.roomsCopy;
    if (nextRoom == "0") {
        var roomPick = Math.round((parseInt(roomsCopy.length) - 1) * Math.random());
        var room = roomsCopy[roomPick];
    } else {
        var room = nextRoom;
        var roomPick = roomsCopy.indexOf(room);
        nextRoom = "0";
    }
    getWeight(req.cookies, function (weight) {
        getStrength(req.cookies, function (str) {
            res.cookie('str', str, {maxAge: 9000000});
            res.cookie('weight', weight, {maxAge: 9000000});
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
                            str: str,
                            weight: weight,
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
                res.cookie('curRoom', "ROOM10", {maxAge: 9000000});
                res.cookie('roomsCopy', roomsMaster, {maxAge: 9000000});
                res.cookie('roomCounter', roomCounter, {maxAge: 9000000});
                Connection.getRoom("ROOM10", function (roomInfo) {
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
                            str: str,
                            weight: weight,
                            room: "THRONE",
                            roomCounter: roomCounter,
                            event: roomInfo.event,
                            choices: choices,
                            poem: poem,
                            image: roomInfo.image
                        });
                    });
                });
            }
        });
    });
});

function getStrength(cookie, cb) {
    var strength = 0;
    console.log("STRENGTH");
    if (cookie.item == "Dog tooth") {
        strength += 3;
    }
    console.log(cookie.weapon);
    Connection.getWeapon(cookie.weapon, function (wep) {
        console.log(wep);
        strength += wep.strength;
        console.log(cookie.magik);
        if (cookie.magik != null && cookie.magik != "None") {
            Connection.getMagik(cookie.magik, function (mag) {
                console.log(mag);
                strength += mag.effect;
                strength += parseInt(cookie.health / 10);
                console.log(strength);
                cb(strength);
            });
        } else {
            strength += parseInt(cookie.health / 10);
            console.log(strength);
            cb(strength);
        }
    });

}

function getWeight(cookie, cb) {
    console.log("WEIGHT");
    var weight = 0;
    console.log(cookie.weapon);
    Connection.getWeapon(cookie.weapon, function (wep) {
        console.log(wep);
        weight += wep.weight;
        console.log(cookie.item);
        if (cookie.item != null && cookie.item != "None") {
            Connection.getItem(cookie.item, function (item) {
                console.log(item);
                weight += item.weight;
                console.log(weight);
                cb(weight);
            })
        } else {
            console.log(weight);
            cb(weight);
        }
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

function room10(str, weight, cookie, query, cb) {
    var effects = "";
    var outcome = "";
    Connection.getBoss(function(boss){
        if (query.a != undefined) {
            if (str > boss.str || (str == boss.str) && (weight < boss.weight)) {
                outcome = "Your hits strike true, beating down the shadowy figure until it is nothing but a corpse on the floor. \nSuddenly, the shadows that had concealed them rush at you, enveloping your entire body and forcing you onto the golden throne.\n Here you will remain, until another takes your place.";
                effects = "You are victorious, but at what cost?";
            } else {
                outcome = "You are stopped by a shadowed weapon through the chest.\n You can\'t even think as the being pulls his weapon from you and snarls.\n \"Pathetic. Now I must wait for another.\"\n You fall, joining the pile of bodies as your vision fades to black.";
                effects = "You Died";
            }
        } else if (query.b != undefined) {
            if(query.bribe >= (boss.gold * 1.5) && cookie.health >= boss.health - 5){
                outcome = "\"Ha! It isn\'t often that I see someone more worthy of being the king here. Have a seat.\" The being gets up and steps aside. As you sit on the throne, you watch the shadows leap from the being to you, revealing a person with a grateful smile. The instant the last speck of shadow leaves them, they vanish, taking your gold with them. You realize it now. Here you will remain, until another takes your place.";
                effects = "You are victorious, but at what cost?";
            }else if((query.bribe > boss.gold) && cookie.health < boss.health - 5){
                outcome = "The being approaches you with what you think is a smile behind all the shadows. \"I see you’ve done well with yourself in my dungeon.\" They stop in front of you. It is then you notice a pain in your chest. \"But what good is a king without strength?\" They whisper into your ear, and you finally notice their weapon, pierced through you entirely. You fall, joining the pile of bodies as your vision fades to black.";
                effects = "You Died. The Boss took your gold too. That was dumb.";
            }else if(cookie.health >= boss.health - 5 && (query.bribe < (boss.gold * 1.5))){
                outcome = "\"You\'ve clearly faced less trials than me.\" The being frowns at you, eyebrows made of shadows furrowed. \"You had potential\" Before you can react, you notice a pain in your chest. \"A shame really. Your wealth will barely add to my collection in the least.\" They whisper into your ear, and you finally notice their weapon, pierced through you entirely. You fall, joining the pile of bodies as your vision fades to black.";
                effects = "You Died. The Boss took your gold too. That was dumb.";
            }
        } else if (query.c != undefined) {

        } else if (query.d != undefined) {

        }
    });
    cb(outcome, effects);
}

app.get('/outcome', function (req, res) {
    console.log(req.query);
    var roomCounter = req.cookies.roomCounter;
    var option;
    var effects = "Nothing happens.";
    var room10 = false;
    var temphealth = req.cookies.health;
    var died = false;
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
                            if ((parseInt(req.cookies.health) - 2) > 0) {
                                effects = "Lose 2 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 2, {maxAge: 9000000});
                            } else {
                                effects = "You lost 2 HP and died.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 3) > 0) {
                                effects = "Lose 3 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 3, {maxAge: 9000000});
                            } else {
                                effects = "You lost 3 HP and died.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                } else if (req.query.b != undefined) {
                    option = "a";
                } else if (req.query.c != undefined) {
                    if (str >= 10) {
                        option = "a";
                        res.cookie('gold', parseInt(req.cookies.gold) + 55, {maxAge: 9000000});
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 2) > 0) {
                                effects = ("Gain 55 gold. Lose 2 HP.");
                                res.cookie('health', parseInt(req.cookies.health) - 2, {maxAge: 9000000});
                            }
                            else {
                                effects = ("Gain 55 gold. But you lose 2 HP and die.");
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 3) > 0) {
                                effects = ("Gain 55 gold. Lose 3 HP.");
                                res.cookie('health', parseInt(req.cookies.health) - 3, {maxAge: 9000000});
                            }
                            else {
                                effects = ("Gain 55 gold. But you lose 3 HP and die.");
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    } else {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = ("Lose 10 HP.");
                                res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                            }
                            else {
                                effects = ("Lose 10 HP and you die.");
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = ("Lose 15 HP.");
                                res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                            }
                            else {
                                effects = ("Lose 15 HP and you die.");
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
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
                        if (wep.attribute.includes("Wood")) {
                            option = "a";
                            effects = "Lose your weapon. Gain magik: Familiar.";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            res.cookie('magik', "Familiar", {maxAge: 9000000});
                        } else if (wep.attribute.includes("Food")) {
                            option = "b";
                            effects = "Lose your weapon. Gain magik: Familiar.";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            res.cookie('magik', "Familiar", {maxAge: 9000000});
                        } else {
                            option = "c";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            res.cookie('item', "Dog tooth", {maxAge: 9000000});
                            if (req.cookies.item == "Chain mail") {
                                if ((parseInt(req.cookies.health) - 5) > 0) {
                                    effects = "Lose your weapon. Gain item: Dog tooth. Lose 5 HP.";
                                    res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                                }
                                else {
                                    effects = "Lose your weapon. Gain item: Dog tooth. Lose 5 HP and you die.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    died = true;
                                }

                            } else {
                                if ((parseInt(req.cookies.health) - 7) > 0) {
                                    effects = "Lose your weapon. Gain item: Dog tooth. Lose 7 HP.";
                                    res.cookie('health', parseInt(req.cookies.health) - 7, {maxAge: 9000000});
                                }
                                else {
                                    effects = "Lose your weapon. Gain item: Dog tooth. Lose 7 HP and you die.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    died = true;
                                }
                            }
                        }
                    });
                } else if (req.query.b != undefined) {
                    if (str >= 8) {
                        option = "a";
                        effects = "Nothing happens.";
                    } else {
                        option = "b";
                        res.cookie('item', "Dog tooth", {maxAge: 9000000});
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 5) > 0) {
                                effects = "Gain item: Dog tooth. Lose 5 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                            }
                            else {
                                effects = "Gain item: Dog tooth. Lose 5 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }

                        } else {
                            if ((parseInt(req.cookies.health) - 7) > 0) {
                                effects = "Gain item: Dog tooth. Lose 7 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 7, {maxAge: 9000000});
                            }
                            else {
                                effects = "Gain item: Dog tooth. Lose 7 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                } else if (req.query.c != undefined) {
                    if (req.cookies.item == "Smoke machine") {
                        option = "a";
                    } else if (weight > 2) {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 3) > 0) {
                                effects = "Lose 3 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 3, {maxAge: 9000000});
                            } else {
                                effects = "Lose 3 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 4) > 0) {
                                effects = "Lose 4 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 4, {maxAge: 9000000});
                            } else {
                                effects = "Lose 4 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    } else {
                        option = "c";
                    }
                } else if (req.query.d != undefined) {
                    option = "a";
                    effects = "Lose item. Gain magik: Familiar.";
                    res.cookie('item', "None", {maxAge: 9000000});
                    res.cookie('magik', "Familiar", {maxAge: 9000000});
                }
            } else if (req.cookies.curRoom == "HOLE") {
                if (req.query.a != undefined) {
                    if (weight > 3) {
                        option = "a";
                        res.cookie('gold', parseInt(req.cookies.gold) + 10, {maxAge: 9000000});
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = "Gain 10 gold. Lose 10 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                            }
                            else {
                                effects = "Gain 10 gold. Lose 10 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 15) > 0) {
                                effects = "Gain 10 gold. Lose 15 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                            }
                            else {
                                effects = "Gain 10 gold. Lose 15 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    } else {
                        option = "b";
                        effects = "Gain 2 HP.";
                        res.cookie('health', parseInt(req.cookies.health) + 2, {maxAge: 9000000});
                    }
                } else if (req.query.b != undefined) {
                    if (weight > 2) {
                        option = "a";
                        res.cookie('gold', parseInt(req.cookies.gold) + 10, {maxAge: 9000000});
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = "Gain 10 gold. Lose 10 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                            }
                            else {
                                effects = "Gain 10 gold. Lose 10 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 15) > 0) {
                                effects = "Gain 10 gold. Lose 15 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                            }
                            else {
                                effects = "Gain 10 gold. Lose 15 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    } else {
                        option = "b";
                        effects = "Gain 2 HP.";
                        res.cookie('health', parseInt(req.cookies.health) + 2, {maxAge: 9000000});
                    }
                } else if (req.query.c != undefined) {
                    Connection.getWeapon(req.cookies.weapon, function (wep) {
                        if (wep.attribute.includes("Long")) {
                            option = "a";
                        } else {
                            option = "b";
                            effects = "Lose your weapon."
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                        }
                    });
                } else if (req.query.d != undefined) {
                    if (req.cookies.magik == "Nature") {
                        option = "a";
                        effects = "Gain 2 HP.";
                        res.cookie('health', parseInt(req.cookies.health) + 2, {maxAge: 9000000});
                    } else if (req.cookies.magik == "Fire" || req.cookies.magik == "Air") {
                        option = "b";
                        effects = "Gain 2 HP.";
                        res.cookie('health', parseInt(req.cookies.health) + 2, {maxAge: 9000000});
                    } else if (req.cookies.magik == "Explosion") {
                        option = "c";
                        effects = "Lose 2 HP.";
                        res.cookie('health', parseInt(req.cookies.health) - 2, {maxAge: 9000000});
                    } else if (req.cookies.magik == "Familiar") {
                        option = "d";
                        effects = "Lose your magik.";
                        res.cookie('magik', "None", {maxAge: 9000000});
                    } else {
                        option = "e";
                        res.cookie('gold', parseInt(req.cookies.gold) + 10, {maxAge: 9000000});
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = "Gain 10 gold. Lose 10 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                            }
                            else {
                                effects = "Gain 10 gold. Lose 10 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 15) > 0) {
                                effects = "Gain 10 gold. Lose 15 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                            }
                            else {
                                effects = "Gain 10 gold. Lose 15 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
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
                            res.cookie('gold', parseInt(req.cookies.gold) + 50, {maxAge: 9000000});
                            res.cookie('item', item, {maxAge: 9000000});
                            effects = ("Gain item: " + item + " and 50 gold.");
                        });
                    } else {
                        option = "b";
                        res.cookie('gold', parseInt(req.cookies.gold) + 50, {maxAge: 9000000});
                        effects = ("Gain 50 gold.");
                    }
                } else if (req.query.d != undefined) {
                    option = "a";
                    getRandom("item", function (item) {
                        res.cookie('gold', parseInt(req.cookies.gold) + 50, {maxAge: 9000000});
                        res.cookie('item', item, {maxAge: 9000000});
                        effects = ("Gain item: " + item + " and 50 gold.");
                    });
                }
            } else if (req.cookies.curRoom == "POTIONS") {
                if (req.query.a != undefined) {
                    option = "a";
                } else if (req.query.b != undefined) {
                    option = "a";
                    if ((parseInt(req.cookies.health) - 8) > 0) {
                        effects = "Lose 8 HP.";
                        res.cookie('health', parseInt(req.cookies.health) - 8, {maxAge: 9000000});
                    }
                    else {
                        effects = "Lose 8 HP.";
                        res.cookie('health', 0, {maxAge: 9000000});
                        died = true;
                    }
                } else if (req.query.c != undefined) {
                    option = "a";
                    effects = "Gain 16 HP.";
                    res.cookie('health', parseInt(req.cookies.health) + 16, {maxAge: 9000000});
                } else if (req.query.d != undefined) {
                    option = "a";
                    getRandom("magik", function (mag) {
                        res.cookie('magik', mag, {maxAge: 9000000});
                        effects = ("Gain magik: " + mag);
                    });
                }
            } else if (req.cookies.curRoom == "DARKWIZARD") {
                if (req.query.a != undefined) {
                    if (parseInt(req.query.bribe) >= 30) {
                        option = "a";
                        res.cookie('gold', (parseInt(req.cookies.gold) - parseInt(req.query.bribe)), {maxAge: 9000000});
                        effects = "Lose " + req.query.bribe + " gold.";
                    } else {
                        option = "b";
                        if (req.cookies.magik == "Light") {
                            res.cookie('magik', "None", {maxAge: 9000000});
                            effects = "The power of your magik protects you. Lose magik: Light";
                        } else {
                            if (req.cookies.item == "Chain mail") {
                                if ((parseInt(req.cookies.health) - 10) > 0) {
                                    effects = "Lose 10 HP. Lose " + req.query.bribe + " gold.";
                                    res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                                    res.cookie('gold', (parseInt(req.cookies.gold) - parseInt(req.query.bribe)), {maxAge: 9000000});

                                } else {
                                    effects = "Lose 10 HP and you die. Lose " + req.query.bribe + " gold.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    res.cookie('gold', (parseInt(req.cookies.gold) - parseInt(req.query.bribe)), {maxAge: 9000000});
                                    died = true;
                                }

                            } else {
                                if ((parseInt(req.cookies.health) - 15) > 0) {
                                    effects = "Lose 15 HP. Lose " + req.query.bribe + " gold.";
                                    res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                                    res.cookie('gold', (parseInt(req.cookies.gold) - parseInt(req.query.bribe)), {maxAge: 9000000});

                                } else {
                                    effects = "Lose 15 HP and you die. Lose " + req.query.bribe + " gold.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    res.cookie('gold', (parseInt(req.cookies.gold) - parseInt(req.query.bribe)), {maxAge: 9000000});
                                    died = true;
                                }
                            }
                        }
                    }
                } else if (req.query.b != undefined) {
                    if (req.cookies.magik == "None") {
                        option = "a";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = "Lose 10 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 10 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 15) > 0) {
                                effects = "Lose 15 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 15 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    } else if (req.cookies.magik != "Familiar" && req.cookies.magik != "Fire" && req.cookies.magik != "Light" && req.cookies.magik != "Explosion" && req.cookies.magik != "Darkr") {
                        option = "b";
                    } else if (req.cookies.magik == "Familiar" || req.cookies.magik == "Fire" || req.cookies.magik == "Light" || req.cookies.magik == "Explosion") {
                        option = "c";
                        res.cookie('weapon', "Basic staff", {maxAge: 9000000});
                        res.cookie('magik', "Dark", {maxAge: 9000000});
                        effects = "Gain weapon: Basic staff. Gain magik: Dark.";
                    } else {
                        option = "d";
                        effects = "Gain item: Grief Orb.";
                        res.cookie('item', "Grief Orb", {maxAge: 9000000});
                    }
                } else if (req.query.c != undefined) {
                    if (weight > 3 && req.cookies.item != "Smoke machine") {
                        option = "a";
                        if (req.cookies.magik == "Light") {
                            res.cookie('magik', "None", {maxAge: 9000000});
                            effects = "The power of your magik protects you. Lose magik: Light";
                        } else {
                            if (req.cookies.item == "Chain mail") {
                                if ((parseInt(req.cookies.health) - 10) > 0) {
                                    effects = "Lose 10 HP.";
                                    res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                                }
                                else {
                                    effects = "Lose 10 HP and you die.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    died = true;
                                }
                            } else {
                                if ((parseInt(req.cookies.health) - 15) > 0) {
                                    effects = "Lose 15 HP.";
                                    res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                                }
                                else {
                                    effects = "Lose 15 HP and you die.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    died = true;
                                }
                            }
                        }
                    } else {
                        option = "b";
                    }
                } else if (req.query.d != undefined) {
                    option = "a";
                    if (req.cookies.item == "Chain mail") {
                        if ((parseInt(req.cookies.health) - 17) > 0) {
                            effects = "Lose 7 HP.";
                            res.cookie('health', parseInt(req.cookies.health) - 7, {maxAge: 9000000});
                        }
                        else {
                            effects = "Lose 7 HP and you die.";
                            res.cookie('health', 0, {maxAge: 9000000});
                            died = true;
                        }
                    } else {
                        if ((parseInt(req.cookies.health) - 10) > 0) {
                            effects = "Lose 10 HP.";
                            res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                        }
                        else {
                            effects = "Lose 10 HP and you die.";
                            res.cookie('health', 0, {maxAge: 9000000});
                            died = true;
                        }
                    }
                }
            } else if (req.cookies.curRoom == "SEASHELL") {
                if (req.query.a != undefined) {
                    if (weight >= 3) {
                        option = "a";
                    } else {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 2) > 0) {
                                effects = "Lose 2 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 2, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 2 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 3) > 0) {
                                effects = "Lose 3 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 3, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 3 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                } else if (req.query.b != undefined) {
                    if (str >= 15) {
                        option = "a";
                    } else {
                        option = "b";
                        res.cookie('magik', "Water", {maxAge: 9000000});
                        effects = "Gain magik: Water.";
                    }
                } else if (req.query.c != undefined) {
                    if (req.cookies.magik != "Water") {
                        option = "a";
                        res.cookie('magik', "Water", {maxAge: 9000000});
                        effects = "Gain magik: Water.";
                    } else {
                        option = "b";
                        effects = "Gain item: Shell.";
                        res.cookie('item', "Shell", {maxAge: 9000000});
                    }
                } else if (req.query.d != undefined) {
                    console.log(req.query.solution);
                    if (req.query.solution == "SEGV" || req.query.solution == "EXECVP Error" || req.query.solution == "EXECVP" || req.query.solution == "Due Tomorrow" || req.query.solution == "due tomorrow" || req.query.solution == "Due tomorrow" || req.query.solution == "Gustavo") {
                        option = "a";
                        effects = "Gain item: Stress ball.";
                        res.cookie('item', "Stress ball", {maxAge: 9000000});
                    } else {
                        option = "b";
                        effects = "Gain weapon: Fish.";
                        res.cookie('weapon', "Fish", {maxAge: 9000000});
                    }
                }
            } else if (req.cookies.curRoom == "CAMPFIRE") {
                if (req.query.a != undefined) {
                    option = "a";
                } else if (req.query.b != undefined) {
                    Connection.getWeapon(req.cookies.weapon, function (wep) {
                        if (wep.attribute.includes("Wood")) {
                            console.log(wep);
                            option = "a";
                            effects = "Lose Weapon, Gain 20 HP. Gain magik: Fire.";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            res.cookie('health', parseInt(req.cookies.health) + 20, {maxAge: 9000000});
                            res.cookie('magik', "Fire", {maxAge: 9000000});
                        } else {
                            option = "b";
                            effects = "Gain weapon: Fire sword.";
                            res.cookie('weapon', "Fire sword", {maxAge: 9000000});
                        }
                        console.log(effects);
                    });
                } else if (req.query.c != undefined) {
                    if (req.cookies.magik == "Nature" || req.cookies.magik == "Air") {
                        option = "a";
                        res.cookie('magik', "Fire", {maxAge: 9000000});
                        effects = "Gain magik: Fire.";
                    } else if (req.cookies.magik == "Water") {
                        option = "b";
                    } else if (req.cookies.magik == "Fire") {
                        option = "c";
                        effects = "Gain item: Eternal Flame.";
                        res.cookie('item', "Eternal Flame", {maxAge: 9000000});
                    } else {
                        option = "d";
                    }
                } else if (req.query.d != undefined) {
                    option = "a";
                    effects = "Gain 50 HP.";
                    res.cookie('health', parseInt(req.cookies.health) + 50, {maxAge: 9000000});
                }
            } else if (req.cookies.curRoom == "HELICOPTER") {
                if (req.query.a != undefined) {
                    Connection.getWeapon(req.cookies.weapon, function (wep) {
                        if (wep.attribute.includes("Metal")) {
                            option = "a";
                            effects = "Lose weapon. Gain magik: Explosion.";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            res.cookie('magik', "Explosion", {maxAge: 9000000});
                        } else if (wep.attribute.includes("Slippery")) {
                            option = "b";
                        } else {
                            option = "c";
                            res.cookie('weapon', "Fists", {maxAge: 9000000});
                            if (req.cookies.item == "Chain mail") {
                                if ((parseInt(req.cookies.health) - 10) > 0) {
                                    effects = "Lose Weapon. Lose 10 HP.";
                                    res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                                }
                                else {
                                    effects = "Lose Weapon. Lose 10 HP and you die.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    died = true;
                                }
                            } else {
                                if ((parseInt(req.cookies.health) - 15) > 0) {
                                    effects = "Lose Weapon. Lose 15 HP.";
                                    res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                                }
                                else {
                                    effects = "Lose Weapon. Lose 15 HP and you die.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    died = true;
                                }
                            }
                        }
                    });
                } else if (req.query.b != undefined) {
                    if (weight < 3) {
                        option = "a";
                    } else {
                        option = "b";
                        res.cookie('gold', (parseInt(req.cookies.gold) - (parseInt(req.cookies.gold))), {maxAge: 9000000});
                        effects = "Lose all of your gold. You want your hair to look good, right?";
                    }
                } else if (req.query.c != undefined) {
                    if (req.cookies.magik == "Explosion") {
                        option = "a";
                        effects = "Gain item: Atom Bomb.";
                        res.cookie('item', "Atom Bomb", {maxAge: 9000000});
                    } else if (req.cookies.magik == "Water") {
                        option = "b";
                    } else if (req.cookies.magik == "Familiar") {
                        option = "c";
                        res.cookie('magik', "None", {maxAge: 9000000});
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 4) > 0) {
                                effects = "Lose magik. Lose 4 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 4, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose magik. Lose 4 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 5) > 0) {
                                effects = "Lose magik. Lose 5 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose magik. Lose 5 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    } else {
                        option = "d";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 4) > 0) {
                                effects = "Lose 4 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 4, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 4 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 5) > 0) {
                                effects = "Lose 5 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 5 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                } else if (req.query.d != undefined) {
                    if (req.cookies.magik == "Explosion") {
                        option = "a";
                        effects = "Gain weapon: Rotor blade.";
                        res.cookie('weapon', "Rotor blade", {maxAge: 9000000});
                    } else {
                        option = "b";
                        if (req.cookies.magik != "None") {
                            res.cookie('magik', "None", {maxAge: 9000000});
                            effects = "Lose magik.";
                        } else {
                            if (req.cookies.item == "Chain mail") {
                                if ((parseInt(req.cookies.health) - 10) > 0) {
                                    effects = "Lose 10 HP.";
                                    res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                                }
                                else {
                                    effects = "Lose 10 HP and you die.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    died = true;
                                }
                            } else {
                                if ((parseInt(req.cookies.health) - 15) > 0) {
                                    effects = "Lose 15 HP.";
                                    res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                                }
                                else {
                                    effects = "Lose 15 HP and you die.";
                                    res.cookie('health', 0, {maxAge: 9000000});
                                    died = true;
                                }
                            }
                        }
                    }
                }
            } else if (req.cookies.curRoom == "SALESMAN") {
                if (req.query.a != undefined) {
                    if (req.cookies.gold >= 30) {
                        option = "a";
                        effects = "Lose 30 gold. Gain weapon: Warhammer.";
                        res.cookie('gold', (parseInt(req.cookies.gold) - 30), {maxAge: 9000000});
                        res.cookie('weapon', "Warhammer", {maxAge: 9000000});
                    } else {
                        option = "b";
                    }
                } else if (req.query.b != undefined) {
                    option = "a";
                    if (req.cookies.item == "Chain mail") {
                        if ((parseInt(req.cookies.health) - 4) > 0) {
                            effects = "Lose 4 HP.";
                            res.cookie('health', parseInt(req.cookies.health) - 4, {maxAge: 9000000});
                        }
                        else {
                            effects = "Lose 4 HP and you die.";
                            res.cookie('health', 0, {maxAge: 9000000});
                            died = true;
                        }
                    } else {
                        if ((parseInt(req.cookies.health) - 5) > 0) {
                            effects = "Lose 5 HP.";
                            res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                        }
                        else {
                            effects = "Lose 5 HP and you die.";
                            res.cookie('health', 0, {maxAge: 9000000});
                            died = true;
                        }
                    }
                } else if (req.query.c != undefined) {
                    if (str >= 8) {
                        option = "a";
                        effects = "Gain weapon: Warhammer.";
                        res.cookie('weapon', "Warhammer", {maxAge: 9000000});
                    } else {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 6) > 0) {
                                effects = "Lose 6 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 6, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 6 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 8) > 0) {
                                effects = "Lose 8 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 8, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 8 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                } else if (req.query.d != undefined) {
                    if (req.query.bribe >= 25) {
                        option = "a";
                        effects = "Lose gold: " + req.query.bribe + ". Gain weapon: Warhammer.";
                        res.cookie('gold', (parseInt(req.cookies.gold) - parseInt(req.query.bribe)), {maxAge: 9000000});
                        res.cookie('weapon', "Warhammer", {maxAge: 9000000});
                    } else {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 7) > 0) {
                                effects = "Lose 7 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 7, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 7 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = "Lose 10 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 10 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                }
            } else if (req.cookies.curRoom == "DRYAD") {
                if (req.query.a != undefined) {
                    option = "a";
                    effects = "Gain 10 HP.";
                    res.cookie('health', parseInt(req.cookies.health) + 10, {maxAge: 9000000});
                } else if (req.query.b != undefined) {
                    if (str >= 14) {
                        option = "a";
                        effects = "Gain 40 HP.";
                        res.cookie('health', parseInt(req.cookies.health) + 40, {maxAge: 9000000});
                    } else {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = "Lose 10 HP. Gain weapon: Stick.";
                                res.cookie('weapon', "Stick", {maxAge: 9000000});
                                res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                            } else {
                                effects = "Lose 10 HP and you die. Gain weapon: Stick.";
                                res.cookie('weapon', "Stick", {maxAge: 9000000});
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 15) > 0) {
                                effects = "Lose 15 HP. Gain weapon: Stick.";
                                res.cookie('weapon', "Stick", {maxAge: 9000000});
                                res.cookie('health', parseInt(req.cookies.health) - 15, {maxAge: 9000000});
                            } else {
                                effects = "Lose 15 HP and you die. Gain weapon: Stick.";
                                res.cookie('weapon', "Stick", {maxAge: 9000000});
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                } else if (req.query.c != undefined) {
                    if (req.cookies.magik == "Nature") {
                        option = "a";
                        effects = "Gain item: Frenzy Seed.";
                        res.cookie('item', "Frenzy Seed", {maxAge: 9000000});
                    } else if (req.cookies.magik == "Light" || req.cookies.magik == "Air" || req.cookies.magik == "Water") {
                        option = "b";
                        effects = "Gain 30 HP.";
                        res.cookie('health', parseInt(req.cookies.health) + 30, {maxAge: 9000000});
                    } else {
                        option = "c";
                        res.cookie('magik', "Nature", {maxAge: 9000000});
                        effects = "Gain magik: Nature";
                    }
                } else if (req.query.d != undefined) {
                    option = "a";
                }
            } else if (req.cookies.curRoom == "FEAST") {
                if (req.query.a != undefined) {
                    option = "a";
                    effects = "Gain 25 HP. Lose magik.";
                    res.cookie('magik', "None", {maxAge: 9000000});
                    res.cookie('health', parseInt(req.cookies.health) + 25, {maxAge: 9000000});
                } else if (req.query.b != undefined) {
                    option = "a";
                } else if (req.query.c != undefined) {
                    option = "a";
                    effects = "Gain 7 HP.";
                    res.cookie('health', parseInt(req.cookies.health) + 7, {maxAge: 9000000});
                } else if (req.query.d != undefined) {
                    option = "a";
                    getRandom("magik", function (mag) {
                        effects = "Gain magik: " + mag;
                        res.cookie('magik', mag, {maxAge: 9000000});
                    })
                }
            } else if (req.cookies.curRoom == "CHOOSEAROOM") {
                if (req.query.a != undefined) {
                    option = "a";
                    if (str >= 10 || req.cookies.magik == "Water") {
                        effects = "You defeat the lava monster and find some gold in its corpse. Gain 15 gold.";
                        res.cookie('gold', parseInt(req.cookies.gold) + 15, {maxAge: 9000000});
                    } else {
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 8) > 0) {
                                effects = "The lava monster leaves you a nasty burn. Lose 8 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 8, {maxAge: 9000000});
                            } else {
                                effects = "The lava monster leaves you a nasty burn. Lose 8 HP.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 10) > 0) {
                                effects = "The lava monster leaves you a nasty burn. Lose 10 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 10, {maxAge: 9000000});
                            } else {
                                effects = "The lava monster leaves you a nasty burn. Lose 10 HP.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                } else if (req.query.b != undefined) {
                    if (req.query.solution == "6" || req.query.solution == "six" || req.query.solution == "Six") {
                        option = "a";
                        effects = "Gain item: Chain mail.";
                        res.cookie('item', "Chain mail", {maxAge: 9000000});
                    } else {
                        option = "b";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 2) > 0) {
                                effects = "Lose 2 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 2, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 2 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 3) > 0) {
                                effects = "Lose 3 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 3, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 3 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    }
                } else if (req.query.c != undefined) {
                    option = "a";
                    nextRoom = "HOLE";
                } else if (req.query.d != undefined) {
                    option = "a";
                    effects = "Gain item: Smoke machine.";
                    res.cookie('item', "Smoke machine", {maxAge: 9000000});
                }
            } else if (req.cookies.curRoom == "LADDERS") {
                if (req.query.a != undefined) {
                    if (weight > 3) {
                        option = "a";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 4) > 0) {
                                effects = "Lose 4 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 4, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 4 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 5) > 0) {
                                effects = "Lose 5 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 5 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    } else {
                        option = "b";
                        effects = "Gain magik: Air";
                        res.cookie('magik', "Air", {maxAge: 9000000});
                    }
                } else if (req.query.b != undefined) {
                    if (weight > 2) {
                        option = "a";
                        if (req.cookies.item == "Chain mail") {
                            if ((parseInt(req.cookies.health) - 4) > 0) {
                                effects = "Lose 4 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 4, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 4 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        } else {
                            if ((parseInt(req.cookies.health) - 5) > 0) {
                                effects = "Lose 5 HP.";
                                res.cookie('health', parseInt(req.cookies.health) - 5, {maxAge: 9000000});
                            }
                            else {
                                effects = "Lose 5 HP and you die.";
                                res.cookie('health', 0, {maxAge: 9000000});
                                died = true;
                            }
                        }
                    } else {
                        option = "b";
                        effects = "Gain magik: Light";
                        res.cookie('magik', "Light", {maxAge: 9000000});
                    }
                } else if (req.query.c != undefined) {
                    option = "a";
                } else if (req.query.d != undefined) {
                    if (req.cookies.magik == "Air") {
                        option = "a";
                        effects = "Gain item: Fluffy Cloud.";
                        res.cookie('item', "Fluffy Cloud", {maxAge: 9000000});
                    } else if (req.cookies.magik == "Light") {
                        option = "b";
                        effects = "Gain item: Pure Orb.";
                        res.cookie('item', "Pure Orb", {maxAge: 9000000});
                    } else {
                        option = "c";
                        res.cookie('magik', "None", {maxAge: 9000000});
                        effects = "Lose magik.";
                    }
                }
            } else if (req.cookies.curRoom == "ROOM10") {
                room10 = true;
            }
            if (room10) {
                room10(str, weight, req.cookies, req.query, function (out) {
                    Connection.getRoom(req.cookies.curRoom, function (roomInfo) {
                        Connection.getOutcome(req.query.choice_id, option, function (outcome) {
                            res.render('pages/outcome', {
                                hero: req.cookies.hero,
                                health: req.cookies.health,
                                gold: req.cookies.gold,
                                weapon: req.cookies.weapon,
                                item: req.cookies.item,
                                magik: req.cookies.magik,
                                str: str,
                                weight: weight,
                                roomCounter: roomCounter,
                                curRoom: req.cookies.curRoom,
                                outcome: outcome,
                                image: roomInfo.image,
                                effects: effects
                            });
                        });
                    });
                });
            } else {
                Connection.getRoom(req.cookies.curRoom, function (roomInfo) {
                    Connection.getOutcome(req.query.choice_id, option, function (outcome) {
                        res.render('pages/outcome', {
                            hero: req.cookies.hero,
                            health: req.cookies.health,
                            gold: req.cookies.gold,
                            weapon: req.cookies.weapon,
                            item: req.cookies.item,
                            magik: req.cookies.magik,
                            str: str,
                            weight: weight,
                            roomCounter: roomCounter,
                            curRoom: req.cookies.curRoom,
                            outcome: outcome,
                            image: roomInfo.image,
                            effects: effects,
                            died: died,
                        });
                    });
                });
            }
        });
    });
});

app.get('/end', function (req, res) {
    Connection.addLoser(req.cookies.hero, req.cookies.health, req.cookies.gold, 0, 0, req.cookies.weapon, req.cookies.item, req.cookies.magik, function (loserInfo) {
        console.log("I'M HERE PEOPLE");
        res.render('pages/end');
    });
});

app.listen(5252);
console.log('5252 is the magik port');