const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin=require("../../../modals/admin/index");
const { TOKEN_SECRET } = require("../../../config");

// admin sign up

const AdminSignup=  async(req, res) =>{
    let { email, password } = req.body;
    console.log("body", req.body);
    try {
      let checkEmail = await Admin.findOne({ email: email });
      if (checkEmail) {
        return res
          .status(404)
          .json({ status: 404, message: "User Already Exist" });
      }
      let finalResp = {
        ...req.body,
        password: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
      };
  
      let finalUser = await new Admin(finalResp);
      await finalUser.save();
      const token = await jwt.sign(
        { id: finalUser._id },
        TOKEN_SECRET
      );
      console.log("token",token);
      res.status(201).json({
        status: 201,
        finalResp,
        token,
        message: "Account has been created successfully",
      });
    } catch (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
};

module.exports=AdminSignup;