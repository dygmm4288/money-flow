import React from "react";

interface AssetTypeProps {
  icon: React.ReactNode;
  totalAmount: number;
  type: "은행" | "카드" | "저축";
}

export default function AssetType({ icon, totalAmount, type }: AssetTypeProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        {icon}
        {type}
      </h2>
      <p
        className={`${
          totalAmount > 0 ? "text-black" : "text-red-600"
        } font-semibold`}>
        Total: {totalAmount.toLocaleString()} 원
      </p>
    </div>
  );
}
