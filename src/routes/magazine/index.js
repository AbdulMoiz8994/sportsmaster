const upload = require("../../multer/index");
const express = require("express");
const { tokenVerification } = require("../../middleware");
const uploadMagazine = require("./uploadMagazine");
const getMagazine = require("./getMagazine");
const router = express.Router();

router.post(
  "/upload-magazine",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 9000 },
  ]),
  uploadMagazine
);
router.get("/get-magazine", getMagazine);

module.exports = router;
