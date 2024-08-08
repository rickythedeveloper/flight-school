import type { Logger } from "@/services/logger/logger";
import { LoggerImpl } from "@/services/logger/loggerImpl";
import { idGenerator } from "@/services/idGenerator/injection";

export const logger: Logger = new LoggerImpl(idGenerator);
