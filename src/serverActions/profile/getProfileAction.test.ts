import { describe, expect, jest, test } from "@jest/globals";
import { dbService } from "@/services/dbService/injection";
import type { Profile, SelectProfile } from "@/services/dbService/dbService";
import { serverAuthService } from "@/services/serverAuthService/injection";
import type { GetUserId } from "@/services/serverAuthService/serverAuthService";
import { getProfileAction } from "@/serverActions/profile/getProfileAction";

jest.mock("@/services/dbService/injection", () => ({
  dbService: {
    selectProfile: jest.fn(),
  },
}));
const selectProfileMock =
  dbService.selectProfile as jest.MockedFunction<SelectProfile>;

jest.mock("@/services/serverAuthService/injection", () => ({
  serverAuthService: {
    getUserId: jest.fn(),
  },
}));
const getUserIdMock =
  serverAuthService.getUserId as jest.MockedFunction<GetUserId>;

const validProfile: Profile = { firstName: "First", lastName: "Last" };
const validUserId = "F4294086-CAC5-4CFB-AD53-08AEA1C9028E";

describe("get profile action", () => {
  test("returns failure if profile could not be retrieved", async () => {
    selectProfileMock.mockResolvedValue({ isSuccess: false });
    getUserIdMock.mockResolvedValue(validUserId);

    const result = await getProfileAction();

    expect(selectProfileMock).toHaveBeenCalledWith(validUserId);
    expect(result).toStrictEqual({
      isSuccess: false,
      error: "profileNotFound",
    });
  });

  test("returns success if profile is retrieved", async () => {
    selectProfileMock.mockResolvedValue({
      isSuccess: true,
      data: validProfile,
    });
    getUserIdMock.mockResolvedValue(validUserId);

    const result = await getProfileAction();

    expect(selectProfileMock).toHaveBeenCalledWith(validUserId);
    expect(result).toStrictEqual({ isSuccess: true, data: validProfile });
  });

  test("returns failure if user is not authenticated", async () => {
    selectProfileMock.mockResolvedValue({
      isSuccess: true,
      data: { firstName: "First", lastName: "Last" },
    });
    getUserIdMock.mockResolvedValue(null);

    const result = await getProfileAction();

    expect(selectProfileMock).not.toHaveBeenCalled();
    expect(result).toStrictEqual({
      isSuccess: false,
      error: "notAuthenticated",
    });
  });
});
