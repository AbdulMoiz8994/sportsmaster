const mongoose = require("mongoose");
const schemaType = require("../../types");

const BlogSchema = new mongoose.Schema({
    title: {
        type: schemaType.TypeString
    },
    heading: {
        type: schemaType.TypeString

    },
    description: {
        type: schemaType.TypeArray
    },
    image: [
        {
            url: {
                type: schemaType.TypeString // Image URL
            },
            imgDescription: {
                type: schemaType.TypeString // Description
            }
        }
    ],
    createdAt: {

        type: Date,
        default: Date.now(),
    }
});

module.exports = BlogSchema;