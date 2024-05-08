const bcrypt=require("bcryptjs");
const User=require("../../../modals/user");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../../../config");



// login

const Login= async (req, res) => {
    let { email, password } = req.body;
    try {
      let checkUser = await User.findOne({ email: email });
      if (checkUser) {
        const checkPassowrd = await bcrypt.compareSync(
          password,
          checkUser.password
        );
        if (!checkPassowrd) {
          return res
            .status(404)
            .json({ status: 400, message: "Email or Password Incorrect" });
        }
        checkUser.password = undefined;
        // generete token
        const token = await jwt.sign(
          { id: checkUser._id },
          TOKEN_SECRET
        );
        console.log("token login", token);
        return res.status(200).json({
          status: 200,
          data: checkUser,
          token,
          message: "Login successfully",
        });
      } else {
        // if (!checkUser) {
        return res.status(404).json({ status: 404, message: "User not Found" });
        // }
      }
    } catch (err) {
      return res.status(400).json({ status: 400, message: err.message });
    }
  };

module.exports=Login;