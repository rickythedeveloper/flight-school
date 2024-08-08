import type { EnvService } from "@/services/envService/envService";
import { EnvServiceImpl } from "@/services/envService/envServiceImpl";

export const envService: EnvService = new EnvServiceImpl();
