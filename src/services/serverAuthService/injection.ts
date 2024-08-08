import type { ServerAuthService } from "@/services/serverAuthService/serverAuthService";
import { ServerAuthServiceImpl } from "@/services/serverAuthService/serverAuthServiceImpl";
import { envService } from "@/services/envService/injection";
import { logger } from "@/services/logger/injection";

export const serverAuthService: ServerAuthService = new ServerAuthServiceImpl(
  envService,
  logger,
);
