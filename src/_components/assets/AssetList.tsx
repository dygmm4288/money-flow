"use client";

import { Separator } from "@/components/ui/separator";
import { Edit3, X } from "lucide-react";
import React from "react";
import client from "@/lib/supabase/client/client";
interface AssetListProps {
  icon: React.ReactNode;
  totalAmount: number;
  typeName: string;
  assetData: {
    name: string;
    amount: number;
    id: string;
  }[];
}

export default function AssetList({
  icon,
  totalAmount,
  typeName,
  assetData,
}: AssetListProps) {
  const deleteAssetHandler = async (id: number) => {
    try {
      await client.from("assets").delete().eq("id", id);
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            {icon}
            {typeName}
          </h2>
          <p
            className={`${
              totalAmount > 0 ? "text-black" : "text-red-600"
            } font-semibold`}>
            Total: {totalAmount.toLocaleString()} 원
          </p>
        </div>
        <Separator />
        <ul className="flex flex-col gap-2">
          {assetData.map((asset) => (
            <li className="flex items-center justify-between" key={asset.name}>
              <span>{asset.name}</span>
              <div className="flex ">
                <span>{asset.amount.toLocaleString()} 원</span>
                <Edit3 className="cursor-pointer" />
                <X
                  className="cursor-pointer"
                  onClick={() => deleteAssetHandler(asset.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
