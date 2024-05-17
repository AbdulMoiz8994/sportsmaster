const express=require("express");
const auth = require("./auth");
const admin = require("./admin");
const blog = require("./blog");
const magazine=require("./magazine");
const audioArticle=require("./audioArticle");
const payment=require("./paymentMethod/payment");

const router=express.Router();


router.use("/auth", auth);
router.use("/admin", admin);
router.use("/news", blog);
router.use("/magazine", magazine);
router.use("/audio", audioArticle);
router.use("/payment",payment);

// https://sportsmaster.onrender.com/

module.exports=router;