"use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server/server";
import _ from "lodash";
import Link from "next/link";
import Logo from "../common/Logo";
import AuthForm from "./AuthForm";
import SocialBtn from "./SocialBtn";

export default async function SignIn({ nextPath }: { nextPath?: string }) {
  const supabase = await createClient();

  console.log(await supabase.auth.getUser());
  return (
    <Card className='flex flex-col w-1/2'>
      <div className='flex justify-center items-center my-6 gap-3'>
        <Logo width={36} height={36} />
        <h1 className='text-2xl'>{_.upperCase("money-flow")}</h1>
      </div>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>
          이메일과 비밀번호를 입력하여 로그인 하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm type='signin' nextPath={nextPath} />
        <Separator className='my-4' />
        <div>
          <div className='space-y-1.5'>
            <CardTitle>소셜로그인</CardTitle>
            <CardDescription>
              소셜로그인을 통해 간편하게 로그인 하세요
            </CardDescription>
          </div>
          <div className='flex flex-col gap-5 my-6 space-y-1.5'>
            <SocialBtn type='google' nextPath={nextPath} />
            <SocialBtn type='kakao' nextPath={nextPath} />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-row justify-end'>
        <Link href='/login?type=signup' className='underline'>
          회원가입 하러가기
        </Link>
      </CardFooter>
    </Card>
  );
}
