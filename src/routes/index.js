const express=require("express");
const auth = require("./auth");
const admin = require("./admin");
const blog = require("./blog");
const magazine=require("./magazine")
const router=express.Router();


router.use("/auth", auth);
router.use("/admin", admin);
router.use("/news", blog);
router.use("/magazine", magazine);

// https://sportsmaster.onrender.com/

module.exports=router;