const express=require("express");
const { tokenVerification } = require("../../middleware");
const AdminSignup = require("./signup");
const adminLogin = require("./login");
const getAdminCred = require("./getAdminData");
const router=express.Router();


router.post("/admin-signup", AdminSignup);
router.post("/admin-login", adminLogin);
router.post("/admin-credentials", getAdminCred);



module.exports=router;
