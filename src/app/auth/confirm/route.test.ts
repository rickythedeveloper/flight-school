import { describe, expect, jest, test } from "@jest/globals";
import { NextRequest, NextResponse } from "next/server";
import type { NextURL } from "next/dist/server/web/next-url";
import { createSupabaseServerClient } from "@/supabase/server";
import { GET } from "@/app/auth/confirm/route";

jest.mock("@/supabase/server", () => ({
  __esModule: true,
  createSupabaseServerClient: jest.fn(),
}));
const createSupabaseServerClientMock = createSupabaseServerClient as jest.Mock;

jest.mock("next/server", () => {
  return {
    __esModule: true,
    ...(jest.requireActual("next/server") as any),
    NextResponse: {
      redirect: jest.fn(),
      next: jest.fn(),
    },
  };
});
const redirectMock = NextResponse.redirect as jest.Mock;

describe("authConfirmRoute", () => {
  test("calls supabase with provided type and token hash", async () => {
    const request = new NextRequest(
      "http://localhost:3000/auth/confirm?type=email&token_hash=123456",
    );
    const mockSupabaseClient = getSupabaseClientMockWithVerifyOtpError(null);
    createSupabaseServerClientMock.mockReturnValue(mockSupabaseClient);

    await GET(request);

    expect(mockSupabaseClient.auth.verifyOtp).toHaveBeenCalledWith({
      type: "email",
      token_hash: "123456",
    });
  });

  test("redirects to account if verification succeeds", async () => {
    const request = new NextRequest(
      "http://localhost:3000/auth/confirm?type=email&token_hash=123456",
    );
    const mockSupabaseClient = getSupabaseClientMockWithVerifyOtpError(null);
    createSupabaseServerClientMock.mockReturnValue(mockSupabaseClient);

    await GET(request);

    expect(mockSupabaseClient.auth.verifyOtp).toHaveBeenCalledWith({
      type: "email",
      token_hash: "123456",
    });

    const redirectUrl = redirectMock.mock.calls[0][0] as NextURL;
    expect(redirectUrl.pathname).toBe("/account");
  });

  test("redirects to error if verification fails", async () => {
    const request = new NextRequest(
      "http://localhost:3000/auth/confirm?type=email&token_hash=123456",
    );
    const mockSupabaseClient =
      getSupabaseClientMockWithVerifyOtpError("some-error");
    createSupabaseServerClientMock.mockReturnValue(mockSupabaseClient);

    await GET(request);

    expect(mockSupabaseClient.auth.verifyOtp).toHaveBeenCalledWith({
      type: "email",
      token_hash: "123456",
    });

    const redirectUrl = redirectMock.mock.calls[0][0] as NextURL;
    expect(redirectUrl.pathname).toBe("/error");
  });
});

const getSupabaseClientMockWithVerifyOtpError = (
  error: any,
): { auth: { verifyOtp: jest.Mock } } => ({
  auth: {
    verifyOtp: jest.fn().mockReturnValue({ error }),
  },
});
