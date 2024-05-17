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
        type: schemaType.TypeString
    },
    image: [
        {
            url: {
                type: schemaType.TypeString // Image URL
            },
            imgDescription: {
                type: schemaType.TypeString // Description
            },
            imgTitle:{
                type: schemaType.TypeString
            }
        }
    ],
    createdAt: {

        type: Date,
        default: Date.now(),
    }
});

module.exports = BlogSchema;