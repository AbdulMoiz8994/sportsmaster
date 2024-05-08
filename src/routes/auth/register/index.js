const bcrypt=require("bcryptjs");
const User=require("../../../modals/user");
const { insertDocument } = require("../../../helpers");

const signUpUser= async (req, res) => {
    let { email, password } = req.body;
    console.log("body", req.body);
    try {
      let checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        return res
          .status(404)
          .json({ status: 404, message: "User Already Exist" });
      }
      let finalResp = {
        ...req.body,
        password: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
      };
  
      let finalUser =await insertDocument("user",finalResp) 
    console.log("finalUser", finalUser);
      finalUser.password = undefined;
      res.status(201).json({
        status: 201,
        finalUser,
        message: "Account has been created successfully",
      });
    } catch (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
};
  
module.exports=signUpUser;