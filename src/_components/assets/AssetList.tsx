"use client";

import { Separator } from "@/components/ui/separator";
import React, { useMemo } from "react";
import AssetType from "./AssetType";
import AssetItem from "./AssetItem";
interface AssetListProps {
  icon: React.ReactNode;
  totalAmount: number;
  type: "은행" | "카드" | "저축";
  assetData: {
    id: number;
    name: string;
    amount: number;
    type: "은행" | "카드" | "저축";
    card: number | null;
  }[];
}

export default function AssetList({
  icon,
  totalAmount,
  type,
  assetData,
}: AssetListProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-5">
        <AssetType icon={icon} type={type} totalAmount={totalAmount} />
        <Separator />
        <AssetItem assetData={assetData} />
      </div>
    </div>
  );
}
