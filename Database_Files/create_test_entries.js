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
    con.query("INSERT INTO options VALUE ()");
});