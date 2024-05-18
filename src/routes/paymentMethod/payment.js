const express=require("express");
const { tokenVerification } = require("../../middleware");
const { payPalConfig, paymentSuccess, cancelPay } = require(".");
const router=express.Router();


router.post("/pay",tokenVerification, payPalConfig);
router.get("/success",tokenVerification, paymentSuccess);
router.get('/cancel', cancelPay);


module.exports=router;

