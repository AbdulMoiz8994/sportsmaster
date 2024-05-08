const mongoose = require("mongoose");
const schemaType = require("../../types");

const userSchema = new mongoose.Schema({
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
    phoneNumber: {
        type: schemaType.TypeNumber,
    },
    dateofBirth: {
        type: schemaType.TypeString,
    },
    address: {
        type: schemaType.TypeString

    },
    city: { type: schemaType.TypeString },
    state: { type: schemaType.TypeString },
    zipCode: { type: schemaType.TypeString },
    review: {
        type: schemaType.TypeString,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports=userSchema;