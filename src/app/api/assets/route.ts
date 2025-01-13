import client from "@/lib/supabase/client/client";
import { postClient } from "@/lib/supabase/client/post";

export const handleAddAsset = async () => {
  try {
    const model = "assets";
    const data = {
      id: 100,
      created_at: "2025-10-10",
      updated_at: "2025-10-10",
      type: null,
      amount: 230000,
      name: "카카오",
      card: 10,
      user: "test",
    };

    await postClient(model, data);
  } catch (error) {
    console.log(error);
  }
};
