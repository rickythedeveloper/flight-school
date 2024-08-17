import { describe, expect, jest, test } from "@jest/globals";
import { headers } from "next/headers";
import { signUpAction } from "@/serverActions/authentication/signUpAction";
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

const validCredentials: AuthCredential = {
  email: "test@example.com",
  password: "testPassword",
};

describe("signUp", () => {
  test("returns failure if sign up fails", async () => {
    mockHeaders({ origin: "localhost:3000" });
    signUpMock.mockResolvedValue({ isSuccess: false });

    const result = await signUpAction(validCredentials);

    expect(signUpMock).toHaveBeenCalledWith(
      validCredentials,
      "localhost:3000/auth/callback",
    );
    expect(result).toStrictEqual({ isSuccess: false, error: undefined });
  });

  test("returns success if sign up succeeds", async () => {
    mockHeaders({ origin: "localhost:3000" });
    signUpMock.mockResolvedValue({ isSuccess: true });

    const result = await signUpAction(validCredentials);

    expect(signUpMock).toHaveBeenCalledWith(
      validCredentials,
      "localhost:3000/auth/callback",
    );
    expect(result).toStrictEqual({
      isSuccess: true,
      data: { action: "checkEmail" },
    });
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
