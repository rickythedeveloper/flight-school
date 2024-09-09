"use server";

import { dbService } from "@/services/dbService/injection";
import type { CreateSchool } from "@/services/dbService/dbService";

export type CreateSchoolAction = CreateSchool;

export const createSchoolAction: CreateSchoolAction = async (school) => {
  // TODO upload images
  return dbService.createSchool(school);
  // TODO create school image entries
};
