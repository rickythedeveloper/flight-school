import type { Logger as WinstonLogger } from "winston";
import winston from "winston";
import type {
  CreateLogger,
  Log,
  Logger,
  LoggerContext,
  LoggerGenerator,
  LogMetadata,
} from "@/services/loggerGenerator/loggerGenerator";
import type { IdGenerator } from "@/services/idGenerator/idGenerator";

class LoggerImpl implements Logger {
  private logger: WinstonLogger;

  constructor(
    private context: LoggerContext,
    private idGenerator: IdGenerator,
  ) {
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
    const logId = this.idGenerator.generateUuid();
    this.logger.error(message, this.createLogMetadata(logId, metadata));
    return logId;
  };

  warn: Log = (message, metadata) => {
    const logId = this.idGenerator.generateUuid();
    this.logger.warn(message, this.createLogMetadata(logId, metadata));
    return logId;
  };

  info: Log = (message, metadata) => {
    const logId = this.idGenerator.generateUuid();
    this.logger.info(message, this.createLogMetadata(logId, metadata));
    return logId;
  };

  debug: Log = (message, metadata) => {
    const logId = this.idGenerator.generateUuid();
    this.logger.debug(message, this.createLogMetadata(logId, metadata));
    return logId;
  };

  private createLogMetadata = (
    logId: string,
    metadata?: LogMetadata,
  ): LogMetadata => ({
    metadata,
    logId: logId,
    loggerContext: this.context,
  });
}

export class LoggerGeneratorImpl implements LoggerGenerator {
  constructor(private idGenerator: IdGenerator) {}

  createLogger: CreateLogger = (loggerContext) => {
    return new LoggerImpl(loggerContext, this.idGenerator);
  };
}
