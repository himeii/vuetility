const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "debug",
      handleExceptions: true,
      json: false,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
