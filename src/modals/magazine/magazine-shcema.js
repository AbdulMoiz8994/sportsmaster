const mongoose=require("mongoose");
const schemaType = require("../../types");


const magazineSchema=new mongoose.Schema({
   name:{
    type: schemaType.TypeString,
},
url:{
    type: schemaType.TypeString
}

});
module.exports=magazineSchema;