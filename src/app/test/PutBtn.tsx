"use client";
import { putClient } from "@/lib/supabase/client/put";

export default function PutBtn() {
  const handlePost = async () => {
    await putClient("pay", 4, {
      amount: 15000,
      tags: ["굴짬뽕"],
    });
  };
  return <button onClick={handlePost}>수정</button>;
}
