import SignIn from "@/_components/login/SignIn";
import SignUp from "@/_components/login/SignUp";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await searchParams;

  if (!type) {
    redirect("/login?type=signin");
  }

  return (
    <section className='w-full min-h-screen flex justify-center items-center'>
      {type === "signin" && <SignIn />}
      {type === "signup" && <SignUp />}
    </section>
  );
}
