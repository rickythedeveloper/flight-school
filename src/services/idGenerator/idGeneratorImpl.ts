import { v4 as uuidv4 } from "uuid";
import type { Generate, IdGenerator } from "@/services/idGenerator/idGenerator";

export class IdGeneratorImpl implements IdGenerator {
  generate: Generate = () => {
    return uuidv4();
  };
}