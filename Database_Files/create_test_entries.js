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
                            con.query("INSERT INTO outcomes VALUE('b','The gnome laughs at you and you feel bad. Lose 2 HP.', "+choice[0].choice_id+")", function(err, result) {
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
                    con.query("INSERT INTO outcomes VALUE('a','The Gnome drops to the ground, face twisted in despair. You watch him take out a picture of his family as he bleeds out on the floor. Gain 55 gold pieces. Lose 2 HP.', "+choice[0].choice_id+")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b','\\\"Guess you don\\\'t like riddles, scum.\\\" He says with an angry laugh while stabbing your leg. Lose 15 health.', "+choice[0].choice_id+")", function(err, result) {
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
                    con.query("INSERT INTO outcomes VALUE('a', 'The dog runs after the stick and comes back, wagging his tail. Lose your weapon. Gain magik: Familiar.', " + choice[0].choice_id +")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'The dog eats your ~weapon~ then happily joins your side. Lose your weapon. Gain magik: Familiar.', " + choice[0].choice_id + ")", function(err, result) {
                                if(err) {
                                    throw err;
                                } else {
                                    con.query("INSERT INTO outcomes VALUE('c', 'The dog barks and attacks the now defenseless hero. You escape, but not without cost. Lose your weapon. Gain item: Dog tooth. Lose 7 HP', " + choice[0].choice_id + ")", function(err, result) {
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
                            con.query("INSERT INTO outcomes VALUE('b', 'The dog bites your arm, but you make it to the next room anyway. Gain item: Dog tooth. Lose 7 HP', " + choice[0].choice_id + ")", function(err, result) {
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
                            con.query("INSERT INTO outcomes VALUE('b', 'The dog easily outruns you and nips at your feet. You eventually escape, but not without cost. Lose 4 HP.', " + choice[0].choice_id + ")", function (err, result) {
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
                    con.query("INSERT INTO outcomes VALUE('a', 'The dog eats your ~item~ then happily joins your side. Lose your item. Gain magik: Familiar', " + choice[0].choice_id + ")", function(err, result) {
                        if(err) {
                            throw err;
                        } else {
                            con.query("INSERT INTO outcomes VALUE('b', 'While the dog bounds after your ~item~, you escape to the next room. Lose your item.', " + choice[0].choice_id + ")", function(err, result) {
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
                    con.query("INSERT INTO outcomes VALUE('a', 'You are fat and aren\\\'t able to make it across. You fall into the hole and lose 15 HP. There\\\'s a door, and the body of another hero. Gain 10 gold.', " + choice[0].choice_id + ")", function(err, result) {
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
                    con.query("INSERT INTO outcomes VALUE('a', 'You are heavy and not very coordinated You fall into the hole and lose 15 HP. There\\\'s a door, and the body of another hero. Gain 10 gold.', " + choice[0].choice_id + ")", function(err, result) {
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
                            con.query("INSERT INTO outcomes VALUE('b', 'You attempt to vault over the hole. Lose your weapon. Continue to the next room.', " + choice[0].choice_id + ")", function(err, result) {
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
                                    con.query("INSERT INTO outcomes VALUE('c', 'You strike the ground behind you with an explosion, then fly your way across. Lose 2HP.', " + choice[0].choice_id + ")", function(err, result) {
                                        if(err) {
                                            throw err;
                                        } else {
                                            con.query("INSERT INTO outcomes VALUE('d', 'You Yoshi-Hop across the the hole, leaving your familiar to fall to its death. Rest in pieces. Lose Magik.', " + choice[0].choice_id + ")", function(err, result) {
                                                if(err) {
                                                    throw err;
                                                } else {
                                                    con.query("INSERT INTO outcomes VALUE('e', 'Your magik triggers something in the room, and you slip down the hole. Lose 15 HP. There’s a door, and the body of another hero. Gain 10 gold.', " + choice[0].choice_id + ")", function(err, result) {
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