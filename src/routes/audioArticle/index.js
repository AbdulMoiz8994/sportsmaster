const upload = require("../../multer/index");
const express = require("express");
const { tokenVerification } = require("../../middleware");
const uploadMusicArticle = require("./uploadArticle");
const getAudioArticle = require("./getAudio");
const router = express.Router();

router.post(
  "/upload-audio", upload.fields([{ name: "audio", maxCount: 1 },{ name: "image", maxCount: 1 },]),
  uploadMusicArticle
);
router.get("/get-audio", getAudioArticle);


module.exports = router;
