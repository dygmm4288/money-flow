import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthForm from "./AuthForm";

export default function SignIn() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>
          이메일과 비밀번호를 입력하여 로그인 하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm type='signin' />
      </CardContent>
    </Card>
  );
}
