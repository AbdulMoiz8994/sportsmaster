const mongoose = require("mongoose");
const schemaType = require("../../types");

const audioSchema = new mongoose.Schema({
  name: {
    type: schemaType.TypeString,
  },
  description: {
    type: schemaType.TypeString,
  },
  audio: {
    type: schemaType.TypeString,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = audioSchema;
