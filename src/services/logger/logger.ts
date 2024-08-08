type LogId = string;

export type Log = (
  message: string,
  metadata?: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
) => LogId;

export interface Logger {
  error: Log;
  warn: Log;
  info: Log;
  debug: Log;
}
