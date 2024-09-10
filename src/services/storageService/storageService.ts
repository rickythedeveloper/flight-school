import type { OperationResult } from "@/utils/OperationResult";

export type UploadSchoolImage = (data: {
  file: File;
  schoolId: string;
}) => Promise<OperationResult<{ imageId: string }, "failedToUpload">>;

export interface StorageService {
  uploadSchoolImage: UploadSchoolImage;
}
