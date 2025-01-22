"use client";

import AssetList from "@/_components/assets/AssetList";
import { Banknote, CreditCard, PiggyBankIcon } from "lucide-react";

export interface AssetType {
  id: number;
  created_at: string;
  updated_at: string;
  type: "은행" | "카드" | "저축";
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

export default function AssetClient({ assetData }: { assetData: AssetType[] }) {
  const filterByAssetTypes = {
    banks: assetData?.filter((item: AssetType) => item.type === "은행") || [],
    cards: assetData?.filter((item: AssetType) => item.type === "카드") || [],
    savings: assetData?.filter((item: AssetType) => item.type === "저축") || [],
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
            type: item.type,
          }))}
        />
      ))}
    </div>
  );
}
