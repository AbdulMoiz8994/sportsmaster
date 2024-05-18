const bcrypt=require("bcryptjs");
const User=require("../../../modals/user");
const { insertDocument } = require("../../../helpers");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../../../config");



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
    const token = await jwt.sign({ id: finalUser._id }, TOKEN_SECRET);
    console.log("token Sign up", token);
      finalUser.password = undefined;


      res.status(201).json({
        status: 201,
        finalUser,
        token: token,
        message: "Account has been created successfully",
      });
    } catch (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
};
  
module.exports=signUpUser;