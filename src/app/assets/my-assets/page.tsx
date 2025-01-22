import AssetClient from "@/_components/assets/AssetClient";
import { get } from "@/lib/supabase/server/get";

export default async function Page() {
  const { data } = await get("assets");
  return <AssetClient assetData={data || []} />;
}
