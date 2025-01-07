import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import _ from "lodash";
import Logo from "../common/Logo";
import AuthForm from "./AuthForm";

export default function SignUp() {
  return (
    <Card>
      <div className='flex justify-center items-center my-6 gap-3'>
        <Logo width={36} height={36} />
        <h1 className='text-2xl'>{_.upperCase("money-flow")}</h1>
      </div>
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>
          이메일과 비밀번호를 입력하여 회원가입 하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm type='signup' />
        <Separator />
      </CardContent>
    </Card>
  );
}
