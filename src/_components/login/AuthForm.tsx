"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import _ from "lodash";
import { ChangeEvent, useState } from "react";
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

type Props = {
  type: "signin" | "signup";
};

const omitted = (type: "signin" | "signup") =>
  type === "signin" ? ["passwordConfirm"] : [];

export default function AuthForm({ type }: Props) {
  const authData = _.omit(auth, omitted(type));
  type AuthDataOmitted = Omit<AuthDataType, ReturnType<typeof omitted>[number]>;

  // formData의 타입은, 남아 있는 키들만 string으로 매핑
  const [formData, setFormData] = useState<{
    [K in keyof AuthDataOmitted]: string;
  }>(
    () =>
      _.mapValues(authData, _.constant("")) as {
        [K in keyof AuthDataOmitted]: string;
      },
  );

  const handleChangeValue =
    (type: keyof AuthDataOmitted) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [type]: e.target.value }));
    };

  const handleAuth = () => {
    if (type === "signin") {
    } else if (type === "signup") {
    }
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleAuth}>
      {_.map(authData, (value, key) => (
        <div key={key} className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor={key}>{value?.label}</Label>
          <Input
            type={value?.type}
            id={key}
            placeholder={value?.placeholder}
            value={formData[key as keyof AuthDataOmitted]}
            onChange={handleChangeValue(key as keyof AuthDataOmitted)}
          />
        </div>
      ))}
      <button></button>
    </form>
  );
}
