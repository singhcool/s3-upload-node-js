const fs = require("fs");
const AWS = require("aws-sdk");

// AWS Configuration
AWS.config.setPromisesDependency();
let AwsConfig =
  process.env.FILE_UPLOAD_SERVICE === "minio"
    ? {
        accessKeyId: process.env.MINIO_KEY,
        secretAccessKey: process.env.MINIO_SECRET,
        endpoint: process.env.MINIO_ENDPOINT,
        s3ForcePathStyle: true, // needed with minio?
        signatureVersion: "v4",
      }
    : {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        region: process.env.AWS_REGION,
      };
let FileBucket =
  process.env.FILE_UPLOAD_SERVICE === "minio"
    ? process.env.MINIO_BUCKET
    : process.env.AWS_BUCKET;
AWS.config.update(AwsConfig);
let s3 = new AWS.S3();
let s3Stream = require("s3-upload-stream")(s3);

function MyCustomStorage(opts) {}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  let fileExtension = file.originalname.split(".").pop();
  let fileName = file.originalname.split(".").slice(0, -1).join(".").trim().replace(/[^A-Z0-9]+/ig, "-").toLowerCase()+Date.now()+'.'+fileExtension;

  let upload = s3Stream.upload({
    Bucket: FileBucket,
    Key: `file/${fileName}`,
  });
  upload.maxPartSize(20971520); // 20 MB
  upload.concurrentParts(5);
  file.stream.pipe(upload);
  upload.on("error", function (error) {
    cb(error);
  });

  upload.on("part", function (details) {
    console.log(details);
  });

  upload.on("uploaded", function (details) {
    console.log(details);
    cb(null, {
      details: details,
    });
  });
};

MyCustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  fs.unlink(file.path, cb);
};

module.exports = function (opts) {
  return new MyCustomStorage(opts);
};
