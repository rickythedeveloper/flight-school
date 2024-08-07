import { EnvServiceImpl } from "@/services/envService/envServiceImpl";
import type { EnvService } from "@/services/envService/envService";
import type { ServerAuthService } from "@/services/serverAuthService/serverAuthService";
import { ServerAuthServiceImpl } from "@/services/serverAuthService/serverAuthServiceImpl";

export const envService: EnvService = new EnvServiceImpl();
export const authService: ServerAuthService = new ServerAuthServiceImpl(
  envService,
);
