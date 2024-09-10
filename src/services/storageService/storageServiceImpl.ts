import type {
  StorageService,
  UploadSchoolImage,
} from "@/services/storageService/storageService";
import type { SupabaseService } from "@/services/supabaseService/supabaseService";
import type { Logger } from "@/services/loggerGenerator/loggerGenerator";
import type { IdGenerator } from "@/services/idGenerator/idGenerator";

interface StorageLocation {
  bucketName: string;
  path: string;
}

const getSchoolImageLocation = ({
  schoolId,
  imageId,
}: {
  schoolId: string;
  imageId: string;
}): StorageLocation => {
  return {
    bucketName: "school-image",
    path: `${schoolId}/${imageId}`,
  };
};

export class StorageServiceImpl implements StorageService {
  constructor(
    private supabaseService: SupabaseService,
    private logger: Logger,
    private idGenerator: IdGenerator,
  ) {}

  uploadSchoolImage: UploadSchoolImage = async ({ file, schoolId }) => {
    const supabase = this.supabaseService.createServerClient();

    const imageId = this.idGenerator.generateUuid();

    const { bucketName, path } = getSchoolImageLocation({ schoolId, imageId });

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path, file);

    if (error) {
      this.logger.error("Could not upload school image", { error });
      return { isSuccess: false, error: "failedToUpload" };
    }

    this.logger.info("Successfully uploaded a school image", {
      bucketName,
      path,
    });
    return { isSuccess: true, data: { imageId } };
  };
}
