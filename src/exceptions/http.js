var util = require("util");

/**
 * HTTP Middleware Function.
 *
 * @param {String} message is the error message
 * @param {Number} statusCode is the error code
 *
 */

function HttpError(message, statusCode) {
  this.message = message;
  this.statusCode = statusCode;
  this.stack = new Error().stack;
}

util.inherits(Error, HttpError);
module.exports = HttpError;
