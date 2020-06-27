## S3 and Minio Upload API

[![NPM version](https://badge.fury.io/js/multer.svg)](https://badge.fury.io/js/multer) [![NPM version](https://badge.fury.io/js/s3-upload-stream.svg)](https://badge.fury.io/js/s3-upload-stream) [![NPM version](https://badge.fury.io/js/aws-sdk.svg)](https://badge.fury.io/js/aws-sdk) 

## Description

Upload your file to S3 and Minio Storage with Cluster

## Features
- *upload any format to s3 or minio storage using node js*
- *upload large size file using s3 multipart upload*

## Usage

You can change the storage setting in `.env` using below

For Minio Storage

```FILE_UPLOAD_SERVICE = minio```

For AWS S3 Storage

```FILE_UPLOAD_SERVICE = s3```

Update the AWS key and Secret key in `.env`

POST API http://localhost:8090/s3_upload/file with formdata key `s3_file`

## Installation

[Node Installation](https://nodejs.org/)

`sudo apt install nodejs`
`sudo apt install npm`

### Start app
`npm start`

## Stay in touch

* Author - [Raja SIngh](https://www.linkedin.com/in/raja-singh-a097458a/)
* Medium - [@singhcoolish](https://medium.com/@singhcoolish)
* Dev.to - [singhcool](https://dev.to/singhcool)
* LinkedIn - [raja-singh-a097458a](https://www.linkedin.com/in/raja-singh-a097458a/)
