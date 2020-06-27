const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;

const path = require("path");
let logger = createLogger({
  format: combine(
    label({ label: "File Upload Service" }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console({ json: false, timestamp: true }),
    new transports.File({
      filename: path.join(__dirname, "../../log/debug.log"),
      json: false,
    }),
  ],
  exceptionHandlers: [
    new transports.Console({ json: false, timestamp: true }),
    new transports.File({
      filename: path.join(__dirname, "../../log/exceptions.log"),
      json: false,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
