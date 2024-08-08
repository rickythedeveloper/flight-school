import { describe, expect, jest, test } from "@jest/globals";
import winston from "winston";
import { LoggerGeneratorImpl } from "@/services/loggerGenerator/loggerGeneratorImpl";
import type { IdGenerator } from "@/services/idGenerator/idGenerator";

jest.mock("winston", () => {
  const originalModule =
    jest.requireActual<typeof import("winston")>("winston"); // eslint-disable-line @typescript-eslint/consistent-type-imports
  return {
    ...originalModule,
    __esModule: true,
    default: {
      format: originalModule.format,
      transports: originalModule.transports,
      createLogger: jest.fn(),
    },
  };
});
const createLoggerMock = winston.createLogger as jest.Mock;

const errorMock = jest.fn();
const warnMock = jest.fn();
const infoMock = jest.fn();
const debugMock = jest.fn();
createLoggerMock.mockReturnValue({
  error: errorMock,
  warn: warnMock,
  info: infoMock,
  debug: debugMock,
});

const logId = "some-id";
const idGeneratorMock: IdGenerator = {
  generate: () => logId,
};
const loggerGenerator = new LoggerGeneratorImpl(idGeneratorMock);

describe("loggerGeneratorImpl", () => {
  test("error logs message and context", () => {
    const loggerContext = { name: "Logger name", someValue: 10 };
    const logger = loggerGenerator.createLogger(loggerContext);

    const logMetadata = { anotherValue: 20 };
    const logMessage = "some message";
    logger.error(logMessage, logMetadata);

    expect(errorMock).toHaveBeenCalledWith(logMessage, {
      loggerContext,
      metadata: logMetadata,
      logId: logId,
    });
  });

  test("warn logs message and context", () => {
    const loggerContext = { name: "Logger name", someValue: 10 };
    const logger = loggerGenerator.createLogger(loggerContext);

    const logMetadata = { anotherValue: 20 };
    const logMessage = "some message";
    logger.warn(logMessage, logMetadata);

    expect(warnMock).toHaveBeenCalledWith(logMessage, {
      loggerContext,
      metadata: logMetadata,
      logId: logId,
    });
  });

  test("info logs message and context", () => {
    const loggerContext = { name: "Logger name", someValue: 10 };
    const logger = loggerGenerator.createLogger(loggerContext);

    const logMetadata = { anotherValue: 20 };
    const logMessage = "some message";
    logger.info(logMessage, logMetadata);

    expect(infoMock).toHaveBeenCalledWith(logMessage, {
      loggerContext,
      metadata: logMetadata,
      logId: logId,
    });
  });

  test("debug logs message and context", () => {
    const loggerContext = { name: "Logger name", someValue: 10 };
    const logger = loggerGenerator.createLogger(loggerContext);

    const logMetadata = { anotherValue: 20 };
    const logMessage = "some message";
    logger.debug(logMessage, logMetadata);

    expect(debugMock).toHaveBeenCalledWith(logMessage, {
      loggerContext,
      metadata: logMetadata,
      logId: logId,
    });
  });
});
