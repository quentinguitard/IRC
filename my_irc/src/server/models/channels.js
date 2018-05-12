const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create channel Schema & Model
const ChannelSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    }
});

const Channel = mongoose.model("channel", ChannelSchema);

module.exports = Channel;
