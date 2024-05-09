const mongoose = require("mongoose");
const audioSchema = require("./audio-schema");

const audio = mongoose.model("audio", audioSchema);

module.exports = audio;