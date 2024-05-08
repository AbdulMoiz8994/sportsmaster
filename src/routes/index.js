const express=require("express");
const auth = require("./auth");
const admin = require("./admin");
const blog = require("./blog");

const router=express.Router();


router.use("/auth", auth);
router.use("/admin", admin);
router.use("/news", blog);



module.exports=router;