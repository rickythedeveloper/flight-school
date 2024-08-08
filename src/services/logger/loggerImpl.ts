import type { Logger as WinstonLogger } from "winston";
import winston from "winston";
import type { Log, Logger } from "@/services/logger/logger";
import type { IdGenerator } from "@/services/idGenerator/idGenerator";

export class LoggerImpl implements Logger {
  private logger: WinstonLogger;

  constructor(private idGenerator: IdGenerator) {
    this.logger = winston.createLogger({
      level: "debug",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  error: Log = (message, metadata) => {
    const logId = this.idGenerator.generate();
    this.logger.error(message, { ...metadata, logId: logId });
    return logId;
  };

  warn: Log = (message, metadata) => {
    const logId = this.idGenerator.generate();
    this.logger.warn(message, { ...metadata, logId: logId });
    return logId;
  };

  info: Log = (message, metadata) => {
    const logId = this.idGenerator.generate();
    this.logger.info(message, { ...metadata, logId: logId });
    return logId;
  };

  debug: Log = (message, metadata) => {
    const logId = this.idGenerator.generate();
    this.logger.debug(message, { ...metadata, logId: logId });
    return logId;
  };
}
