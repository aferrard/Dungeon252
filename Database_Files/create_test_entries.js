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

function getRoomId(event, cb) {
    con.query("SELECT room_id FROM rooms WHERE event = '" + event + "'", function(err, result) {
        if(err) {
            throw err;
        } else {
            var z = JSON.parse(JSON.stringify(result));
            cb(z);
        }
    });
}

//options for dog room
getRoomId("You meet a dog (7 HP). The dog barks loudly at you, and looks like he is going to attack.", function(result) {
    var option1 = false;
    var option2 = false;
    var option3 = false;
    var option4 = false;
    con.query("INSERT INTO options VALUE (NULL, 'Attempt to answer the riddle', "+result+")", function(err, result) {
        if(err) {
            throw err;
        } else {
            //option1 = true;
            con.query("INSERT INTO outcomes VALUE("",)");
        }
    });
    con.query("INSERT INTO options VALUE (NULL, 'Ask him to let you go', "+result+")",function(err, result) {
        if(err) {
            throw err;
        } else {
            option2 = true;
        }
    });
    con.query("INSERT INTO options VALUE (NULL, 'Attempt to kill the gnome', "+result+")",function(err, result) {
        if(err) {
            throw err;
        } else {
            option3 = true;
        }
    });
    con.query("INSERT INTO options VALUE (NULL, 'Say \“How about no.\” and flee ... um, continue on to the next room', "+result+")",function(err, result) {
        if(err) {
            throw err;
        } else {
            option4 = true;
        }
    });
    while(!option1 || !option2 || !option3 || !option4) {
        //do nothing
    }
    con.query
});