import type { OperationResult } from "@/utils/OperationResult";

export interface Profile {
  firstName: string;
  lastName: string;
}

type GetProfileResult = OperationResult<
  Profile,
  "notAuthenticated" | "profileNotFound"
>;
export type GetProfile = () => Promise<GetProfileResult>;

type SaveProfileResult = OperationResult<undefined, undefined>;
export type SaveProfile = (profile: Profile) => Promise<SaveProfileResult>;

export interface DbService {
  getProfile: GetProfile;
  saveProfile: SaveProfile;
}
