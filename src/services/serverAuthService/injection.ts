import type { ServerAuthService } from "@/services/serverAuthService/serverAuthService";
import { ServerAuthServiceImpl } from "@/services/serverAuthService/serverAuthServiceImpl";
import { loggerGenerator } from "@/services/loggerGenerator/injection";
import { supabaseService } from "@/services/supabaseService/injection";

const authServiceLogger = loggerGenerator.createLogger({
  name: "auth service",
});

export const serverAuthService: ServerAuthService = new ServerAuthServiceImpl(
  supabaseService,
  authServiceLogger,
);
