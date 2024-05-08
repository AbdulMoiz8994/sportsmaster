const magazine = require("../../../modals/magazine");


// all blog post
const getMagazine=async(req, res)=>{
   try{
    
    let getAllMagazine=await magazine.find();

     return res.status(200).json({
      data: getAllMagazine,
      status: 200,
      length: getAllMagazine.length
     })

   }catch(err){
    return res.status(405).json({ status: 405, message: err.message });
   }
}
module.exports=getMagazine;