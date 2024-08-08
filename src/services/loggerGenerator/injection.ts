import type { LoggerGenerator } from "@/services/loggerGenerator/loggerGenerator";
import { LoggerGeneratorImpl } from "@/services/loggerGenerator/loggerGeneratorImpl";
import { idGenerator } from "@/services/idGenerator/injection";

export const loggerGenerator: LoggerGenerator = new LoggerGeneratorImpl(
  idGenerator,
);
