import { describe, expect, jest, test } from "@jest/globals";
import { NextRequest, NextResponse } from "next/server";
import type { NextURL } from "next/dist/server/web/next-url";
import { GET } from "@/app/auth/confirm/route";
import type { VerifyOtp } from "@/services/serverAuthService/serverAuthService";
import { serverAuthService } from "@/services/serverAuthService/injection";

jest.mock("@/services/serverAuthService/injection", () => ({
  serverAuthService: {
    verifyOtp: jest.fn(),
  },
}));
const verifyOtpMock =
  serverAuthService.verifyOtp as jest.MockedFunction<VerifyOtp>;

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
    verifyOtpMock.mockResolvedValue({ isSuccess: true });

    await GET(request);

    expect(verifyOtpMock).toHaveBeenCalledWith("email", "123456");
  });

  test("redirects to account if verification succeeds", async () => {
    const request = new NextRequest(
      "http://localhost:3000/auth/confirm?type=email&token_hash=123456",
    );
    verifyOtpMock.mockResolvedValue({ isSuccess: true });

    await GET(request);

    expect(verifyOtpMock).toHaveBeenCalledWith("email", "123456");

    const redirectUrl = redirectMock.mock.calls[0][0] as NextURL;
    expect(redirectUrl.pathname).toBe("/account");
  });

  test("redirects to error if verification fails", async () => {
    const request = new NextRequest(
      "http://localhost:3000/auth/confirm?type=email&token_hash=123456",
    );
    verifyOtpMock.mockResolvedValue({ isSuccess: false });

    await GET(request);

    expect(verifyOtpMock).toHaveBeenCalledWith("email", "123456");

    const redirectUrl = redirectMock.mock.calls[0][0] as NextURL;
    expect(redirectUrl.pathname).toBe("/error");
  });
});
