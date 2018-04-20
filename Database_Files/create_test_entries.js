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

//choices for gnome room
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

//choices for dog
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