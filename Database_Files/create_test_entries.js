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