/**
 * Error Middleware Function.
 *
 * @param {String} error is the Http Error
 *
 */

function errorMidleware(error, req, res, next) {
  res.status(error.statusCode ? error.statusCode : 400).send({
    status: "error",
    message: error.message ? error.message : "Invaild JSON Format",
  });
}

module.exports = errorMidleware;
