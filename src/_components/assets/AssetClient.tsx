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
  card: number | null; // 카드 테이블의 id
}

const assetTypes: {
  icon: React.ReactNode;
  typeId: string;
  type: "은행" | "카드" | "저축";
}[] = [
  {
    typeId: "banks",
    type: "은행",
    icon: <Banknote />,
  },
  {
    typeId: "cards",
    type: "카드",
    icon: <CreditCard />,
  },
  {
    typeId: "savings",
    type: "저축",
    icon: <PiggyBankIcon />,
  },
];

export default function AssetClient({ assetData }: { assetData: AssetType[] }) {
  const filterByAssetTypes = {
    banks: assetData?.filter((item: AssetType) => item.type === "은행") || [],
    cards: assetData?.filter((item: AssetType) => item.type === "카드") || [],
    savings: assetData?.filter((item: AssetType) => item.type === "저축") || [],
  };

  const calculateTotalAmount = (items: AssetType[]) =>
    items.reduce((total, item) => total + item.amount, 0);

  return (
    <div className="flex flex-col gap-10 mr-1">
      {assetTypes.map((asset) => (
        <AssetList
          key={asset.typeId}
          icon={asset.icon}
          type={asset.type}
          totalAmount={calculateTotalAmount(
            filterByAssetTypes[asset.typeId as keyof typeof filterByAssetTypes]
          )}
          assetData={filterByAssetTypes[
            asset.typeId as keyof typeof filterByAssetTypes
          ].map((item) => ({
            id: item.id,
            type: item.type,
            name: item.name,
            amount: item.amount,
            card: item.card || null,
          }))}
        />
      ))}
    </div>
  );
}
