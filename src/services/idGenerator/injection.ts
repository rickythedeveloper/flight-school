import type { IdGenerator } from "@/services/idGenerator/idGenerator";
import { IdGeneratorImpl } from "@/services/idGenerator/idGeneratorImpl";

export const idGenerator: IdGenerator = new IdGeneratorImpl();
