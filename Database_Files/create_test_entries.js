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

function getRoomId(title, cb) {
    con.query("SELECT room_id FROM rooms WHERE title = '" + title + "'", function(err, result) {
        if(err) {
            throw err;
        } else {
            //console.log(result);
            var z = JSON.parse(JSON.stringify(result[0].room_id));
            cb(z);
        }
    });
}

//choices and outcomes for GNOME
getRoomId("GNOME", function(room) {
    con.query("INSERT INTO choices VALUE (NULL, 'Attempt to answer the riddle', "+room+")", function(err, result) {
        if(err) {
            throw err;
        } else {
            //choice1 = true;
            con.query("SELECT choice_id FROM choices WHERE choice = 'Attempt to answer the riddle'", function(err, choice) {
                if (err) {
                    throw err
                } else {
                    con.query("INSERT INTO outcomes VALUE('a','\\\"Correct!\\\" The gnome gives you 15 gold pieces. \\\"You may pass.\\\"'," + choice[0].choice_id + ")", function (err, result) {
                        if (err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b','The gnome laughs at you and you feel bad.', "+choice[0].choice_id+")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("gnome choice 1");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE (NULL, 'Ask him to let you go', "+room+")",function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Ask him to let you go'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a','\\\"I\\\'m a gnome, boy. We won’t do anything except in revenge.\\\" He lets you go with a wave of his hand.', "+choice[0].choice_id+")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("gnome choice 2");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE (NULL, 'Attempt to kill the gnome', "+room+")",function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice= 'Attempt to kill the gnome'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a','The Gnome drops to the ground, face twisted in despair. You watch him take out a picture of his family as he bleeds out on the floor.', "+choice[0].choice_id+")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b','\\\"Guess you don\\\'t like riddles, scum.\\\" He says with an angry laugh while stabbing your leg.', "+choice[0].choice_id+")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("gnome choice 3");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE (NULL, 'Say \\\"How about no.\\\" and flee ... um, continue on to the next room', "+room+")",function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice= 'Say \\\"How about no.\\\" and flee ... um, continue on to the next room'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'He laughs at you as you leave a cloud of gas behind.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'He watches you run away with amused eyes.', " + choice[0].choice_id+")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("gnome choice 4");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for DOG
getRoomId("DOG", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Throw your weapon to distract the dog.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Throw your weapon to distract the dog.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The dog runs after the stick and comes back, wagging his tail.', " + choice[0].choice_id +")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The dog eats your ~weapon~ then happily joins your side.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'The dog barks and attacks the now defenseless hero. You escape, but not without cost.', " + choice[0].choice_id + ")", function(err, result) {
                                        console.log("dog choice 1");
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Attack the dog.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Attack the dog.'", function(err, choice) {
                if(err) {
                    throw(err);
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You slaughter the dog and continue to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The dog bites your arm, but you make it to the next room anyway.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("dog choice 2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Try to run away.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Try to run away.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You evade the dog with ease thanks to your handy smoke machine!', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The dog easily outruns you and nips at your feet. You eventually escape, but not without cost.', " + choice[0].choice_id + ")", function (err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'The dog falls behind as you sprint ahead, and eventually loses interest. You proceed to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            console.log("dog choice 3");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Throw your item to distract the dog.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Throw your item to distract the dog.'", function(err, choice) {
                if(err) {
                    throw(err);
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The dog eats your ~item~ then happily joins your side.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'While the dog bounds after your ~item~, you escape to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("dog choice 4");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for HOLE
getRoomId("HOLE", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Attempt to jump over the hole.', " + room + ")", function(err, result) {
        if(err) {
            throw(err);
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Attempt to jump over the hole.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You are fat and aren\\\'t able to make it across. You fall into the hole and hurt your legs. There\\\'s a door, and the body of another hero. You find some gold in his pockets.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw(err);
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You make it across! You give yourself a pat on the back and restore 2 HP because you feel good.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw(err);
                                } else {
                                    console.log("hole choice 1");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Try to go around', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Try to go around'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You are heavy and not very coordinated You fall into the hole and hurt your legs. There\\\'s a door, and the body of another hero. You find some gold in his pockets.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You light and nimble and make it around safely! You give yourself a pat on the back and restore 2 HP because you feel good.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("hole choice 2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Use your weapon to attempt to cross.', " + room + ")", function(err, result) {
        if(err) {
            throw(err);
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Use your weapon to attempt to cross.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You walk across your ~weapon~, keeping careful balance. Continue to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw(err);
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You attempt to vault over the hole. Your weapon falls into the pit, but you continue to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("hole choice 3");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Use magik to attempt to cross', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Use magik to attempt to cross'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You make a bridge across the hole with your magik. You give yourself a pat on the back and restore 2 HP because you feel good.', " + choice[0].choice_id + ")", function(err) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'With the help of your magik, you easily float over the hole. You give yourself a pat on the back and restore 2 HP because you feel good.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'You strike the ground behind you with an explosion, then fly your way across.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            con.query("INSERT INTO outcomes VALUE('d', 'You Yoshi-Hop across the the hole, leaving your familiar to fall to its death. Rest in pieces.', " + choice[0].choice_id + ")", function(err, result) {
                                                if(err) {
                                                    throw err;
                                                } else {
                                                    con.query("INSERT INTO outcomes VALUE('e', 'Your magik triggers something in the room, and you slip down the hole and hurt your legs. There’s a door, and the body of another hero. You find some gold in his pockets.', " + choice[0].choice_id + ")", function(err, result) {
                                                        if(err) {
                                                            throw err;
                                                        } else {
                                                            console.log("hole choice 4");
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for CHEST
getRoomId("CHEST", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Open the chest.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Open the chest.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You discover some gold!', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You find an odd staff in the chest.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("chest choice 1");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Leave the room. It could be a trap.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Leave the room. It could be a trap.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You leave without any trouble.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("chest choice 2");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Smash the chest. It could be a mimic.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id  FROM choices WHERE choice = 'Smash the chest. It could be a mimic.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The chest breaks open when you strike it, revealing an item as well as some gold!', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You smash the chest to pieces. Inside is a broken item, and a bag of gold.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("chest choice 3");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You sense something along the side of the Chest.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You sense something along the side of the Chest.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'A hidden compartment!', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("chest choice 4");
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for POTIONS
getRoomId("POTIONS", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'You continue on to the next room. These potions seem very suspicious', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You continue on to the next room. These potions seem very suspicious'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'Nothing happens. You move onto the next room.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("potions choice 1");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You decide to drink the greenish potion from the first statue. ', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You decide to drink the greenish potion from the first statue. '", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'It tastes awful and you feel sick.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("potions choice 2");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You decide to drink the bluish potion from the second statue. ', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You decide to drink the bluish potion from the second statue. '", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You feel rejuvenated.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("potions choice 3");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You decide to drink the reddish potion from the third statue.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You decide to drink the reddish potion from the third statue.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You feel a burning sensation as you drink it, but when the last drop is downed, you feel a wave a knowledge overcome you. You now possess ~Random~ Magik.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("potions choice 4");
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for DARKWIZARD
getRoomId("DARKWIZARD", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'You try to bribe him. You offer him ~ golds pieces.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You try to bribe him. You offer him ~ golds pieces.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The wizard accepts your offer with a nasty smile. You continue on to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The wizard is disgusted by your measly offering. You are unprepared and he and launches a magikal attack on you.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("darkwizard option 1");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You try to fight him.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You try to fight him.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You try to attack the wizard with your weapon, but it does not harm him.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You wound the wizard but do not kill him. He is scared off and you continue to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'You kill the wizard and pick up his staff. His magik transfers itself to you.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            con.query("INSERT INTO outcomes VALUE('d', '\\\"Ah, I see you are another master of the Dark Arts, my mistake. You are clearly worth of holding one of these.\\\"', " + choice[0].choice_id + ")", function(err, result) {
                                                if(err) {
                                                    throw err;
                                                } else {
                                                    console.log("darkwizard choice 2");
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You try to run away.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You try to run away.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You have your back turned as you attempt to flee and are not fast enough to escape his spells.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You sprint out of the room before the wizard has a chance to attack you. Nothing happens.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("darkwizard choice 3");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You beg the Dark Wizard for mercy.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You beg the Dark Wizard for mercy.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The wizard isn\\\'t impressed, but decides to use a less harmful spell on you.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("darkwizard choice 4");
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for SEASHELL
getRoomId("SEASHELL", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Attempt to push it aside.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Attempt to push it aside.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'Not much heavier than the gear you normally carry, you heave the shell out of the way with ease.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'Moving the shell is a challenge, and you cut your hands on the sharp edges, but you eventually succeed.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("seashell choice 1");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Attempt to smash the shell.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Attempt to smash the shell.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The shell smashes, and a piece of paper falls from the sky reading \\\'SEGV \\\"segmentation fault\\\"\\\'. You feel shame.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The shell rings loudly, reverberating through the room. You feel lighter, and curiously watch the shell slide to the side.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("seashell option 2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Use magik on the shell.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Use magik on the shell.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You feel the shell probing your source of magik, before grabbing hold and twisting.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You feel something akin to a smile from the shell, and watch as it moves to the side before spitting out a small, hand-sized seashell.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("seashell choice 3");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Say the secret phrase', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Say the secret phrase'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The shell screams out in pain, shattering into a thousand pieces.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The shell spits a fish at you, before moving aside.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("seashell choice 4");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for CAMPFIRE
getRoomId("CAMPFIRE", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Ignore the fire and continue to the next room.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Ignore the fire and continue to the next room.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'As you exit the room, behind you you here the fire go out with a hiss.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("campfire choice 1");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Offer your weapon to the flames', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Offer your weapon to the flames'", function(err,choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The fire seems to be crooning happily at you. Spitting a heatless spark at your chest, you feel… enlightened.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err){
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The fire almost seems to eat your weapon, morphing the mass into something that seems to only be a handle. The fire seems stronger from the transformation, and it finishes the process by tossing the handle into your hands.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("campfire choice 2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Use magik on the campfire.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Use magik on the campfire.'", function(err,choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The campfire gains some strength, and with a pulse of heat, offers you power. Option to take fire magik.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err){
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The campfire hisses at your feet, drenched into nothing but wet ashes. Nothing happens.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'The campfire ignites with a massive rush of heat, turning into a twirling pillar of sparks. Holding out a hand of flame, the new, greater figure drops something into your hands.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            con.query("INSERT INTO outcomes VALUE('d', 'The campfire doesn\\\'t respond to your magik.', " + choice[0].choice_id + ")", function(err, result) {
                                                if(err) {
                                                    throw err;
                                                } else {
                                                    console.log("campfire choice 3");
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Relax by the fire to gain some strength back.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Relax by the fire to gain some strength back.'", function(err,choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You share warmth with the campfire until it goes out a few minutes later. You are grateful for its sacrifice. Heal 12 HP.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err){
                            throw err;
                        } else {
                            console.log("campfire choice 4");
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for HELICOPTER
getRoomId("HELICOPTER", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Use your weapon', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Use your weapon'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'Your weapon is durable and tough. You throw it into the engine intakes and it causes the whole vehicle to explode… How did you not get hit with flying debris? It doesn\\\'t make any sense, and I\\\'m just the narrator. You make it to the next room but your weapon is mangled and no longer usable.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'Your weapon is extremely slippery and it slips out of your hand as you try to use it. It flies into the helicopter\\\'s engine air intake and makes all of the innards of the helicopter just as slippery. With all of its internals now loose, the helicopter shakes itself apart from the vibrations of its massive rotors and you can safely walk around it\\\'s metallic husk. As it turns out, your weapon was slippery enough to avoid being damaged by the engines of the helicopter. You pick it up and move on.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'Your throw you weapon into the air intake of the helicopter\\\'s engine, but it does little to aid you. The helicopters powerful engines chew up your weapon and spit out a battered and unusable version of it from it’s exhaust pipe. You make a break for it, but not without avoiding a run-in with the helicopter. Perhaps you should have tried bringing a more durable weapon.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            console.log("helicopter choice 1");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Attempt to evade it', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Attempt to evade it'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'Your gear is light and you thus you are quick on your feet. You make a break for the door on the other side of the room easily avoiding the helicopter\\\'s rotors as they attempt to decapitate you.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You attempt to run for it but your gear is heavy. You cannot outrun the machine. Though you manage to just barely avoid the massive rotors, they manage cut some of your glorious, heroic hair. You are now depressed and must spend a large amount of money getting your hairstyle fixed. At least you didn\\\'t lose your head!', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("helicopter choice 2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Use your magik', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Use your magik'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You call upon your mighty explosion magik to blow the machine to bits. Among the rubble you find an Atom Bomb.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You conjure a torrent of water and send it straight towards the approaching machine. The water gets into every opening that it can find, shorting out the electronics and waterlogging the engines. It comes crashing to the ground as it\\\'s engines refuse to produce power. You move to the next room unharmed.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'You send your familiar to try and stop the advancing machine, but it can do little to slow it down. In the end, your familiar got caught up in the rotors. You narrowly escape the helicopter on you own but not unharmed.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            con.query("INSERT INTO outcomes VALUE('d', 'You muster all the magik you can, but it does little good. The machine is only slowed down. You manage to get around it, but not untouched. -5 health.', " + choice[0].choice_id + ")", function(err, result) {
                                                if(err) {
                                                    throw err;
                                                } else {
                                                    console.log("helicopter choice 3");
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Hijack it!', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Hijack it!'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You manage to easily slip into the pilot seat and are alarmed to find that there is nobody on board. As you touch the controls you feel an inviting presence responding to you. The helicopter gently touches down and powers off. You exit the aircraft to find that it has detached one of it\\\'s rotor blades for you.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You manage to easily slip into the pilot seat and are alarmed to find that there is nobody on board. You are worried but reluctantly go for the controls. You realize your mistake as soon as you touch them, and you feel your power being pulled out of you with you being paralyzed in the process. The machine ejects you onto the exit side of the room.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("helicopter choice 4");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for SALESMAN
getRoomId("SALESMAN", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Agree to the sale.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Agree to the sale.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You look at your shiny new weapon and feel a little bit sad about the gold you just gave up.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The salesman scoffs and tells you to leave his sight.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("salesman choice 1");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Refuse the sale and continue on to the next room.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Refuse the sale and continue on to the next room.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The salesman is insulted and throws a rock at you.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("salesman choice 2");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Try to steal the weapon from the salesman', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Try to steal the weapon from the salesman'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You kill the salesman and gain the weapon for free!', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You wound the salesman but are also wounded in the process. You lose 8 HP and decide to cut your losses, continuing to the next room', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("salesman choice 3");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Try to trick the salesman by paying him less. You offer him ____ gold.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Try to trick the salesman by paying him less. You offer him ____ gold.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The salesman was never too bright of a fellow, and the amount is close enough that he doesn\\\'t notice.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The salesman realizes the you are trying to trick him. He gets very upset and stabs you as your guard is down.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("salesman choice 4");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for DRYAD
getRoomId("DRYAD", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Take one of the fruit.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Take one of the fruit.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'She smiles timidly at you after handing you an apple, then goes back to taking in what little light she can get from the hole to the surface.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("dryad choice 1");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Take all of the Dryad\\\'s fruit', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Take all of the Dryad\\\'s fruit'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The Dryad cries out in pain as you rip all of the fruit from her body. Face overtaken by rage and terror, she points at the fruit you\\\'ve taken, rasping in an unknown language. You watch dispassionately as her body dries up in seconds, withering away into rot.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'In a rush of green you don’t see coming, branches and roots strike towards you, driving you out of the room.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("dryad choice 2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Use magik on the Dryad.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Use magik on the Dryad.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The Dryad gasps in wonder as power flows into her, leaves and vines and flowers bursting from her skin. With her newly granted power, she shoots an arm up into the hole in the ceiling, forcing it wider open. With a massively grateful smile, she hands you an odd seed pulsing with wild energy that had grown near her head.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'Taking in your magik, the Dryad smiles gratefully at you. With a little more power than she\\\'s used to, she grows an extra banana and hands it to you alongside two oranges.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'Wrinkling her nose as you try to pull out your magik, the Dryad spits a seed at your face before you can do anything. The seed… it crawls into your nose. Oh gods, it\\\'s inside you! You scream in misery on the ground, feeling the twitching in your head as it rips apart your magik, replacing it.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            console.log("dryad choice 3");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Decline the Dryad’s offer.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Decline the Dryad’s offer.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The Dryad pouts at your response, but lets you go without trouble.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("dryad choice 4");
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for FEAST
getRoomId("FEAST", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Eat as much food as you can.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Eat as much food as you can.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You eat the food and it restores 15 HP, but you become very drowsy and fall asleep. When you wake up, you realize that you have forgotten all magik that you know.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("feast choice 1");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Continue on to the next room.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Continue on to the next room.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'Nothing happens. You move to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("feast choice 2");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You decide you\\\'re not that hungry, so you only pick up sandwich and put it into your pack.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You decide you\\\'re not that hungry, so you only pick up sandwich and put it into your pack.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You decide you\\\'re not that hungry, so you only pick up sandwich and head out the door. Heal 7 HP', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("feast choice 3");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You don\\\'t eat the food but search the room for anything else useful', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You don\\\'t eat the food but search the room for anything else useful'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You find a scroll which teaches ~random~ magic.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("feast choice 4");
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for CHOOSEAROOM
getRoomId("CHOOSEAROOM", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'The first door.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'The first door.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You encounter a lava monster!', " + choice[0].choice_id + ")", function(err) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("choosearoom choice 1");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'The second door. You try to answer the riddle on the door.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'The second door. You try to answer the riddle on the door.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'The door swings open and you see an armor rack.', " + choice[0].choice_id + ")", function(err) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'A hand sticks out of the door and slaps you in the face.', " + choice[0].choice_id + ")", function(err) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("choosearoom choice 2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'The third door.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'The third door.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You somehow stumble into the next room.', " + choice[0].choice_id + ")", function(err) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("choosearoom choice 3");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'The fourth door.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'The fourth door.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You discover that the hissing is coming from a smoke machine.', " + choice[0].choice_id + ")", function(err) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("choosearoom choice 4");
                        }
                    });
                }
            });
        }
    });
});

//choices and outcomes for LADDER
getRoomId("LADDERS", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'Climb the first ladder.', " + room + ")", function(err, result){
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Climb the first ladder.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You are too heavy and fall off the ladder.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You climb to the top of the ladder and find strange, unrecognizable item on a pedestal. When you touch it, you feel something inside you start to swirl.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("ladder choice 1");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Climb the second ladder.', " + room + ")", function(err, result){
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Climb the second ladder.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You are too heavy and fall off the ladder.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'You climb to the top of the ladder and find a strange, unrecognizable item on a pedestal. When you touch it, you feel something inside you start to shine.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    console.log("ladder choice 2");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'You decide that both of the ladders look too dangerous.', " + room + ")", function(err, result){
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'You decide that both of the ladders look too dangerous.'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'Nothing happens. You continue to the next room.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("ladder choice 3");
                        }
                    });
                }
            });
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'Try to use magik to get to the platform', " + room + ")", function(err, result){
        if(err) {
            throw err;
        } else {
            con.query("SELECT choice_id FROM choices WHERE choice = 'Try to use magik to get to the platform'", function(err, choice) {
                if(err) {
                    throw err;
                } else {
                    con.query("INSERT INTO outcomes VALUE('a', 'You fly up to the first ladder and feel yourself pass through some kind of barrier. With newfound understanding of Air, you easily notice an item floating above a pedestal.', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'Activating your light magik caused a reaction on the platform above the second ladder, and within seconds you\\\'re dragged up it through some kind of invisible barrier. On a pedestal in the center of the platform, your newfound understanding of light shows you what lies upon it.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'You realize that your magik is kinda worthless at getting to high places. Feeling just as much of a moron as you, your magik leaves your body.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            console.log("ladder choice 4");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

getRoomId("ROOM10", function(room) {
    con.query("INSERT INTO choices VALUE(NULL, 'A battle of strength.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            console.log("room10 choice 1");
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'A battle of prosperity.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            console.log("room10 choice 2");
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'A battle for another day', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            console.log("room10 choice 3");
        }
    });
    con.query("INSERT INTO choices VALUE(NULL, 'A battle of secrets.', " + room + ")", function(err, result) {
        if(err) {
            throw err;
        } else {
            console.log("room10 choice 4");
        }
    });
});

//dummy users
function addUser(username, health, money, weapon, item, magik, strength, weight, score, numrooms, winner) {
    con.query("SELECT weapon_id FROM weapons WHERE name = '" + weapon + "'", function(err, curweapon) {
        if(err) {
            throw err;
        } else {
            con.query("SELECT magik_id FROM magiks WHERE name = '" + magik + "'", function(err, curmagik) {
                if(err) {
                    throw err;
                } else {
                    con.query("SELECT item_id FROM items WHERE name = '" + item + "'", function(err, curitem) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO users VALUE(NULL, '" + username + "', " + health + ", " + money + ", " + strength + ", " + weight + ", " + score + ", " + numrooms + ", "+winner+", " + curweapon[0].weapon_id + ", " + curitem[0].item_id + ", " + curmagik[0].magik_id + ")", function (err, result) {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log("Added user " + username);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

//addUser("name", health, gold, "weapon", "item", "magik", strength, weight, score, numrooms, winner);
//addUser("Clementine", 0, 0, "Warhammer", "None", "Air", 33, 3, 146, 10, 0);
//addUser("Trollface", 0, 160, "Fists", "Dog tooth", "None", 15, 2, 217,  28, 0);
//addUser("RockGoblin", 0, 45, "Stick", "Shell", "Water", 28, 3, 24, 10, 0);
//addUser("Snoop Dog", 0, 155, "Fists", "Smoke machine", "Explosion", 18, 3, 131, 14, 0);
addUser("???", 50, 150, "Sword", "None", "Dark", 20, 2, 95, 30, 1);