import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AuthForm from "./AuthForm";
import SocialBtn from "./SocialBtn";

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
            <SocialBtn type='google' />
            <SocialBtn type='kakao' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
