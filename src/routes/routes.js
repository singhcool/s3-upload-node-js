const express = require("express");
const router = express.Router();
const controller = require("../controllers/upload");
const myCustomStorage = require("../utils/customStorage");
const multer = require("multer");

let FileStorage = myCustomStorage({
  destination: function (req, file, cb) {
    cb(null);
  },
});

let uploadFile = multer({
  storage: FileStorage,
});

//module routes
router
  .route("/file")
  .post(uploadFile.single("s3_file"), controller.uploadFileS3);

module.exports = router;
