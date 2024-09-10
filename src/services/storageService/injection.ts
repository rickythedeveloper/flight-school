import { StorageServiceImpl } from "@/services/storageService/storageServiceImpl";
import { supabaseService } from "@/services/supabaseService/injection";
import { loggerGenerator } from "@/services/loggerGenerator/injection";
import { idGenerator } from "@/services/idGenerator/injection";

const storageLogger = loggerGenerator.createLogger({ name: "storage service" });
export const storageService = new StorageServiceImpl(
  supabaseService,
  storageLogger,
  idGenerator,
);
