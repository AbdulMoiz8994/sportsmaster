const{ MONGODB_URL }= require("../index");

const mongoose=require("mongoose");

let DB_STRING=MONGODB_URL

exports.connectDb=async() =>{
   try{
      let connection=await mongoose.connect(DB_STRING); 

   console.log(`Connect MOnGODB ${connection.connections[0].host}`);
   }catch(err){
    console.error("Databse Connection Error Message",err);
    process.exit(1);
   }
}