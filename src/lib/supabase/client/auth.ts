import { ForgetPasswordMessageType } from "@/lib/types/auth.types";
import client from "./client";

/**
 * Supabase 회원가입을 위한 함수
 * @param string email - 회원가입에 사용할 email
 * @param string password - 회원가입에 사용할 password
 */
export interface SignUpHandlerArgs {
  email: string;
  password: string;
}

export const signUpHandler = async ({ email, password }: SignUpHandlerArgs) => {
  const { error: signUpError } = await client.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    throw signUpError;
  }
};

/**
 * Supabase 로그인을 위한 함수
 * @param string email - 로그인에 사용할 email (선택적 입력가능)
 * @param string password - 로그인에 사용할 password (선택적 입력가능)
 * @param LoginPlatformType(string union) platform - 로그인 방식
 */
export type SignInPlatformType = "email" | "google" | "kakao" | "github";

interface SignInHandlerArgs {
  email?: string;
  password?: string;
  platform: SignInPlatformType;
}

export const signInHandler = async ({
  email,
  password,
  platform,
}: SignInHandlerArgs) => {
  switch (platform) {
    case "email": {
      const { data: emailLoginData, error: emailLoginError } =
        await client.auth.signInWithPassword({
          email: email!,
          password: password!,
        });

      if (emailLoginError) {
        throw emailLoginError;
      }
      return emailLoginData;
    }
    case "google":
    case "kakao":
    case "github": {
      const { data: oAuthLoginData, error: oAuthLoginError } =
        await client.auth.signInWithOAuth({
          provider: platform,
          options: {
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        });

      if (oAuthLoginError) {
        throw oAuthLoginError;
      }
      return oAuthLoginData;
    }
    default:
      throw new Error("LoginError: 올바른 케이스가 아닙니다.");
  }
};

/**
 * Supabase 로그아웃을 위한 함수
 */
export const logoutHandler = async () => {
  const { error } = await client.auth.signOut();
  if (error) {
    throw error;
  }
};

/**
 * 비밀번호 찾기 메일을 보내는 함수
 * @param string email - 대상 email
 * @returns string,string - 인증메일 송신 여부 메시지
 */
export const forgottenPasswordHandler = async (
  userEmail: string,
): Promise<{ response: ForgetPasswordMessageType; message: string }> => {
  // (1) 등록된 유저인지 확인
  const { data: checkUserData, error: checkUserError } = await client
    .from("users")
    .select(`*`)
    .eq("email", userEmail);

  if (checkUserError) {
    throw checkUserError;
  }

  if (checkUserData.length) {
    const { error: sendMailError } = await client.auth.resetPasswordForEmail(
      userEmail,
      {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL,
      },
    );
    if (sendMailError) {
      throw sendMailError;
    }
    return {
      response: "success",
      message: `${userEmail} 계정에 메일을 발송하였습니다. 
      확인 후 비밀번호를 초기화하세요.`,
    };
  }
  return { response: "fail", message: "등록되지 않은 유저입니다." };
};

// 비밀번호를 변경시키는 함수
export const updateUserPasswordHandler = async (newPw: string) => {
  const { data, error } = await client.auth.updateUser({
    password: newPw,
  });
  if (error) {
    throw error;
  }
  return data;
};

// 현재유저의 세션을 가져오는 함수
export const getSession = async () => {
  const { data, error } = await client.auth.getSession();
  if (error) {
    throw error;
  }
  return data;
};
