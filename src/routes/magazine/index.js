const upload = require("../../multer/index");
const express=require("express");
const { tokenVerification } = require("../../middleware");
const uploadMagazine = require("./uploadMagazine");
const router=express.Router();

router.post("/upload-magazine",upload.single("file"), uploadMagazine);


module.exports=router;
