const mongoose = require("mongoose");
const adminSchema = require("./admin-auth");

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
