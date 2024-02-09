
const morgan = require('morgan');

const {logger_console} = require("../../config/winston.config")

function morgan_middleware() {
  return morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => logger_console.info(message.trim()),
      },
    }
  );
}

module.exports = morgan_middleware;
