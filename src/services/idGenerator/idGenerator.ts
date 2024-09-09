export type Generate = () => string;

export interface IdGenerator {
  generateUuid: Generate;
}
