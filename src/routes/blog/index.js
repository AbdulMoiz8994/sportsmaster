const upload = require("../../multer/index");
const express=require("express");
const { tokenVerification } = require("../../middleware");
const uploadBlog = require("./uploadBlog");
const getBlog = require("./getBlog");
const router=express.Router();

router.post("/upload",upload.array("image", 9000), uploadBlog);
router.get("/get-news", getBlog);


module.exports=router;