"use server";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export const signInHandler = async (formData: FormData, nextPath?: string) => {
  const supabase = await createClient();

  let platform = "email";

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
          },
        });

      if (oAuthLoginError) {
        throw oAuthLoginError;
      }
      return;
    }
    default:
      throw new Error("LoginError: 올바른 케이스가 아닙니다.");
  }
};
