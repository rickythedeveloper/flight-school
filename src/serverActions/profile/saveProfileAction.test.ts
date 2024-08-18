import { describe, expect, jest, test } from "@jest/globals";
import { saveProfileAction } from "@/serverActions/profile/saveProfileAction";
import { dbService } from "@/services/dbService/injection";
import type { Profile, SaveProfile } from "@/services/dbService/dbService";

jest.mock("@/services/dbService/injection", () => ({
  dbService: {
    saveProfile: jest.fn(),
  },
}));
const saveProfileMock =
  dbService.saveProfile as jest.MockedFunction<SaveProfile>;

const validProfile: Profile = { firstName: "First", lastName: "Last" };

describe("signUp", () => {
  test("returns failure if profile could not be saved", async () => {
    saveProfileMock.mockResolvedValue({ isSuccess: false });

    const result = await saveProfileAction(validProfile);

    expect(saveProfileMock).toHaveBeenCalledWith(validProfile);
    expect(result).toStrictEqual({ isSuccess: false });
  });

  test("returns success if profile is saved", async () => {
    saveProfileMock.mockResolvedValue({ isSuccess: true });

    const result = await saveProfileAction(validProfile);

    expect(saveProfileMock).toHaveBeenCalledWith(validProfile);
    expect(result).toStrictEqual({ isSuccess: true });
  });
});
