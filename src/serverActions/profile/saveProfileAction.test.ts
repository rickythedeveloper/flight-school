import { describe, expect, jest, test } from "@jest/globals";
import { saveProfileAction } from "@/serverActions/profile/saveProfileAction";
import { dbService } from "@/services/dbService/injection";
import type { Profile, UpsertProfile } from "@/services/dbService/dbService";
import { serverAuthService } from "@/services/serverAuthService/injection";
import type { GetUserId } from "@/services/serverAuthService/serverAuthService";

jest.mock("@/services/dbService/injection", () => ({
  dbService: {
    upsertProfile: jest.fn(),
  },
}));
const saveProfileMock =
  dbService.upsertProfile as jest.MockedFunction<UpsertProfile>;

jest.mock("@/services/serverAuthService/injection", () => ({
  serverAuthService: {
    getUserId: jest.fn(),
  },
}));
const getUserIdMock =
  serverAuthService.getUserId as jest.MockedFunction<GetUserId>;

const validProfile: Profile = { firstName: "First", lastName: "Last" };
const validUserId = "F4294086-CAC5-4CFB-AD53-08AEA1C9028E";

describe("save profile action", () => {
  test("returns failure if profile could not be saved", async () => {
    saveProfileMock.mockResolvedValue({ isSuccess: false });
    getUserIdMock.mockResolvedValue(validUserId);

    const result = await saveProfileAction(validProfile);

    expect(saveProfileMock).toHaveBeenCalledWith(validUserId, validProfile);
    expect(result).toStrictEqual({ isSuccess: false });
  });

  test("returns success if profile is saved", async () => {
    saveProfileMock.mockResolvedValue({ isSuccess: true });
    getUserIdMock.mockResolvedValue(validUserId);

    const result = await saveProfileAction(validProfile);

    expect(saveProfileMock).toHaveBeenCalledWith(validUserId, validProfile);
    expect(result).toStrictEqual({ isSuccess: true });
  });

  test("returns failure if user is not authenticated", async () => {
    saveProfileMock.mockResolvedValue({ isSuccess: true });
    getUserIdMock.mockResolvedValue(null);

    const result = await saveProfileAction(validProfile);

    expect(saveProfileMock).not.toHaveBeenCalled();
    expect(result).toStrictEqual({ isSuccess: false });
  });
});
