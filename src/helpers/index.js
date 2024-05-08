const Models=require("../modals");


const insertDocument= async(modelDd, storeData) => {
   let data=new Models[modelDd](storeData);
   return await data.save();
};


module.exports={
    insertDocument
};