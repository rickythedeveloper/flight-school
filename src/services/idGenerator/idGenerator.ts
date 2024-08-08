export type Generate = () => string;

export interface IdGenerator {
  generate: Generate;
}
