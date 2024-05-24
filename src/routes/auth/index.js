// require("dotenv").config();

const express=require("express");
const signUpUser = require("./register");
const {Login,getUserDetail} = require("./login");
const updateProfile = require("./updateProfile");
const { tokenVerification } = require("../../middleware");
const router=express.Router();
const passport = require("passport");
const dotenv = require('dotenv');

dotenv.config();

router.post("/register", signUpUser);
router.post("/login", Login);
router.get("/getLoginDetails",tokenVerification, getUserDetail);
router.put("/update-profile",tokenVerification, updateProfile);






// router.get("/login/success", (req, res) => {
//   console.log("req",req);
// 	if (req.user) {
// 		res.status(200).json({
// 			error: false,
// 			message: "Successfully Loged In",
// 			user: req.user,
// 		});
// 	} else {
// 		res.status(403).json({ error: true, message: "Not Authorized" });
// 	}
// });

// router.get("/login/failed", (req, res) => {
// 	res.status(401).json({
// 		error: true,
// 		message: "Log in failure",
// 	});
// });

// router.get("/google", passport.authenticate('google', { scope: 
// 	[ 'email', 'profile' ] 
// }));

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: process.env.CLIENT_URL,
// 		failureRedirect: "/login/failed",
// 	})
// );

// router.get("/logout", (req, res) => {
// 	req.logout();
// 	res.redirect(process.env.CLIENT_URL);
// });



module.exports=router;