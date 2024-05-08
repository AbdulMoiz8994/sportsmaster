const mongoose = require("mongoose");
const schemaType = require("../../types");

const adminSchema = new mongoose.Schema({
  fullName: {
    type: schemaType.TypeString,
  },
  email: {
    type: schemaType.TypeString,
    unique: true,
  },
  password: {
    type: schemaType.TypeString,
  },
  status:{
      type: schemaType.TypeString,
      enum:["admin"],
      default: "admin"
  },
  createdAt:{
      type: Date,
      default: Date.now(),
  }
},

);
module.exports = adminSchema;
