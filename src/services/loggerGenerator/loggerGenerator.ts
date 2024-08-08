type LogId = string;

export type LogMetadata = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type Log = (message: string, metadata?: LogMetadata) => LogId;

export interface Logger {
  error: Log;
  warn: Log;
  info: Log;
  debug: Log;
}

export type LoggerContext = Record<string, string | number | boolean> & {
  name: string;
};

export type CreateLogger = (loggerContext: LoggerContext) => Logger;

export interface LoggerGenerator {
  createLogger: CreateLogger;
}
