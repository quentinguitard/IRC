const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// our localhost port
const port = 4000;

const app = express();

//Connect to mongodb
mongoose.connect("mongodb://localhost/myirc");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
// Routes
app.use("/api", require("./routes/api"));
// ERROR handling on DB
app.use(function(err, req, res, next) {
    //console.log(err);
    res.status(422).send({
        error: err.message
    });
});

const server = http.createServer(app);

const io = socketIO(server);

app.use("/", express.static("public"));
io.on("connection", function(socket) {
    console.log("User connected", "socket ID :" + socket.id);
    socket.join("general");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("subscribe", function(room) {
        console.log(room);
        socket.leave("general");
        socket.join(room, function() {
            console.log(socket.rooms);
        });
    });

    socket.on("unsubscribe", function(room) {
        socket.leave(room);
        socket.join("general");
        console.log(socket.rooms, "unsub");
    });

    socket.on("message", function(msg, name, room) {
        let arg = msg.split(" ");

        console.log(socket.rooms);
        console.log("message: " + msg + " " + name + " room " + room);
        io.to(room).emit("message", msg, name);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
