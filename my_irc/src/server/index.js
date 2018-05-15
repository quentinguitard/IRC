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
io.on("connection", socket => {
    console.log("User connected", "socket ID :" + socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("message", function(msg, name) {
        let arg = msg.split(" ");

        if (arg[0] == "/join") {
            console.log("im in /join " + arg[1]);
            socket.join(arg[1]);
            io.to(arg[1]).emit("message", msg, name);
        } else {
            console.log("message: " + msg + " " + name);
            io.emit("message", msg, name);
        }
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
