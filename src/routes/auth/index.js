const express=require("express");
const signUpUser = require("./register");
const {Login,getUserDetail} = require("./login");
const updateProfile = require("./updateProfile");
const { tokenVerification } = require("../../middleware");
const router=express.Router();


router.post("/register", signUpUser);
router.post("/login", Login);
router.get("/getLoginDetails",tokenVerification, getUserDetail);
router.put("/update-profile",tokenVerification, updateProfile);




module.exports=router;