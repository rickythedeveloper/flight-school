import { describe, expect, jest, test } from "@jest/globals";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/supabase/server";
import type { AuthenticationCredential } from "@/utils/authentication/AuthenticationCredential";
import { signUp } from "@/utils/authentication/signUp";

jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));
const headersMock = headers as jest.Mock;

jest.mock("@/supabase/server", () => ({
  __esModule: true,
  createSupabaseServerClient: jest.fn(),
}));
const createSupabaseServerClientMock = createSupabaseServerClient as jest.Mock;

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
const redirectMock = redirect as jest.MockedFunction<(url: string) => never>;

const validCredentials: AuthenticationCredential = {
  email: "test@example.com",
  password: "testPassword",
};

describe("signUp", () => {
  test("redirect to login page with error message if sign up fails", async () => {
    mockHeaders({ origin: "localhost:3000" });
    const signUpMock = mockSignUpError("some-error");

    await signUp(validCredentials);

    expect(signUpMock).toHaveBeenCalledWith({
      ...validCredentials,
      options: { emailRedirectTo: "localhost:3000/auth/callback" },
    });
    const redirectUrl = redirectMock.mock.calls[0][0];
    expect(redirectUrl).toBe("/login?message=Could not authenticate user");
  });

  test("redirects to login page with success message if sign in succeeds", async () => {
    mockHeaders({ origin: "localhost:3000" });
    const signUpMock = mockSignUpError(null);

    await signUp(validCredentials);

    expect(signUpMock).toHaveBeenCalledWith({
      ...validCredentials,
      options: { emailRedirectTo: "localhost:3000/auth/callback" },
    });
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

const mockSignUpError = (
  error: any,
): jest.MockedFunction<() => Promise<any>> => {
  const signUpMock = jest.fn<() => Promise<any>>().mockResolvedValue({ error });

  createSupabaseServerClientMock.mockReturnValue({
    auth: {
      signUp: signUpMock,
    },
  });

  return signUpMock;
};
