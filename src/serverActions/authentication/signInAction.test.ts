import { describe, expect, jest, test } from "@jest/globals";
import { signInAction } from "@/serverActions/authentication/signInAction";

import type {
  AuthCredential,
  SignIn,
} from "@/services/serverAuthService/serverAuthService";

import { serverAuthService } from "@/services/serverAuthService/injection";

jest.mock("@/services/serverAuthService/injection", () => ({
  serverAuthService: {
    signIn: jest.fn(),
  },
}));
const signInMock = serverAuthService.signIn as jest.MockedFunction<SignIn>;

const validCredentials: AuthCredential = {
  email: "test@example.com",
  password: "testPassword",
};

describe("signIn", () => {
  test("returns error if sign in fails", async () => {
    signInMock.mockResolvedValue({ isSuccess: false, hasProfile: null });

    const result = await signInAction(validCredentials);

    expect(result).toStrictEqual({ isSuccess: false });
  });

  test("returns success if sign in succeeds but no profile is found", async () => {
    signInMock.mockResolvedValue({ isSuccess: true, hasProfile: false });

    const result = await signInAction(validCredentials);

    expect(result).toStrictEqual({
      isSuccess: true,
      data: { hasProfile: false },
    });
  });

  test("return success if sign in succeeds", async () => {
    signInMock.mockResolvedValue({ isSuccess: true, hasProfile: true });

    const result = await signInAction(validCredentials);

    expect(result).toStrictEqual({
      isSuccess: true,
      data: {
        hasProfile: true,
      },
    });
  });
});
