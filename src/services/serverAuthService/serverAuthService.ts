export interface AuthCredential {
  email: string;
  password: string;
}

interface SignInResult {
  isSuccess: boolean;
}

interface SignUpResult {
  isSuccess: boolean;
}

interface VerifyOtpResult {
  isSuccess: boolean;
}

export type SignIn = (credential: AuthCredential) => Promise<SignInResult>;
export type SignUp = (
  credential: AuthCredential,
  redirectUrl: string,
) => Promise<SignUpResult>;
export type VerifyOtp = (
  type: "email",
  tokenHash: string,
) => Promise<VerifyOtpResult>;

export interface ServerAuthService {
  signIn: SignIn;
  signUp: SignUp;
  verifyOtp: VerifyOtp;
}
