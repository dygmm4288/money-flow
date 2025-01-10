import { Separator } from "@/components/ui/separator";
import React from "react";

interface AssetListProps {
  icon: React.ReactNode;
  totalAmount: number;
  categoryName: string;
}

export default function AssetList({
  icon,
  totalAmount,
  categoryName,
}: AssetListProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            {icon}
            {categoryName}
          </h2>
          <p
            className={`${
              totalAmount > 0 ? "text-black" : "text-red-600"
            } font-semibold`}>
            Total: {totalAmount.toLocaleString()}원
          </p>
        </div>
        <Separator />
        {/* <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between">
            <span>카카오뱅크</span>
            <span>2,000,000</span>
          </li>
          <li className="flex items-center justify-between">
            <span>국민은행</span>
            <span>1,000,000</span>
          </li>
        </ul> */}
      </div>
    </div>
  );
}
