const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");

// our localhost port
const port = 4000;

const app = express();

app.use(bodyParser.json());
app.use("/api", require("./routes/api"));

const server = http.createServer(app);

const io = socketIO(server);

app.use("/", express.static("public"));
io.on("connection", socket => {
    console.log("User connected", "socket ID :" + socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
