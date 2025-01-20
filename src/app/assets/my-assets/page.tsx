import AssetClient from "@/_components/assets/AssetClient";
import AssetList from "@/_components/assets/AssetList";
import { get } from "@/lib/supabase/server/get";
import { Banknote, CreditCard, PiggyBankIcon } from "lucide-react";

export interface AssetType {
  id: string;
  created_at: string;
  updated_at: string;
  type: string;
  amount: number;
  name: string;
  card: string | null;
}

const assetTypes = [
  {
    type: "banks",
    typeName: "은행",
    icon: <Banknote />,
  },
  {
    type: "cards",
    typeName: "카드",
    icon: <CreditCard />,
  },
  {
    type: "savings",
    typeName: "저축",
    icon: <PiggyBankIcon />,
  },
];

export default async function Page() {
  const { data } = await get("assets");
  return <AssetClient assetData={data || []} />;
}
