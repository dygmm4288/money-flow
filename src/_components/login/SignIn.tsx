import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import AuthForm from "./AuthForm";

export default function SignIn() {
  return (
    <Card className='flex flex-col space-y-5 w-1/2'>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>
          이메일과 비밀번호를 입력하여 로그인 하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm type='signin' />
        <Separator className='my-4' />
        <div>
          <div className='space-y-1.5'>
            <CardTitle>소셜로그인</CardTitle>
            <CardDescription>
              소셜로그인을 통해 간편하게 로그인 하세요
            </CardDescription>
          </div>
          <div className='flex flex-col gap-5 my-6 space-y-1.5'>
            <Button className='w-full bg-white'>
              <Image
                width='12'
                height='12'
                alt='google login logo'
                src='/assets/auth/google.svg'
              />
              구글로 로그인하기
            </Button>
            <Button className='w-full bg-[#fae100] hover:bg-[#fae10090]'>
              <Image
                width='16'
                height='16'
                alt='kakao login logo'
                src='/assets/auth/kakao.svg'
              />
              카카오로 로그인하기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
