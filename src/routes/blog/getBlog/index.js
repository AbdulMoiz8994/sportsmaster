const blog = require("../../../modals/blog");


// all blog post
const getBlog=async(req, res)=>{
   try{
    
    let getAllBlogs=await blog.find();

     return res.status(200).json({
      data: getAllBlogs,
      status: 200,
      length: getAllBlogs.length
     })

   }catch(err){
    return res.status(405).json({ status: 405, message: err.message });
   }
}
module.exports=getBlog;