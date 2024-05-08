const { TOKEN_SECRET } = require("../../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin=require("../../../modals/admin/index");

const adminLogin= async (req, res) =>{
    let { email, password } = req.body;
    try {
      let checkAdmin = await Admin.findOne({ email: email });
          console.log("checkAdmin",checkAdmin);
      if (!checkAdmin) {
        return res
          .status(404)
          .json({ status: 404, message: "Admin with this email does not exist" });
      }
      if (checkAdmin) {
        const checkPassowrd = await bcrypt.compareSync(
          password,
          checkAdmin.password
        );
        if (!checkPassowrd) {
          return res
            .status(404)
            .json({ status: 400, message: "Email or Password Incorrect" });
        }
        checkAdmin.password = undefined;
        // generete token
        const token = await jwt.sign(
          { id: checkAdmin._id },
          TOKEN_SECRET
        );
        console.log("token login", token);
        return res.status(200).json({
          status: 200,
          data: checkAdmin,
          token,
          message: "Login successfully",
        });
      }
    } catch (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
};

module.exports=adminLogin;

