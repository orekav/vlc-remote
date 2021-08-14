const { LOGGER_LEVEL } = require("../config/environment");
const winston = require("winston");

const logger = winston.createLogger({
    exitOnError: false,
    level: LOGGER_LEVEL,
    handleExceptions: true,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
    ]
});

module.exports = logger;
