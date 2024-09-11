import type { OperationResult } from "@/utils/OperationResult";

export interface Profile {
  firstName: string;
  lastName: string;
}

type GetProfileResult = OperationResult<Profile, undefined>;
export type SelectProfile = (userId: string) => Promise<GetProfileResult>;

type SaveProfileResult = OperationResult<undefined, undefined>;
export type UpsertProfile = (
  userId: string,
  profile: Profile,
) => Promise<SaveProfileResult>;

export interface School {
  name: string;
  description: string;
}

type CreateSchoolResult = OperationResult<{ id: string }, undefined>;
export type InsertSchool = (school: School) => Promise<CreateSchoolResult>;

export interface SchoolImage {
  schoolId: string;
  imageId: string;
}

type AddSchoolImageResult = OperationResult<{ id: string }, undefined>;
export type InsertSchoolImage = (
  schoolImage: SchoolImage,
) => Promise<AddSchoolImageResult>;

export interface DbService {
  selectProfile: SelectProfile;
  upsertProfile: UpsertProfile;

  insertSchool: InsertSchool;
  insertSchoolImage: InsertSchoolImage;
}
