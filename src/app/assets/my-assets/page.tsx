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
  const filterByAssetTypes = {
    banks: data?.filter((item: AssetType) => item.type === "은행") || [],
    cards: data?.filter((item: AssetType) => item.type === "카드") || [],
    savings: data?.filter((item: AssetType) => item.type === "저축") || [],
  };

  const calculateTotal = (items: AssetType[]) =>
    items.reduce((total, item) => total + item.amount, 0);

  return (
    <div className="flex flex-col gap-10 mr-1">
      {assetTypes.map((asset) => (
        <AssetList
          key={asset.type}
          icon={asset.icon}
          typeName={asset.typeName}
          totalAmount={calculateTotal(
            filterByAssetTypes[asset.type as keyof typeof filterByAssetTypes]
          )}
          assetData={filterByAssetTypes[
            asset.type as keyof typeof filterByAssetTypes
          ].map((item) => ({
            name: item.name,
            amount: item.amount,
            id: item.id,
          }))}
        />
      ))}
    </div>
  );
}
