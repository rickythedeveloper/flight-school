import type { DbService } from "@/services/dbService/dbService";
import { DbServiceImpl } from "@/services/dbService/dbServiceImpl";
import { supabaseService } from "@/services/supabaseService/injection";
import { serverAuthService } from "@/services/serverAuthService/injection";
import { loggerGenerator } from "@/services/loggerGenerator/injection";

const dbServiceLogger = loggerGenerator.createLogger({ name: "db service" });
export const dbService: DbService = new DbServiceImpl(
  supabaseService,
  serverAuthService,
  dbServiceLogger,
);
