const path = require("path")
const filter = require("../utils/filter.log")
const winston = require('winston');
const envConfig = require("./env.config");
require('winston-daily-rotate-file');


const { combine, timestamp, printf, align , colorize } = winston.format;

const file_rotate_transport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname,'..','logs','debug-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '15d',
})

const logger_file = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    
    file_rotate_transport,
    new winston.transports.File({
        filename: path.join(__dirname,'..','logs','error.log'),
        level:'error',
        format : combine(filter.errorFilter(),timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}))
      }),
    new winston.transports.File({
        filename: path.join(__dirname,'..','logs','info.log'),
        level:'info',
        format : combine(filter.infoFilter(),timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}))
      }),
    new winston.transports.File({
        filename: path.join(__dirname,'..','logs','warn.log'),
        level:'warn',
        format : combine(filter.warnFilter(),timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}))
      }),
],
exceptionHandlers : [
    new winston.transports.File({
        filename : path.join(__dirname,'..','logs','server-error-logs','exception.log')
    }),
],
rejectionHandlers : [
    new winston.transports.File({
        filename : path.join(__dirname,'..','logs','server-error-logs','rejection.log')
    }),
]

});

const logger_console = winston.createLogger({
    level: envConfig.log_level || 'info',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
      new winston.transports.Console({
          filename: path.join(__dirname,'..','logs','info.log'),
          level:'info',
          format : combine(filter.infoFilter(),timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}))
        }),
      new winston.transports.Console({
          filename: path.join(__dirname,'..','logs','error.log'),
          level:'error',
          format : combine(filter.errorFilter(),timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}))
        }),
      new winston.transports.Console({
          filename: path.join(__dirname,'..','logs','warn.log'),
          level:'warn',
          format : combine(filter.warnFilter(),timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}))
        }),
  ],  
  });

module.exports = {
    logger_file,
    logger_console
}
