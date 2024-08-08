import type { ServerAuthService } from "@/services/serverAuthService/serverAuthService";
import { ServerAuthServiceImpl } from "@/services/serverAuthService/serverAuthServiceImpl";
import { envService } from "@/services/envService/injection";
import { loggerGenerator } from "@/services/logger/injection";

const authServiceLogger = loggerGenerator.createLogger({
  name: "auth service logger",
});

export const serverAuthService: ServerAuthService = new ServerAuthServiceImpl(
  envService,
  authServiceLogger,
);
