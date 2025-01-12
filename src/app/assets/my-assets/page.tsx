import AssetList from "@/_components/assets/AssetList";
import { Separator } from "@/components/ui/separator";
import {
  Banknote,
  BanknoteIcon,
  CreditCard,
  LucideBanknote,
  PiggyBank,
  PiggyBankIcon,
} from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mr-1">
      <div>
        <AssetList
          icon={<Banknote />}
          categoryName="은행"
          totalAmount={2000000}
        />
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between">
            <span>카카오뱅크</span>
            <span>2,000,000</span>
          </li>
          <li className="flex items-center justify-between">
            <span>국민은행</span>
            <span>1,000,000</span>
          </li>
        </ul>
      </div>

      <div>
        <AssetList
          icon={<CreditCard />}
          categoryName="카드"
          totalAmount={-2000000}
        />
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between">
            <span>롯데카드</span>
            <span>-500,000</span>
          </li>
          <li className="flex items-center justify-between">
            <span>국민은행</span>
            <span>-1,500,000</span>
          </li>
        </ul>
      </div>

      <div>
        <AssetList
          icon={<PiggyBankIcon />}
          categoryName="저축"
          totalAmount={3000000}
        />
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between">
            <span>주택청약</span>
            <span>1,500,000</span>
          </li>
          <li className="flex items-center justify-between">
            <span>26주 적금</span>
            <span>1,500,000</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
