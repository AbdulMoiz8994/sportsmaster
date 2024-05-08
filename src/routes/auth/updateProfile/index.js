const User=require("../../../modals/user");

const updateProfile= async (req, res) => {
    //  console.log("req",req);
    try {
      console.log("req", req.body);
      let userId = await User.findOne({ _id: req.userId });
      console.log("userIduserId", userId, req.userId);
      if (!userId) {
        return res.status(404).json({ status: 404, message: "User not Found" });
      }
  
      const updatedProfile = await User.findOneAndUpdate(
        { _id: req.userId }, // Filter criteria to find the user by ID
        { 
            $set: req.body,
        },
        { new: true } // Return the modified document after update
      );
      updatedProfile.password = undefined;
      res.status(200).json({
        status: 200,
        data: updatedProfile,
        message: "Successfully updated",
      });
    } catch (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
  };

  module.exports=updateProfile;