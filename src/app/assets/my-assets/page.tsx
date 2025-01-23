import AssetClient from "@/_components/assets/AssetClient";
import { get } from "@/lib/supabase/server/get";

export default async function Page() {
  const { data: assets } = await get("assets");
  const { data: cards } = await get("cards");

  return <AssetClient assetData={assets || []} cardData={cards || []} />;
}
