"use client";

import { Separator } from "@/components/ui/separator";
import React, { useMemo } from "react";
import AssetType from "./AssetType";
import AssetItem from "./AssetItem";
interface AssetListProps {
  icon: React.ReactNode;
  totalAmount: number;
  type: "은행" | "카드" | "저축";
  bankData?: {
    id: number;
    name: string;
    amount: number;
    type: "은행" | "카드" | "저축";
    card: number | null;
  }[];
  assetData: {
    id: number;
    name: string;
    amount: number;
    type: "은행" | "카드" | "저축";
    card: number | null;
  }[];
  cardData: {
    id: number;
    created_at: string;
    name: JSON;
    asset: number;
  }[];
}

export default function AssetList({
  icon,
  totalAmount,
  type,
  bankData,
  assetData,
  cardData,
}: AssetListProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-5">
        <AssetType icon={icon} type={type} totalAmount={totalAmount} />
        <Separator />
        <AssetItem
          assetData={assetData}
          bankData={bankData}
          cardData={cardData}
        />
      </div>
    </div>
  );
}
