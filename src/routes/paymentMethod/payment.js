const express=require("express");
const { tokenVerification } = require("../../middleware");
const { payPalConfig, paymentSuccess, cancelPay } = require(".");
const router=express.Router();


router.post("/pay",  payPalConfig);
router.get("/success", paymentSuccess);
router.get('/cancel', cancelPay);


module.exports=router;

