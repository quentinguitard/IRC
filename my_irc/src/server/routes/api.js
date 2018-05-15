const express = require("express");
const router = express.Router();
const Channel = require("../models/channels");

// Create new channels to DB
router.post("/channels", function(req, res, next) {
    Channel.create(req.body)
        .then(function(channel) {
            res.send(channel);
        })
        .catch(next);
});
// Read list of channels from DB
router.get("/channels", function(req, res, next) {
    Channel.find({}).then(function(channel) {
        res.send(channels);
    });
});
// Update channel from DB
router.put("/channels/:id", function(req, res, next) {
    res.send({ type: "PUT" });
});
// Delete channel from DB
router.delete("/channels/:id", function(req, res, next) {
    Channel.findByIdAndRemove({ _id: req.params.id }).then(function(channel) {
        res.send(channel);
    });
});

// Create new user to DB
router.post("/users", function(req, res, next) {
    res.send({ type: "POST" });
});
// Read list of Users from DB
router.get("/users", function(req, res, next) {
    res.send({ type: "GET" });
});
// Update User from DB
router.put("/users/:id", function(req, res, next) {
    res.send({ type: "PUT" });
});
// Delete User from DB
router.delete("/users/:id", function(req, res, next) {
    res.send({ type: "DELETE" });
});

module.exports = router;
