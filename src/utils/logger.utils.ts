import winston, { Logger } from 'winston';

const logger: Logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

export default logger;
