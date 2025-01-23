import React from "react";
import AssetForm from "./AssetForm";
import { X } from "lucide-react";

interface AssetItemProps {
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
  cardData?: {
    id: number;
    created_at: string;
    name: JSON;
    asset: number;
  }[];
}

export default function AssetItem({
  assetData,
  bankData,
  cardData,
}: AssetItemProps) {
  const deleteAssetHandler = async (id: number) => {
    try {
      await fetch("/api/assets", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <ul className="flex flex-col gap-2">
      {assetData.map((asset) => (
        <li className="flex items-center justify-between" key={asset.name}>
          <span>{asset.name}</span>
          <div className="flex ">
            <span>{asset.amount.toLocaleString()} 원</span>
            <AssetForm
              isEditMode={true}
              bankData={bankData}
              cardData={cardData}
              assetData={{
                id: asset.id,
                name: asset.name,
                amount: asset.amount,
                type: asset.type,
                card: asset.card,
              }}
            />
            <X
              className="cursor-pointer"
              onClick={() => deleteAssetHandler(Number(asset.id))}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
