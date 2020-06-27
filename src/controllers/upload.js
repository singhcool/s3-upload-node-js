const logger = require("../utils/logger");
const HttpError = require("../exceptions/http");


/**
 * Upload file to S3
 *
 * @name File Upload to S3
 * @route {POST} /upload
 * @params {File} qqfile
 *
 */

const uploadFileS3 = async (req, res, next) => {
  var file = req.file;
  try {
    res.send({
      success: true,
      s3_url: file.details.Location,
    });
  } catch (err) {
    logger.error("Server Error " + err);
    return next(new HttpError("Internal server error!", 500));
  }
};

module.exports = {
  uploadFileS3: uploadFileS3,
};
