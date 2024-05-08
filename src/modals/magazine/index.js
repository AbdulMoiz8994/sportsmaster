const mongoose = require("mongoose");
const magazineSchema = require("./magazine-shcema");

const magazine = mongoose.model("magazine", magazineSchema);

module.exports = magazine;