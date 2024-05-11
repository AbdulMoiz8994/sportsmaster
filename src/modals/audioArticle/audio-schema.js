const mongoose = require("mongoose");
const schemaType = require("../../types");

const audioSchema = new mongoose.Schema({
  name: {
    type: schemaType.TypeString,
  },
  description: {
    type: schemaType.TypeString,
  },
  audio: [
    {
      url: {
        type: schemaType.TypeString,
        required: true,
      },
      id: {
        type: schemaType.TypeString,
        required: true,
      },
    },
  ],
  image: [
    {
      url: {
        type: schemaType.TypeString,
        required: true,
      },
      id: {
        type: schemaType.TypeString,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = audioSchema;
