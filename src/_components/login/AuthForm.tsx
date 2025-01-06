"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInHandler } from "@/lib/supabase/client/auth";
import { AuthApiError } from "@supabase/supabase-js";
import _ from "lodash";
import { MailOpen } from "lucide-react";
import { ChangeEvent, FormEvent, LegacyRef, useRef, useState } from "react";
/**
 * 1) 각 필드 구조를 나타내는 타입
 */
type AuthField = {
  label: string;
  placeholder: string;
  type: string;
};

/**
 * 2) 필드 이름을 유니언으로 정의
 */
type AuthFields = "email" | "password" | "passwordConfirm";

/**
 * 3) auth 객체의 전체 타입
 */
type AuthDataType = Record<AuthFields, AuthField>;

/**
 * 실제 auth 객체
 */
const auth: AuthDataType = {
  email: {
    label: "이메일",
    placeholder: "example@example.com",
    type: "email",
  },
  password: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    type: "password",
  },
  passwordConfirm: {
    label: "비밀번호 확인",
    placeholder: "비밀번호를 다시 입력해주세요",
    type: "password",
  },
};

type AuthDataPartial = Partial<AuthDataType>;
type AuthDataObject = { [K in keyof AuthDataPartial]: string };

type Props = {
  type: "signin" | "signup";
};

const omitted = (type: "signin" | "signup") =>
  type === "signin" ? ["passwordConfirm"] : [];

export default function AuthForm({ type }: Props) {
  const authData = _.omit(auth, omitted(type));

  // formData의 타입은, 남아 있는 키들만 string으로 매핑
  const [formData, setFormData] = useState<AuthDataObject>(
    _.mapValues(authData, _.constant("")),
  );
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState("");

  const handleChangeValue =
    (type: keyof AuthDataPartial) => (e: ChangeEvent<HTMLInputElement>) => {
      if (error) setError("");
      setFormData((prev) => ({ ...prev, [type]: e.target.value }));
    };

  const handleAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "signin") {
      signInHandler({
        email: formData.email,
        password: formData.password,
        platform: "email",
      }).catch((err: AuthApiError) => {
        console.log(err.message);
        setFormData({ email: "", password: "" });
        if (err.message === "Invalid login credentials") {
          setError("올바르지 않은 정보입니다");
        }

        if (emailRef.current) emailRef.current.focus();
      });
    } else if (type === "signup") {
    }
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleAuth}>
      {_.map(authData, (value, key) => (
        <div key={key} className='grid w-full items-center gap-1.5'>
          <Label htmlFor={key}>{value?.label}</Label>
          <Input
            ref={
              key === "email"
                ? (emailRef as LegacyRef<HTMLInputElement>)
                : undefined
            }
            type={value?.type}
            id={key}
            placeholder={value?.placeholder}
            value={formData[key as keyof AuthDataPartial]}
            onChange={handleChangeValue(key as keyof AuthDataPartial)}
          />
        </div>
      ))}
      <p className='text-rose-500 text-sm'>{error}</p>
      <Button type='submit'>
        <MailOpen /> 이메일로 로그인하기
      </Button>
    </form>
  );
}
