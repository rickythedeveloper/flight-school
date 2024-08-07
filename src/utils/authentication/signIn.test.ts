import { describe, expect, jest, test } from "@jest/globals";
import { redirect } from "next/navigation";
import { signIn } from "@/utils/authentication/signIn";
import { createSupabaseServerClient } from "@/supabase/server";
import type { AuthenticationCredential } from "@/utils/authentication/AuthenticationCredential";

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

describe("signIn", () => {
  test("redirect to login page if sign in fails", async () => {
    const signInWithPasswordMock = mockSignInWithPasswordError("some-error");

    await signIn(validCredentials);

    expect(signInWithPasswordMock).toHaveBeenCalledWith(validCredentials);
    const redirectUrl = redirectMock.mock.calls[0][0];
    expect(redirectUrl).toBe("/login?message=Could not authenticate user");
  });

  test("redirects to account if sign in succeeds", async () => {
    const signInWithPasswordMock = mockSignInWithPasswordError(null);

    await signIn(validCredentials);

    expect(signInWithPasswordMock).toHaveBeenCalledWith(validCredentials);
    const redirectUrl = redirectMock.mock.calls[0][0];
    expect(redirectUrl).toBe("/account");
  });
});

const mockSignInWithPasswordError = (
  error: any,
): jest.MockedFunction<() => Promise<any>> => {
  const signInWithPasswordMock = jest
    .fn<() => Promise<any>>()
    .mockResolvedValue({ error });

  createSupabaseServerClientMock.mockReturnValue({
    auth: {
      signInWithPassword: signInWithPasswordMock,
    },
  });

  return signInWithPasswordMock;
};
