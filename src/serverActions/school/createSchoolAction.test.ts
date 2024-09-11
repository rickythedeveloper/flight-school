import { describe, expect, jest, test } from "@jest/globals";
import type { CreateSchoolActionInput } from "@/serverActions/school/createSchoolAction";
import { createSchoolAction } from "@/serverActions/school/createSchoolAction";
import { dbService } from "@/services/dbService/injection";
import { storageService } from "@/services/storageService/injection";
import type {
  InsertSchoolImage,
  InsertSchool,
} from "@/services/dbService/dbService";
import type { UploadSchoolImage } from "@/services/storageService/storageService";

jest.mock("@/services/dbService/injection", () => ({
  dbService: {
    insertSchool: jest.fn(),
    insertSchoolImage: jest.fn(),
  },
}));
const insertSchoolMock =
  dbService.insertSchool as jest.MockedFunction<InsertSchool>;
const insertSchoolImageMock =
  dbService.insertSchoolImage as jest.MockedFunction<InsertSchoolImage>;

jest.mock("@/services/storageService/injection", () => ({
  storageService: {
    uploadSchoolImage: jest.fn(),
  },
}));
const uploadSchoolImageMock =
  storageService.uploadSchoolImage as jest.MockedFunction<UploadSchoolImage>;

const getFileFormData = (images: File[]): FormData => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("files", image);
  });
  return formData;
};

const exampleInput: CreateSchoolActionInput = {
  overview: {
    name: "school name",
    description: "school description",
  },
  fileFormData: getFileFormData([
    new File([], "some-image.png"),
    new File([], "some-image2.png"),
    new File([], "some-image3.png"),
  ]),
};

const exampleInputWithoutImages: CreateSchoolActionInput = {
  overview: {
    name: "school name",
    description: "school description",
  },
  fileFormData: getFileFormData([]),
};

const mockInsertSchoolSuccess = (): void => {
  insertSchoolMock.mockResolvedValue({
    isSuccess: true,
    data: { id: "school-id" },
  });
};

const mockUploadSchoolImageSuccess = (): void => {
  uploadSchoolImageMock.mockResolvedValue({
    isSuccess: true,
    data: { imageId: "image-id" },
  });
};
const mockInsertSchoolImageSuccess = (): void => {
  insertSchoolImageMock.mockResolvedValue({
    isSuccess: true,
    data: { id: "school-image-id" },
  });
};

const mockInsertSchoolFailure = (): void => {
  insertSchoolMock.mockResolvedValue({ isSuccess: false });
};
const mockUploadSchoolImageFailure = (): void => {
  uploadSchoolImageMock.mockResolvedValue({
    isSuccess: false,
    error: "failedToUpload",
  });
};
const mockInsertSchoolImageFailure = (): void => {
  insertSchoolImageMock.mockResolvedValue({ isSuccess: false });
};

describe("createSchoolAction", () => {
  test("returns success if everything succeeds", async () => {
    mockInsertSchoolSuccess();
    mockUploadSchoolImageSuccess();
    mockInsertSchoolImageSuccess();

    const result = await createSchoolAction(exampleInput);

    expect(result).toStrictEqual({ isSuccess: true });
  });

  test("returns success when no images exist even if unable to upload images", async () => {
    mockInsertSchoolSuccess();
    mockUploadSchoolImageFailure();
    mockInsertSchoolImageFailure();

    const result = await createSchoolAction(exampleInputWithoutImages);

    expect(result).toStrictEqual({ isSuccess: true });
  });

  test("returns failure if unable to insert a school to db", async () => {
    mockInsertSchoolFailure();
    mockUploadSchoolImageSuccess();
    mockInsertSchoolImageSuccess();

    const result = await createSchoolAction(exampleInput);

    expect(result).toStrictEqual({
      isSuccess: false,
      error: "failedToCreateSchool",
    });
  });

  test("returns failure if unable to upload images to storage", async () => {
    mockInsertSchoolSuccess();
    mockUploadSchoolImageFailure();
    mockInsertSchoolImageSuccess();

    const result = await createSchoolAction(exampleInput);

    expect(result).toStrictEqual({
      isSuccess: false,
      error: "failedToUploadImages",
    });
  });

  test("returns failure if unable to insert school images to db", async () => {
    mockInsertSchoolSuccess();
    mockUploadSchoolImageSuccess();
    mockInsertSchoolImageFailure();

    const result = await createSchoolAction(exampleInput);

    expect(result).toStrictEqual({
      isSuccess: false,
      error: "failedToInsertSchoolImages",
    });
  });
});
