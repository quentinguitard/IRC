const express = require("express");
const router = express.Router();

// Create new channels to DB
router.post("/channels", function(req, res) {
    console.log(req.body);
    res.send({
        type: "POST",
        name: req.body.name
    });
});
// Read list of channels from DB
router.get("/channels", function(req, res) {
    res.send({ type: "GET" });
});
// Update channel from DB
router.put("/channels/:id", function(req, res) {
    res.send({ type: "PUT" });
});
// Delete channel from DB
router.delete("/channels/:id", function(req, res) {
    res.send({ type: "DELETE" });
});

// Create new user to DB
router.post("/users", function(req, res) {
    res.send({ type: "POST" });
});
// Read list of Users from DB
router.get("/users", function(req, res) {
    res.send({ type: "GET" });
});
// Update User from DB
router.put("/users/:id", function(req, res) {
    res.send({ type: "PUT" });
});
// Delete User from DB
router.delete("/users/:id", function(req, res) {
    res.send({ type: "DELETE" });
});

module.exports = router;
