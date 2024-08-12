import { describe, expect, jest, test } from "@jest/globals";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { signUp } from "@/serverActions/authentication/signUp";
import type {
  AuthCredential,
  SignUp,
} from "@/services/serverAuthService/serverAuthService";

import { serverAuthService } from "@/services/serverAuthService/injection";

jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));
const headersMock = headers as jest.Mock;

jest.mock("@/services/serverAuthService/injection", () => ({
  serverAuthService: {
    signUp: jest.fn(),
  },
}));
const signUpMock = serverAuthService.signUp as jest.MockedFunction<SignUp>;

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
const redirectMock = redirect as jest.MockedFunction<(url: string) => never>;

const validCredentials: AuthCredential = {
  email: "test@example.com",
  password: "testPassword",
};

describe("signUp", () => {
  test("redirect to login page with error message if sign up fails", async () => {
    mockHeaders({ origin: "localhost:3000" });
    signUpMock.mockResolvedValue({ isSuccess: false });

    await signUp(validCredentials);

    expect(signUpMock).toHaveBeenCalledWith(
      validCredentials,
      "localhost:3000/auth/callback",
    );
    const redirectUrl = redirectMock.mock.calls[0][0];
    expect(redirectUrl).toBe("/login?message=Could not authenticate user");
  });

  test("redirects to login page with success message if sign in succeeds", async () => {
    mockHeaders({ origin: "localhost:3000" });
    signUpMock.mockResolvedValue({ isSuccess: true });

    await signUp(validCredentials);

    expect(signUpMock).toHaveBeenCalledWith(
      validCredentials,
      "localhost:3000/auth/callback",
    );
    const redirectUrl = redirectMock.mock.calls[0][0];
    expect(redirectUrl).toBe(
      "/login?message=Check email to continue sign in process",
    );
  });
});

const mockHeaders = ({ origin }: { origin?: string }): void => {
  headersMock.mockReturnValue({
    get: (name: string) => {
      if (name === "origin") return origin;
      return undefined;
    },
  });
};
