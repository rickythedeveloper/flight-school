import type { LoggerGenerator } from "@/services/logger/logger";
import { LoggerGeneratorImpl } from "@/services/logger/loggerGeneratorImpl";
import { idGenerator } from "@/services/idGenerator/injection";

export const loggerGenerator: LoggerGenerator = new LoggerGeneratorImpl(
  idGenerator,
);