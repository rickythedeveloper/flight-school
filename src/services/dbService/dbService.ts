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

export interface School {
  name: string;
  description: string;
}

type CreateSchoolResult = OperationResult<undefined, undefined>;
export type CreateSchool = (school: School) => Promise<CreateSchoolResult>;

export interface DbService {
  getProfile: GetProfile;
  saveProfile: SaveProfile;

  createSchool: CreateSchool;
}
