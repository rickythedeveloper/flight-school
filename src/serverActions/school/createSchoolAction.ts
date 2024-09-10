"use server";

import { dbService } from "@/services/dbService/injection";
import type { OperationResult } from "@/utils/OperationResult";
import { storageService } from "@/services/storageService/injection";

interface SchoolOverview {
  name: string;
  description: string;
}

export interface CreateSchoolActionInput {
  overview: SchoolOverview;
  fileFormData: FormData;
}

export const createSchoolAction = async ({
  overview,
  fileFormData,
}: CreateSchoolActionInput): Promise<
  OperationResult<
    undefined,
    | "failedToUploadImages"
    | "failedToCreateSchool"
    | "failedToInsertSchoolImages"
  >
> => {
  const createSchoolResult = await dbService.createSchool(overview);

  if (!createSchoolResult.isSuccess) {
    return { isSuccess: false, error: "failedToCreateSchool" };
  }

  const schoolId = createSchoolResult.data.id;

  const files = fileFormData
    .getAll("files")
    .filter((file) => typeof file !== "string");

  const imageUploadPromises = files.map((file) => {
    return storageService.uploadSchoolImage({ file, schoolId });
  });

  const imageUploadResults = await Promise.all(imageUploadPromises);

  const hasFailedToUploadAtLeastOneImage = imageUploadResults.some(
    (result) => !result.isSuccess,
  );

  const insertSchoolImagePromises = imageUploadResults.map(
    (imageUploadResult) => {
      if (imageUploadResult.isSuccess) {
        const imageId = imageUploadResult.data.imageId;
        return dbService.addSchoolImage({ schoolId, imageId });
      }

      return Promise.resolve(null);
    },
  );

  const insertSchoolImageResults = (
    await Promise.all(insertSchoolImagePromises)
  ).filter((result) => result !== null);

  if (hasFailedToUploadAtLeastOneImage) {
    return { isSuccess: false, error: "failedToUploadImages" };
  }

  const hasFailedToInsertAtLeastOneSchoolImages = insertSchoolImageResults.some(
    (result) => !result.isSuccess,
  );
  if (hasFailedToInsertAtLeastOneSchoolImages) {
    return { isSuccess: false, error: "failedToInsertSchoolImages" };
  }

  return { isSuccess: true };
};
