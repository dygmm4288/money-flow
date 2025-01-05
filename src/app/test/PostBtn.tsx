"use client";

import { postClient } from "@/lib/supabase/client/post";

export default function PostBtn() {
  const handlePost = async () => {
    await postClient("pay", {
      amount: 11000,
      category: "식비",
      type: "expense",
      date: "2025-01-05",
      location: "황제중화요리",
      tags: ["불짬뽕"],
    });
  };
  return <button onClick={handlePost}>포스트</button>;
}
