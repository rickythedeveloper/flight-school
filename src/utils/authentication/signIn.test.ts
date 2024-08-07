import { describe, expect, jest, test } from "@jest/globals";
import { redirect } from "next/navigation";
import { signIn } from "@/utils/authentication/signIn";

import type {
  AuthCredential,
  SignIn,
} from "@/services/serverAuthService/serverAuthService";
import { authService } from "@/services";

jest.mock("@/services", () => ({
  authService: {
    signIn: jest.fn(),
  },
}));
const signInMock = authService.signIn as jest.MockedFunction<SignIn>;

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
const redirectMock = redirect as jest.MockedFunction<(url: string) => never>;

const validCredentials: AuthCredential = {
  email: "test@example.com",
  password: "testPassword",
};

describe("signIn", () => {
  test("redirect to login page if sign in fails", async () => {
    signInMock.mockResolvedValue({ isSuccess: false });

    await signIn(validCredentials);

    expect(signInMock).toHaveBeenCalledWith(validCredentials);
    const redirectUrl = redirectMock.mock.calls[0][0];
    expect(redirectUrl).toBe("/login?message=Could not authenticate user");
  });

  test("redirects to account if sign in succeeds", async () => {
    signInMock.mockResolvedValue({ isSuccess: true });

    await signIn(validCredentials);

    expect(signInMock).toHaveBeenCalledWith(validCredentials);
    const redirectUrl = redirectMock.mock.calls[0][0];
    expect(redirectUrl).toBe("/account");
  });
});
