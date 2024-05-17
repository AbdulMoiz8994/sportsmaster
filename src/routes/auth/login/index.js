const bcrypt = require("bcryptjs");
const User = require("../../../modals/user");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../../../config");
const calculateTimeRemaining = require("../../../helpers/calculateTIme");

// login

const Login = async (req, res) => {
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

      // const result = calculateTimeRemaining(checkUser?.verificationDate);
      // console.log("result", result);

      // generete token
      const token = await jwt.sign({ id: checkUser._id }, TOKEN_SECRET);
      console.log("token login", token);
      return res.status(200).json({
        status: 200,
        data: checkUser,
        token,
        message: "Login successfully",
        // subscribeTime: result,
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

const getUserDetail = async (req, res) => {
  try {
    const getId = await req.userId;
    console.log(getId);

    let checkUser = await User.findOne({ _id: getId });
    // console.log("checkUser", checkUser);
    const result = calculateTimeRemaining(checkUser.verificationDate);
    // console.log("result", result);

    return res.status(200).json({
      remainingTime: result,
      email: checkUser.email,
      verified: checkUser.verified,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = { Login, getUserDetail };
