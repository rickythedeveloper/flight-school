import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import type { NextURL } from "next/dist/server/web/next-url";
import { updateSession } from "@/supabase/middleware";
import { getEnvironment } from "@/utils/environment/environment";

jest.mock("@supabase/ssr");
const createServerClientMock = createServerClient as jest.Mock;

jest.mock("@/utils/environment/environment");
const getEnvironmentMock = getEnvironment as jest.Mock;

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

describe("supabaseMiddleware", () => {
  beforeEach(() => {
    getEnvironmentMock.mockReturnValue({
      supabase: {
        url: "supabase-url",
        anonKey: "supabase-anon-key",
      },
    });
  });

  test("redirects to login if unauthenticated", async () => {
    createServerClientMock.mockReturnValue({
      auth: {
        getUser: () => Promise.resolve({ data: { user: null } }),
      },
    });

    const request = new NextRequest("http://localhost:3000/next-path");

    await updateSession(request);

    const redirectUrl = redirectMock.mock.calls[0][0] as NextURL;
    expect(redirectUrl.pathname).toBe("/login");
  });

  test("redirects to next page if authenticated", async () => {
    createServerClientMock.mockReturnValue({
      auth: {
        getUser: () => Promise.resolve({ data: { user: {} } }),
      },
    });

    const request = new NextRequest("http://localhost:3000/next-path");

    await updateSession(request);

    expect(NextResponse.redirect).not.toHaveBeenCalled();
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
