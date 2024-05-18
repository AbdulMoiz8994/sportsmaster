const blog = require("../../../modals/blog");
const User = require("../../../modals/user");


// all blog post
const updateBlog=async(req, res)=>{
    try {
          
        const userId=req.userId;
        let checkUser = await User.findOne({ _id: userId });

        if(!checkUser){
            return res.status(404).json({ status: 404, message: "User not Found" });
        }

        //   console.log("blogId",blogId);
        // Find the blog by ID and increment the visit count
        const updatedUserCount = await User.findByIdAndUpdate(
            userId ,
          { $inc: { visitCount: 1 } }, // Increment visitCount by 1
          { new: true } // Return the updated document
        );
       console.log("updatedUserCount",updatedUserCount);

    
        return res.status(200).json({ status: 200, message: 'Visit count updated',updatedUserCount: updatedUserCount });
      } catch (err) {
        return res.status(405).json({ status: 405, message: err.message });
      }
}
module.exports=updateBlog;