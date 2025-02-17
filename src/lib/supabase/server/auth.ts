"use server";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export const signInHandler = async (
  formData: FormData,
  nextPath?: string,
  platform = "email",
) => {
  const supabase = await createClient();

  switch (platform) {
    case "email": {
      const { error: emailLoginError } = await supabase.auth.signInWithPassword(
        {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        },
      );

      if (emailLoginError) {
        return emailLoginError.code;
      }
      if (nextPath) {
        redirect(nextPath);
      }

      redirect("/dashboard");
    }
    case "google":
    case "kakao":
    case "github": {
      const { data: oAuthLoginData, error: oAuthLoginError } =
        await supabase.auth.signInWithOAuth({
          provider: platform,
          options: {
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
            redirectTo: "http://localhost:3000/api/auth/callback",
          },
        });
      if (oAuthLoginError) {
        return oAuthLoginError.code;
      }
      redirect(oAuthLoginData.url);
    }
    default:
      throw new Error("LoginError: 올바른 케이스가 아닙니다.");
  }
};

export const signUpHandler = async (formData: FormData) => {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return signUpError.code;
  }

  return null;
};

export const logoutHandler = async () => {
  const supabase = await createClient();

  const error = await supabase.auth.signOut();

  if (error) return error;

  return null;
};

export const getUser = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) redirect("/login?type=signin");

  const user = { email: data.user.email! };

  return user;
};
