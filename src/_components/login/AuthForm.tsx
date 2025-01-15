"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInHandler } from "@/lib/supabase/server/auth";
import { convertError } from "@/lib/utils/auth";
import _ from "lodash";
import { MailOpen } from "lucide-react";
import { FormEvent, useState } from "react";

type Props = {
  type: "signin" | "signup";
  nextPath?: string;
};

const omitByType = (type: "signin" | "signup") =>
  type === "signin" ? ["passwordConfirm"] : [];

const AUTH = {
  email: {
    key: "email",
    name: "email",
    type: "email",
    placeholder: "이메일을 입력해 주세요",
    label: "이메일",
  },
  password: {
    key: "password",
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해 주세요",
    label: "비밀번호",
  },
  passwordConfirm: {
    key: "passwordConfirm",
    name: "passwordConfirm",
    type: "password",
    placeholder: "비밀번호를 다시 입력해 주세요",
    label: "비밀번호 확인",
  },
};

export default function AuthForm({ type, nextPath }: Props) {
  const authData = _.omit(AUTH, omitByType(type));
  const btnLabel = type === "signup" ? "회원가입하기" : "로그인하기";
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signInHandler(formData, nextPath);

    if (res) {
      setError(convertError(res));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setError(null)}
      className={
        !error ? "flex flex-col gap-5" : "flex flex-col gap-5 animate-wiggle"
      }>
      {_.map(authData, (value) => (
        <div key={value?.key} className='grid w-full items-center gap-1.5'>
          <Label htmlFor={value?.key}>{value?.label}</Label>
          <Input
            id={value?.key}
            type={value?.type}
            name={value?.name}
            placeholder={value?.placeholder}
            required
          />
        </div>
      ))}
      <p className='text-rose-500 text-sm'>{error}</p>
      <Button type='submit'>
        <MailOpen /> {btnLabel}
      </Button>
    </form>
  );
}
