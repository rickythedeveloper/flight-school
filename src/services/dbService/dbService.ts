import type { OperationResult } from "@/utils/OperationResult";

export interface Profile {
  firstName: string;
  lastName: string;
}

type SaveProfileResult = OperationResult<undefined, undefined>;

export type SaveProfile = (profile: Profile) => Promise<SaveProfileResult>;

export interface DbService {
  saveProfile: SaveProfile;
}
