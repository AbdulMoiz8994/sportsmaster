const mongoose = require("mongoose");
const schemaType = require("../../types");

const magazineSchema = new mongoose.Schema({
  name: {
    type: schemaType.TypeString,
  },
  url: {
    type: schemaType.TypeString,
  },
  id: {
    type: schemaType.TypeString,
  },
  images: [
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
});
module.exports = magazineSchema;
