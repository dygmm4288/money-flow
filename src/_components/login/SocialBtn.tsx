"use client";
import { Button } from "@/components/ui/button";
import { signInHandler } from "@/lib/supabase/server/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  type: "kakao" | "google";
  nextPath?: string;
};

const SOCIAL_BTN = {
  kakao: {
    width: 16,
    height: 16,
    alt: "kakao login logo",
    src: "/assets/auth/kakao.svg",
    text: "카카오로 로그인하기",
    bgClass: "bg-[#fae100] hover:bg-[#fae10090]",
  },
  google: {
    src: "/assets/auth/google.svg",
    alt: "google login logo",
    width: 12,
    height: 12,
    text: "구글로 로그인하기",
    bgClass: "bg-white",
  },
};
export default function SocialBtn({ type, nextPath }: Props) {
  const social = SOCIAL_BTN[type];

  const handleSocialSign = async () => {
    await signInHandler(new FormData(), nextPath, type);
  };

  return (
    <Button className={cn("w-full", social.bgClass)} onClick={handleSocialSign}>
      <Image
        alt={social.alt}
        src={social.src}
        width={social.width}
        height={social.height}
      />
      {social.text}
    </Button>
  );
}
