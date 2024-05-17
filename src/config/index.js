require("dotenv").config();


module.exports={
    MONGODB_URL: process.env.MONGODB_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    PAYMENT_MODE: process.env.PAYMENT_MODE,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}




